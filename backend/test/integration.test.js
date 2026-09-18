const { before, after, beforeEach, describe, it } = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const mongoose = require("mongoose");
const crypto = require("node:crypto");
const { MongoMemoryReplSet } = require("mongodb-memory-server");

let replSet;
let app;
let Jersey;
let ProductType;
let Cart;
let Order;
let User;
let razorpay;
let PaymentAttempt;
let PaymentRecovery;
let PaymentWebhookEvent;
let InventoryMovement;

const customer = {
    uname: "testcustomer",
    email: "customer@example.com",
    password: "SecurePass123!",
};

const deliveryInfo = {
    fullName: "Test Customer",
    email: customer.email,
    phone: "9999999999",
    address1: "1 Test Street",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411001",
};

before(async () => {
    replSet = await MongoMemoryReplSet.create({ replSet: { count: 1 } });
    process.env.NODE_ENV = "test";
    process.env.MONGO_URI = replSet.getUri();
    process.env.SESSION_SECRET = "test-session-secret-that-is-at-least-32-characters";
    process.env.RAZORPAY_KEY_ID = "rzp_test_example";
    process.env.RAZORPAY_KEY_SECRET = "test_razorpay_secret";
    process.env.RAZORPAY_WEBHOOK_SECRET = "test_webhook_secret";
    process.env.RAZORPAY_ENABLED = "true";
    process.env.GOOGLE_CLIENT_ID = "test.apps.googleusercontent.com";
    process.env.FRONTEND_URL = "http://localhost:5173";

    ({ app } = require("../app"));
    Jersey = require("../model/jerseyModel");
    ProductType = require("../model/ProductTypeModel");
    Cart = require("../model/cartModel");
    Order = require("../model/orderModel");
    User = require("../model/userModel");
    razorpay = require("../config/razorpay");
    PaymentAttempt = require("../model/PaymentAttempt");
    PaymentRecovery = require("../model/PaymentRecovery");
    PaymentWebhookEvent = require("../model/PaymentWebhookEvent");
    InventoryMovement = require("../model/InventoryMovement");
    await mongoose.connect(process.env.MONGO_URI);
});

after(async () => {
    await mongoose.disconnect();
    await replSet.stop();
});

beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.syncIndexes();
});

const registerAndLogin = async (agent, overrides = {}) => {
    const credentials = { ...customer, ...overrides };
    await agent.post("/user/register").send(credentials).expect(201);
    await agent.post("/user/login").send({
        loginId: credentials.email,
        password: credentials.password,
    }).expect(200);
    return User.findOne({ email: credentials.email });
};

const createJersey = async (stock = 2) => {
    const productType = await ProductType.create({ typeName: `Replica ${Date.now()}` });
    return Jersey.create({
        teamName: "Test FC",
        jerseyName: "Home Jersey",
        category: "Club",
        season: "2026/27",
        productType: productType._id,
        price: 1200,
        sizes: ["M"],
        stock,
        images: ["https://example.com/jersey.jpg"],
        imageUrl: "https://example.com/jersey.jpg",
        description: "Integration test jersey",
    });
};

describe("authentication and authorization", () => {
    it("creates a session and returns the current user", async () => {
        const agent = request.agent(app);
        await registerAndLogin(agent);
        const response = await agent.get("/user/me").expect(200);
        assert.equal(response.body.email, customer.email);
        assert.equal(response.body.password, undefined);
    });

    it("blocks customers from admin APIs and allows admins", async () => {
        const customerAgent = request.agent(app);
        const user = await registerAndLogin(customerAgent);
        await customerAgent.get("/dashboard/analytics").expect(403);

        await User.updateOne({ _id: user._id }, { role: "admin" });
        const adminAgent = request.agent(app);
        await adminAgent.post("/user/login").send({
            loginId: customer.email,
            password: customer.password,
        }).expect(200);
        await adminAgent.get("/dashboard/analytics").expect(200);
    });
});

