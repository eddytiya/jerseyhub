const mongoose = require('mongoose')
const Order = require('../model/orderModel')
const Cart = require('../model/cartModel')
const Jersey = require('../model/jerseyModel')
const User = require('../model/userModel')
const Notification = require('../model/Notification')
const sendEmail = require("../utils/sendEmail");
const buildOrderStatusEmail = require("../utils/orderStatusEmail");
const generateInvoice = require("../utils/generateInvoice");
const Coupon = require("../model/Coupon");
const { evaluateCoupon } = require("./couponController");
const toCSV = require("../utils/toCSV");
const crypto = require("crypto");

// =====================================
// Verify Razorpay Signature Then Place Order
// =====================================
const verifyPayment = async (req, res) => {

    const {

        razorpay_order_id,

        razorpay_payment_id,

        razorpay_signature

    } = req.body;

    if (

        !razorpay_order_id ||

        !razorpay_payment_id ||

        !razorpay_signature

    ) {

        return res.status(400).json({

            message: "Missing Payment Verification Data"

        });

    }

    const expectedSignature = crypto

        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)

        .update(`${razorpay_order_id}|${razorpay_payment_id}`)

        .digest("hex");

    if (expectedSignature !== razorpay_signature) {

        return res.status(400).json({

            message: "Payment Verification Failed"

        });

    }

    return processOrder(req, res, {

        paymentMethod: "Razorpay",

        paymentStatus: "Paid",

        razorpayOrderId: razorpay_order_id,

        razorpayPaymentId: razorpay_payment_id

    });

};

// =====================================
// Place Order (Cash On Delivery)
// =====================================
const placeOrder = async (req, res) => {

    return processOrder(req, res, {

        paymentMethod: "Cash On Delivery",

        paymentStatus: "Pending"

    });

};