describe("unified catalog publishing", () => {
    it("hides drafts publicly while exposing them to authenticated admins", async () => {
        const draft = await createJersey(2);
        draft.status = "draft";
        await draft.save();

        const publicList = await request(app).get("/jersey").expect(200);
        assert.equal(publicList.body.some((item) => item._id === draft.id), false);
        await request(app).get(`/jersey/show/${draft.slug}`).expect(404);

        const adminAgent = request.agent(app);
        const admin = await registerAndLogin(adminAgent, { email: "catalog-admin@example.com", uname: "catalogadmin" });
        await User.updateOne({ _id: admin._id }, { role: "admin" });
        await adminAgent.post("/user/login").send({ loginId: "catalog-admin@example.com", password: customer.password }).expect(200);
        const adminList = await adminAgent.get("/jersey/admin/all").expect(200);
        assert.equal(adminList.body.some((item) => item._id === draft.id), true);
    });

    it("publishes due scheduled products and resolves their SEO slug", async () => {
        const scheduled = await createJersey(2);
        scheduled.status = "scheduled";
        scheduled.publishAt = new Date(Date.now() + 60_000);
        await scheduled.save();
        await Jersey.updateOne({ _id: scheduled._id }, { $set: { publishAt: new Date(Date.now() - 1_000) } });

        const { publishScheduledProducts } = require("../jobs/catalogPublishingJob");
        await publishScheduledProducts();

        const response = await request(app).get(`/jersey/show/${scheduled.slug}`).expect(200);
        assert.equal(response.body.status, "published");
        assert.equal(response.body.slug, scheduled.slug);
    });
});

describe("public reviews", () => {
    it("allows guests to read homepage and product reviews", async () => {
        const jersey = await createJersey(2);
        const featured = await request(app).get("/review/featured").expect(200);
        assert.equal(featured.body.success, true);
        assert.ok(Array.isArray(featured.body.reviews));

        const productReviews = await request(app).get(`/review/jersey/${jersey._id}`).expect(200);
        assert.equal(productReviews.body.success, true);
        assert.ok(Array.isArray(productReviews.body.reviews));
    });
});

describe("transactional checkout", () => {
    it("atomically creates an order, decrements stock, and clears the cart", async () => {
        const agent = request.agent(app);
        const user = await registerAndLogin(agent);
        const jersey = await createJersey(2);

        await agent.post("/cart/add").send({ jerseyId: jersey._id, quantity: 1 }).expect(201);
        const response = await agent.post("/order/checkout").send({ deliveryInfo }).expect(201);

        assert.equal(response.body.order.totalAmount, 1299);
        assert.equal(response.body.order.shippingAmount, 99);
        assert.equal(response.body.order.taxRate, 5);
        assert.equal(await Order.countDocuments({ userId: String(user._id) }), 1);
        assert.equal(await Cart.countDocuments({ userId: String(user._id) }), 0);
        assert.equal((await Jersey.findById(jersey._id)).stock, 1);
    });

    it("returns the original order when a COD request is retried with the same key", async () => {
        const agent = request.agent(app);
        await registerAndLogin(agent, { uname: "retrycustomer", email: "retry@example.com" });
        const jersey = await createJersey(2);
        await agent.post("/cart/add").send({ jerseyId: jersey._id, quantity: 1 }).expect(201);
        const key = "checkout-retry-key";
        const first = await agent.post("/order/checkout").set("Idempotency-Key", key)
            .send({ deliveryInfo: { ...deliveryInfo, email: "retry@example.com" } }).expect(201);
        const second = await agent.post("/order/checkout").set("Idempotency-Key", key)
            .send({ deliveryInfo: { ...deliveryInfo, email: "retry@example.com" } }).expect(200);
        assert.equal(second.body.order._id, first.body.order._id);
        assert.equal(await Order.countDocuments(), 1);
        assert.equal((await Jersey.findById(jersey._id)).stock, 1);
    });

    it("rolls back every mutation when stock changes during checkout", async () => {
        const agent = request.agent(app);
        const user = await registerAndLogin(agent, {
            uname: "rollbackcustomer",
            email: "rollback@example.com",
        });
        const jersey = await createJersey(2);

        await agent.post("/cart/add").send({ jerseyId: jersey._id, quantity: 2 }).expect(201);
        await Jersey.updateOne({ _id: jersey._id }, { stock: 1 });
        await agent.post("/order/checkout").send({
            deliveryInfo: { ...deliveryInfo, email: "rollback@example.com" },
        }).expect(400);

        assert.equal(await Order.countDocuments({ userId: String(user._id) }), 0);
        assert.equal(await Cart.countDocuments({ userId: String(user._id) }), 1);
        assert.equal((await Jersey.findById(jersey._id)).stock, 1);
    });
});