// =====================================
// Shared Order Creation Logic
// =====================================
const processOrder = async (req, res, paymentInfo) => {

    try {

      const isGuest = !req.session.userId;

      const userId = req.session.userId || req.session.guestId;

      const {

    buyNow,

    deliveryInfo,

    couponCode,

    redeemPoints

} = req.body;

        // =====================================
        // Fetch Cart
        // =====================================

       const cartItems = await Cart.find({

    userId,

    buyNow: buyNow ? true : false

}).populate(

    "jerseyId"

);

        if (cartItems.length === 0) {

            return res.status(400).json({

                message: "Cart Is Empty"

            });

        }

        // =====================================
        // Stock Validation
        // =====================================

        for (const item of cartItems) {

            if (!item.jerseyId) {

                return res.status(404).json({

                    message: "Jersey Not Found"

                });

            }

        }

        // =====================================
        // Calculate Subtotal
        // =====================================

        const subtotal = cartItems.reduce(

            (total, item) =>

                total +

                item.jerseyId.price *

                item.quantity,

            0

        );

        // =====================================
        // Apply Coupon (Re-Validated Server-Side)
        // =====================================

        let discountAmount = 0;

        let appliedCouponCode = "";

        if (couponCode) {

            const couponResult = await evaluateCoupon(couponCode, subtotal);

            if (!couponResult.valid) {

                return res.status(400).json({

                    message: couponResult.message

                });

            }

            discountAmount = couponResult.discountAmount;

            appliedCouponCode = couponResult.coupon.code;

        }

        // =====================================
        // Redeem Loyalty Points (Registered Users Only)
        // =====================================

        let pointsRedeemedAmount = 0;

        let redeemingUser = null;

        if (!isGuest) {

            redeemingUser = await User.findById(userId);

        }

        const requestedPoints = Number(redeemPoints) || 0;

        if (requestedPoints > 0) {

            if (!redeemingUser) {

                return res.status(400).json({

                    message: "Please Login To Redeem Points"

                });

            }

            if (requestedPoints > redeemingUser.loyaltyPoints) {

                return res.status(400).json({

                    message: "You Don't Have Enough Points"

                });

            }

            const availableForRedemption = subtotal - discountAmount;

            pointsRedeemedAmount = Math.min(requestedPoints, availableForRedemption);

        }

        const totalAmount = subtotal - discountAmount - pointsRedeemedAmount;

        // =====================================
        // Create Snapshot Of Purchased Products
        // =====================================

        const orderItems = cartItems.map(item => ({

            jerseyId: item.jerseyId._id,

            teamName: item.jerseyId.teamName,

            jerseyName: item.jerseyId.jerseyName,

            category: item.jerseyId.category,

            imageUrl: item.jerseyId.imageUrl,

            price: item.jerseyId.price,

            quantity: item.quantity,

            subtotal:

                item.jerseyId.price *

                item.quantity

        }));

        // =====================================
        // Create ONE Order
        // =====================================

       const pointsEarned = Math.floor(totalAmount / 100);

       const order = await Order.create({

    userId,

    items: orderItems,

    subtotal,

    couponCode: appliedCouponCode,

    discountAmount,

    pointsRedeemed: pointsRedeemedAmount,

    pointsEarned,

    totalAmount,

    deliveryInfo,

    status: "Pending",

    paymentStatus: paymentInfo.paymentStatus,

    paymentMethod: paymentInfo.paymentMethod,

    razorpayOrderId: paymentInfo.razorpayOrderId || "",

    razorpayPaymentId: paymentInfo.razorpayPaymentId || ""

});

        if (appliedCouponCode) {

            await Coupon.updateOne(

                { code: appliedCouponCode },

                { $inc: { usedCount: 1 } }

            );

        }

        if (redeemingUser) {

            redeemingUser.loyaltyPoints += pointsEarned - pointsRedeemedAmount;

            await redeemingUser.save();

        }

        // =====================================
        // Reduce Product Stock (Atomic, With Rollback On Insufficient Stock)
        // =====================================

        const stockDecrements = [];

        for (const item of cartItems) {

            const updatedJersey = await Jersey.findOneAndUpdate(

                {

                    _id: item.jerseyId._id,

                    stock: { $gte: item.quantity }

                },

                {

                    $inc: {

                        stock: -item.quantity

                    }

                },

                {

                    new: true

                }

            );

            if (!updatedJersey) {

                for (const rollback of stockDecrements) {

                    await Jersey.findByIdAndUpdate(

                        rollback.jerseyId,

                        { $inc: { stock: rollback.quantity } }

                    );

                }

                return res.status(400).json({

                    message: `${item.jerseyId.jerseyName} no longer has enough stock.`

                });

            }

            stockDecrements.push({

                jerseyId: item.jerseyId._id,

                quantity: item.quantity

            });

            // Low Stock

            if (

                updatedJersey.stock > 0 &&

                updatedJersey.stock <= 3

            ) {

                await Notification.create({

                    title: "Low Stock",

                    message: `${updatedJersey.teamName} - ${updatedJersey.jerseyName} has only ${updatedJersey.stock} item(s) left.`,

                    type: "stock"

                });

            }

            // Out Of Stock

            if (updatedJersey.stock === 0) {

                await Notification.create({

                    title: "Out Of Stock",

                    message: `${updatedJersey.teamName} - ${updatedJersey.jerseyName} is out of stock.`,

                    type: "stock"

                });

            }

        }

        // =====================================
        // Customer Notification
        // =====================================

        const customer = isGuest

            ? { uname: deliveryInfo.fullName, email: deliveryInfo.email }

            : await User.findById(userId);

        const itemRows = orderItems.map(item => `

<tr>

<td style="padding:12px;border-bottom:1px solid #eee;">

${item.teamName}

<br>

<small>

${item.jerseyName}

</small>

</td>

<td align="center">

${item.quantity}

</td>

<td align="right">

₹${item.subtotal}

</td>

</tr>

`).join("");
try {

    await sendEmail({

        to: customer.email,

        subject: `Order Confirmed - ${order._id}`,

        html: `

<div style="margin:0;padding:40px;background:#eef2ff;font-family:Arial,sans-serif;">

<div style="max-width:760px;margin:auto;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 12px 35px rgba(0,0,0,.12);">

<!-- HEADER -->

<div style="background:linear-gradient(135deg,#2563eb,#1d4ed8);padding:40px;text-align:center;">

<h1 style="margin:0;color:white;font-size:36px;">

⚽ JerseyHub

</h1>

<p style="margin-top:10px;color:#dbeafe;font-size:17px;">

Official Football Jersey Store

</p>

</div>

<!-- BODY -->

<div style="padding:40px;">

<h2 style="margin-top:0;color:#111827;">

Hello ${customer.uname} 👋

</h2>

<p style="font-size:16px;color:#4b5563;line-height:28px;">

Your order has been placed successfully.

Thank you for shopping with JerseyHub.

</p>

<!-- SUCCESS -->

<div style="background:#ecfdf5;border-left:6px solid #16a34a;padding:18px;border-radius:12px;margin:30px 0;">

<h2 style="margin:0;color:#15803d;">

✅ Order Confirmed

</h2>

<p style="margin-top:8px;color:#166534;">

Order ID :

<strong>

${order._id}

</strong>

</p>

</div>

<!-- ORDER ITEMS -->

<h3 style="color:#111827;margin-bottom:18px;">

🛍 Order Summary

</h3>

<table

width="100%"

cellspacing="0"

style="border-collapse:collapse;">

<tr style="background:#f3f4f6;">

<th style="padding:14px;text-align:left;">

Product

</th>

<th style="padding:14px;text-align:center;">

Qty

</th>

<th style="padding:14px;text-align:right;">

Subtotal

</th>

</tr>

${itemRows}

</table>

<!-- TOTAL -->

<div style="margin-top:35px;background:#eff6ff;padding:25px;border-radius:14px;">

<table width="100%">

<tr>

<td>

<strong style="font-size:18px;">

Subtotal

</strong>

</td>

<td align="right">

₹${subtotal}

</td>

</tr>

<tr>

<td>

Shipping

</td>

<td align="right">

FREE

</td>

</tr>

<tr>

<td>

GST

</td>

<td align="right">

Included

</td>

</tr>

${discountAmount > 0 ? `
<tr>
<td style="color:#16a34a;">
Coupon (${appliedCouponCode})
</td>
<td align="right" style="color:#16a34a;">
-₹${discountAmount}
</td>
</tr>
` : ""}

<tr>

<td colspan="2">

<hr style="border:none;border-top:1px solid #dbeafe;margin:18px 0;">

</td>

</tr>

<tr>

<td>

<h2 style="margin:0;color:#2563eb;">

Grand Total

</h2>

</td>

<td align="right">

<h2 style="margin:0;color:#2563eb;">

₹${totalAmount}

</h2>

</td>

</tr>

</table>

</div>

<!-- DELIVERY -->

<div style="margin-top:35px;">

<h3 style="color:#111827;">

📍 Delivery Address

</h3>

<div style="background:#f9fafb;padding:22px;border-radius:12px;">

<strong>

${deliveryInfo.fullName}

</strong>

<br><br>

${deliveryInfo.address1}

<br>

${deliveryInfo.address2 || ""}

<br>

${deliveryInfo.city},

${deliveryInfo.state}

-

${deliveryInfo.pincode}

<br><br>

📞 ${deliveryInfo.phone}

</div>

</div>

<!-- DELIVERY DATE -->

<div style="margin-top:35px;background:#fff7ed;padding:22px;border-radius:12px;">

<h3 style="margin-top:0;color:#ea580c;">

🚚 Estimated Delivery

</h3>

<p style="margin:0;font-size:16px;">

Within

<strong>

5 Business Days

</strong>

</p>

</div>

<!-- PAYMENT -->

<div style="margin-top:35px;background:#f3f4f6;padding:22px;border-radius:12px;">

<h3 style="margin-top:0;">

💳 Payment Method

</h3>

<p>

${paymentInfo.paymentMethod}

</p>

<p>

Payment Status :

<strong style="color:#16a34a;">

${paymentInfo.paymentStatus}

</strong>

</p>

</div>

<!-- BUTTON -->

<div style="text-align:center;margin-top:45px;">

<a

href="${process.env.FRONTEND_URL}/orders"

style="display:inline-block;background:#2563eb;color:white;text-decoration:none;padding:16px 42px;border-radius:10px;font-size:17px;font-weight:bold;">

Track My Order

</a>

</div>

<!-- THANK YOU -->

<div style="margin-top:45px;background:#eff6ff;padding:22px;border-radius:12px;text-align:center;">

<h2 style="color:#2563eb;margin-top:0;">

Thank You ❤️

</h2>

<p style="color:#4b5563;line-height:28px;">

We truly appreciate your purchase.

We hope your new football jersey becomes part of many unforgettable matches.

</p>

</div>

</div>

<!-- FOOTER -->

<div style="background:#111827;padding:30px;text-align:center;color:#9ca3af;">

<h2 style="color:white;margin-top:0;">

⚽ JerseyHub

</h2>

<p>

Official Football Jersey Store

</p>

<p>

Email :

adityapathak987@gmail.com

</p>

<p>

© 2026 JerseyHub

</p>

<p>

Built with ❤️ for Football Fans

</p>

</div>

</div>

</div>

`

    });

    console.log("✅ Order Email Sent Successfully");

}

catch (err) {

    console.log("❌ Order Email Error");

    console.log(err);

}

        await Notification.create({

            title: "New Order",

            message: `${customer.uname} placed an order worth ₹${totalAmount}.`,

            type: "order"

        });

        // =====================================
        // Empty Cart
        // =====================================

        await Cart.deleteMany({

    userId,

    buyNow: buyNow ? true : false

});

        // =====================================
        // Success Response
        // =====================================

        res.status(201).json({

            message: "Order Placed Successfully",

            order

        });

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

// =====================================
// Customer Orders
// =====================================

const getOrders = async (req, res) => {

    try {

        const orders = await Order.find({

            userId: req.session.userId

        })

        .populate('items.jerseyId')

        .sort({

            orderDate: -1

        })

        res.status(200).json(

            orders

        )

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        })

    }

}

// =====================================
// Admin - Get All Orders
// =====================================

const getAllOrders = async (req, res) => {

    try {

        const page = Math.max(1, parseInt(req.query.page) || 1);

        const limit = Math.min(100, parseInt(req.query.limit) || 20);

        const [orders, total] = await Promise.all([

            Order.find()

                .populate('items.jerseyId')

                .sort({ orderDate: -1 })

                .skip((page - 1) * limit)

                .limit(limit),

            Order.countDocuments()

        ]);

        const userIds = [...new Set(orders.map(order => order.userId))]

            .filter(id => mongoose.Types.ObjectId.isValid(id));

        const users = await User.find({ _id: { $in: userIds } });

        const userMap = new Map(users.map(u => [String(u._id), u]));

        const result = orders.map((order) => {

            const user = userMap.get(order.userId);

            return {

                ...order._doc,

                customerName: user?.uname || order.deliveryInfo?.fullName,

                customerEmail: user?.email || order.deliveryInfo?.email,

                isGuest: !user

            };

        });

        res.status(200).json({

            orders: result,

            total,

            page,

            totalPages: Math.ceil(total / limit)

        })

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        })

    }

}

// =====================================
// Update Order Status
// =====================================

const updateOrderStatus = async (req, res) => {

    try {

        const {

            status,

            trackingNumber

        } = req.body;

        const updateData = {

            status

        };

        // =====================================
        // SHIPPED
        // =====================================

        if (status === "Shipped") {

            updateData.trackingNumber =

                trackingNumber ||

                `JH${Date.now()}`;

            updateData.shippedAt = new Date();

            updateData.estimatedDelivery = new Date(

                Date.now() +

                5 * 24 * 60 * 60 * 1000

            );

        }

        // =====================================
        // DELIVERED
        // =====================================

        if (status === "Delivered") {

            updateData.deliveredAt = new Date();

        }

        const order = await Order.findByIdAndUpdate(

            req.params.id,

            updateData,

            {

                new: true

            }

        );

        if (!order) {

            return res.status(404).json({

                message: "Order Not Found"

            });

        }

        const customer = mongoose.Types.ObjectId.isValid(order.userId)

            ? (await User.findById(order.userId)) || { uname: order.deliveryInfo.fullName, email: order.deliveryInfo.email }

            : { uname: order.deliveryInfo.fullName, email: order.deliveryInfo.email };

        // =====================================
        // Notification
        // =====================================

        await Notification.create({

            title: "Order Status Updated",

            message: `${customer.uname}'s order is now ${order.status}.`,

            type: "order"

        });

        // =====================================
        // Email
        // =====================================

        try {

            await sendEmail({

                to: customer.email,

                subject: `⚽ JerseyHub • ${order.status}`,

                html: buildOrderStatusEmail({

                    customer,

                    order,

                    status: order.status

                })

            });

            console.log(

                `✅ ${order.status} Email Sent`

            );

        }

        catch (err) {

            console.log(

                "Status Email Error:",

                err.message

            );

        }

        return res.status(200).json({

            message: "Order Status Updated Successfully",

            order

        });

    }

    catch (err) {

        console.log(err);

        return res.status(500).json({

            message: err.message

        });

    }

};