describe("Razorpay integrity", () => {
    it("creates the Razorpay order from the server-calculated cart total", async () => {
        const agent = request.agent(app);
        await registerAndLogin(agent, { uname: "paymentcustomer", email: "payment@example.com" });
        const jersey = await createJersey(2);
        await agent.post("/cart/add").send({ jerseyId: jersey._id, quantity: 1 }).expect(201);

        const originalCreate = razorpay.orders.create;
        let receivedOptions;
        let createCalls = 0;
        razorpay.orders.create = async (options) => {
            createCalls += 1;
            receivedOptions = options;
            return { id: "order_secure", ...options };
        };
        try {
            await agent.post("/order/create-order").set("Idempotency-Key", "payment-attempt-once").send({ amount: 1 }).expect(200);
            await agent.post("/order/create-order").set("Idempotency-Key", "payment-attempt-once").send({ amount: 1 }).expect(200);
            assert.equal(receivedOptions.amount, 129900);
            assert.equal(receivedOptions.currency, "INR");
            assert.equal(createCalls, 1);
            assert.equal((await Jersey.findById(jersey._id)).reservedStock, 1);
        } finally {
            razorpay.orders.create = originalCreate;
        }
    });

    it("rejects a validly signed payment whose paid amount is too low", async () => {
        const agent = request.agent(app);
        await registerAndLogin(agent, { uname: "underpaycustomer", email: "underpay@example.com" });
        const jersey = await createJersey(2);
        await agent.post("/cart/add").send({ jerseyId: jersey._id, quantity: 1 }).expect(201);

        const orderId = "order_underpaid";
        const paymentId = "pay_underpaid";
        const signature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${orderId}|${paymentId}`)
            .digest("hex");
        const originalOrderFetch = razorpay.orders.fetch;
        const originalPaymentFetch = razorpay.payments.fetch;
        await PaymentAttempt.create({
            userId: String((await User.findOne({ email: "underpay@example.com" }))._id),
            idempotencyKey: "underpaid-attempt",
            razorpayOrderId: orderId,
            amount: 129900,
            currency: "INR",
        });
        razorpay.orders.fetch = async () => ({ amount: 100, currency: "INR", status: "paid" });
        razorpay.payments.fetch = async () => ({
            order_id: orderId,
            amount: 100,
            currency: "INR",
            status: "captured",
        });
        try {
            await agent.post("/order/verify-payment").send({
                razorpay_order_id: orderId,
                razorpay_payment_id: paymentId,
                razorpay_signature: signature,
                deliveryInfo: { ...deliveryInfo, email: "underpay@example.com" },
            }).expect(400);
            assert.equal(await Order.countDocuments(), 0);
            assert.equal((await Jersey.findById(jersey._id)).stock, 2);
        } finally {
            razorpay.orders.fetch = originalOrderFetch;
            razorpay.payments.fetch = originalPaymentFetch;
        }
    });

    it("accepts each signed captured-payment webhook only once and queues recovery", async () => {
        await PaymentAttempt.create({
            userId: "guest-recovery",
            idempotencyKey: "webhook-attempt",
            razorpayOrderId: "order_webhook",
            amount: 129900,
            currency: "INR",
        });
        const payload = JSON.stringify({
            event: "payment.captured",
            payload: { payment: { entity: {
                id: "pay_webhook", order_id: "order_webhook", amount: 129900,
                currency: "INR", status: "captured"
            } } }
        });
        const signature = crypto.createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
            .update(payload).digest("hex");

        await request(app).post("/payment/webhook")
            .set("Content-Type", "application/json")
            .set("x-razorpay-signature", signature)
            .set("x-razorpay-event-id", "event-once")
            .send(payload).expect(200);
        const duplicate = await request(app).post("/payment/webhook")
            .set("Content-Type", "application/json")
            .set("x-razorpay-signature", signature)
            .set("x-razorpay-event-id", "event-once")
            .send(payload).expect(200);

        assert.equal(duplicate.body.duplicate, true);
        assert.equal(await PaymentWebhookEvent.countDocuments(), 1);
        assert.equal(await PaymentRecovery.countDocuments(), 1);
    });
});

describe("size-level inventory", () => {
    const createVariantJersey = async () => {
        const productType = await ProductType.create({ typeName: `Player ${Date.now()}` });
        return Jersey.create({
            teamName: "Variant FC",
            jerseyName: "Player Jersey",
            category: "Club",
            season: "2026/27",
            productType: productType._id,
            price: 1800,
            stock: 3,
            sizes: ["M", "L"],
            variants: [
                { size: "M", sku: `VAR-M-${Date.now()}`, stock: 2, supplierCost: 800 },
                { size: "L", sku: `VAR-L-${Date.now()}`, stock: 1, supplierCost: 800 },
            ],
            images: ["https://example.com/variant.jpg"],
            imageUrl: "https://example.com/variant.jpg",
            description: "Variant integration fixture",
        });
    };

    it("requires a size and atomically sells only that variant", async () => {
        const agent = request.agent(app);
        await registerAndLogin(agent, { uname: "variantcustomer", email: "variant@example.com" });
        const jersey = await createVariantJersey();

        await agent.post("/cart/add").send({ jerseyId: jersey._id, quantity: 1 }).expect(400);
        await agent.post("/cart/add").send({ jerseyId: jersey._id, quantity: 1, selectedSize: "M" }).expect(201);
        await agent.post("/order/checkout").set("Idempotency-Key", "variant-order")
            .send({ deliveryInfo: { ...deliveryInfo, email: "variant@example.com" } }).expect(201);

        const updated = await Jersey.findById(jersey._id);
        assert.equal(updated.variants.find((variant) => variant.size === "M").stock, 1);
        assert.equal(updated.variants.find((variant) => variant.size === "M").sold, 1);
        assert.equal(updated.variants.find((variant) => variant.size === "L").stock, 1);
        assert.equal(updated.stock, 2);
        const movement = await InventoryMovement.findOne({ jerseyId: jersey._id, type: "sale" });
        assert.equal(movement.size, "M");
        assert.equal(movement.quantity, -1);
    });

    it("records admin inventory adjustments with an actor and reason", async () => {
        const agent = request.agent(app);
        const user = await registerAndLogin(agent, { uname: "stockadmin", email: "stockadmin@example.com" });
        await User.updateOne({ _id: user._id }, { role: "admin" });
        const admin = request.agent(app);
        await admin.post("/user/login").send({ loginId: "stockadmin@example.com", password: customer.password }).expect(200);
        const jersey = await createVariantJersey();
        const variant = jersey.variants[0];

        await admin.post(`/jersey/${jersey._id}/inventory-adjustment`).send({
            variantId: variant._id,
            quantity: 5,
            type: "restock",
            reason: "Supplier delivery PO-1001",
            supplierCost: 750,
        }).expect(200);

        const updated = await Jersey.findById(jersey._id);
        assert.equal(updated.variants.id(variant._id).stock, 7);
        assert.equal(updated.stock, 8);
        const movement = await InventoryMovement.findOne({ jerseyId: jersey._id, type: "restock" });
        assert.equal(String(movement.actorId), String(user._id));
        assert.equal(movement.reason, "Supplier delivery PO-1001");
    });
});