// =====================================
// Export Orders To CSV (Admin)
// =====================================

const exportOrdersCSV = async (req, res) => {

    try {

        const orders = await Order.find().sort({ orderDate: -1 });

        const csv = toCSV(orders, [

            { label: "Order ID", value: (o) => o._id },
            { label: "Date", value: (o) => new Date(o.orderDate).toLocaleDateString("en-IN") },
            { label: "Customer Name", value: (o) => o.deliveryInfo?.fullName },
            { label: "Customer Email", value: (o) => o.deliveryInfo?.email },
            { label: "Customer Phone", value: (o) => o.deliveryInfo?.phone },
            { label: "Items", value: (o) => o.items.length },
            { label: "Subtotal", value: (o) => o.subtotal },
            { label: "Discount", value: (o) => o.discountAmount },
            { label: "Total", value: (o) => o.totalAmount },
            { label: "Status", value: (o) => o.status },
            { label: "Payment Status", value: (o) => o.paymentStatus },
            { label: "Payment Method", value: (o) => o.paymentMethod }

        ]);

        res.header("Content-Type", "text/csv");

        res.attachment(`orders-${Date.now()}.csv`);

        res.send(csv);

    }

    catch (err) {

        res.status(500).json({ message: err.message });

    }

};

// =====================================
// Get Single Order (Admin)
// =====================================

const getSingleOrder = async (req, res) => {

    try {

        const order = await Order.findById(

            req.params.id

        )

        .populate(

            'items.jerseyId'

        )

        if (!order) {

            return res.status(404).json({

                message: 'Order Not Found'

            })

        }

        const customer = mongoose.Types.ObjectId.isValid(order.userId)

            ? await User.findById(order.userId).select('-password')

            : null

        res.status(200).json({

            ...order.toObject(),

            customer

        })

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        })

    }

}

/* ==========================================
            DOWNLOAD INVOICE
========================================== */

const downloadInvoice = async (req, res) => {

    try {

        const order = await Order.findById(

            req.params.id

        );

        if (!order) {

            return res.status(404).json({

                message: "Order Not Found"

            });

        }

        if (

            order.userId !== String(req.session.userId || req.session.guestId) &&

            req.session.role !== 'admin'

        ) {

            return res.status(403).json({

                message: "Not Authorized"

            });

        }

        generateInvoice(

            order,

            res

        );

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: err.message

        });

    }

};

/* ==========================================
        AI ASSISTANT - TRACK ORDER
========================================== */

const trackOrderAI = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(404).json({
                message: "Order Not Found"
            });

        }

        const order = await Order.findById(id);

        if (!order) {

            return res.status(404).json({
                message: "Order Not Found"
            });

        }

        if (
            order.userId !== String(req.session.userId || req.session.guestId) &&
            req.session.role !== 'admin'
        ) {

            return res.status(403).json({
                message: "Not Authorized"
            });

        }

        return res.status(200).json({

            orderId: order._id,
            status: order.status,
            paymentStatus: order.paymentStatus,
            trackingNumber: order.trackingNumber,
            totalAmount: order.totalAmount,
            orderDate: order.orderDate,
            estimatedDelivery: order.estimatedDelivery,
            shippedAt: order.shippedAt,
            deliveredAt: order.deliveredAt,
            returnStatus: order.returnStatus,
            items: order.items.map(item => ({
                teamName: item.teamName,
                jerseyName: item.jerseyName,
                quantity: item.quantity
            }))

        });

    }

    catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

/* ==========================================
        CUSTOMER - CANCEL ORDER
========================================== */

const cancelOrder = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({

                message: "Order Not Found"

            });

        }

        if (

            order.userId !== String(req.session.userId || req.session.guestId) &&

            req.session.role !== 'admin'

        ) {

            return res.status(403).json({

                message: "Not Authorized"

            });

        }

        if (order.status !== "Pending") {

            return res.status(400).json({

                message: "Only Pending Orders Can Be Cancelled"

            });

        }

        order.status = "Cancelled";

        await order.save();

        // Restore Stock

        for (const item of order.items) {

            await Jersey.findByIdAndUpdate(

                item.jerseyId,

                { $inc: { stock: item.quantity } }

            );

        }

        // Reverse Loyalty Points (Registered Users Only)

        if (mongoose.Types.ObjectId.isValid(order.userId)) {

            await User.findByIdAndUpdate(

                order.userId,

                { $inc: { loyaltyPoints: order.pointsRedeemed - order.pointsEarned } }

            );

        }

        await Notification.create({

            title: "Order Cancelled",

            message: `Order ${order._id} was cancelled by the customer.`,

            type: "order"

        });

        res.status(200).json({

            message: "Order Cancelled Successfully",

            order

        });

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

/* ==========================================
        CUSTOMER - REQUEST RETURN / REFUND
========================================== */

const requestReturn = async (req, res) => {

    try {

        const { reason } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({

                message: "Order Not Found"

            });

        }

        if (

            order.userId !== String(req.session.userId || req.session.guestId) &&

            req.session.role !== 'admin'

        ) {

            return res.status(403).json({

                message: "Not Authorized"

            });

        }

        if (order.status !== "Delivered") {

            return res.status(400).json({

                message: "Only Delivered Orders Can Be Returned"

            });

        }

        if (order.returnStatus !== "None") {

            return res.status(400).json({

                message: "A Return Has Already Been Requested For This Order"

            });

        }

        order.returnStatus = "Requested";

        order.returnReason = reason || "";

        order.returnRequestedAt = new Date();

        await order.save();

        await Notification.create({

            title: "Return Requested",

            message: `A return was requested for order ${order._id}.`,

            type: "order"

        });

        res.status(200).json({

            message: "Return Request Submitted",

            order

        });

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

/* ==========================================
        ADMIN - UPDATE RETURN STATUS
========================================== */

const updateReturnStatus = async (req, res) => {

    try {

        const { returnStatus } = req.body;

        if (!["Approved", "Rejected", "Refunded"].includes(returnStatus)) {

            return res.status(400).json({

                message: "Invalid Return Status"

            });

        }

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({

                message: "Order Not Found"

            });

        }

        if (order.returnStatus === "None") {

            return res.status(400).json({

                message: "No Return Was Requested For This Order"

            });

        }

        order.returnStatus = returnStatus;

        if (returnStatus === "Refunded") {

            order.paymentStatus = "Refunded";

        }

        await order.save();

        const customer = mongoose.Types.ObjectId.isValid(order.userId)

            ? (await User.findById(order.userId)) || { uname: order.deliveryInfo.fullName, email: order.deliveryInfo.email }

            : { uname: order.deliveryInfo.fullName, email: order.deliveryInfo.email };

        try {

            await sendEmail({

                to: customer.email,

                subject: `⚽ JerseyHub • Return ${returnStatus}`,

                html: `<div style="font-family:Arial,sans-serif;padding:30px;">
                    <h2>⚽ JerseyHub</h2>
                    <p>Hi ${customer.uname},</p>
                    <p>Your return request for order <strong>${order._id}</strong> has been <strong>${returnStatus}</strong>.</p>
                </div>`

            });

        }

        catch (err) {

            console.log("Return Status Email Error:", err.message);

        }

        res.status(200).json({

            message: "Return Status Updated",

            order

        });

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

module.exports = {

    placeOrder,

    verifyPayment,

    cancelOrder,

    requestReturn,

    updateReturnStatus,

    getOrders,

    getAllOrders,

    exportOrdersCSV,

    updateOrderStatus,
    downloadInvoice,
    getSingleOrder,
    trackOrderAI

}