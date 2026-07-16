const Order = require('../model/orderModel')
const Cart = require('../model/cartModel')
const Jersey = require('../model/jerseyModel')
const User = require('../model/userModel')
const Notification = require('../model/Notification')
const sendEmail = require("../utils/sendEmail");
const buildOrderStatusEmail = require("../utils/orderStatusEmail");
const generateInvoice = require("../utils/generateInvoice");
const Razorpay = require("razorpay");
const crypto = require("crypto");


const razorpay = new Razorpay({

    key_id: process.env.RAZORPAY_KEY_ID,

    key_secret: process.env.RAZORPAY_KEY_SECRET

});


/* ==========================================
        CREATE RAZORPAY ORDER
========================================== */

const createRazorpayOrder = async (req, res) => {

    try {

        const { amount } = req.body;

        const options = {

            amount: amount * 100,

            currency: "INR",

            receipt: "receipt_" + Date.now()

        };

        const order = await razorpay.orders.create(options);

        res.status(200).json(order);

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};
// =====================================
// Place Order
// =====================================
const placeOrder = async (req, res) => {

    try {

      const {

    userId,

    buyNow,

    deliveryInfo

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

            if (item.quantity > item.jerseyId.stock) {

                return res.status(400).json({

                    message: `${item.jerseyId.jerseyName} has only ${item.jerseyId.stock} item(s) left in stock.`

                });

            }

        }

        // =====================================
        // Calculate Grand Total
        // =====================================

        const totalAmount = cartItems.reduce(

            (total, item) =>

                total +

                item.jerseyId.price *

                item.quantity,

            0

        );

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

       const order = await Order.create({

    userId,

    items: orderItems,

    totalAmount,

    deliveryInfo,

    status: "Pending",

    paymentStatus: "Paid",

    paymentMethod: "Cash On Delivery"

});

        // =====================================
        // Reduce Product Stock
        // =====================================

        for (const item of cartItems) {

            const updatedJersey = await Jersey.findByIdAndUpdate(

                item.jerseyId._id,

                {

                    $inc: {

                        stock: -item.quantity

                    }

                },

                {

                    new: true

                }

            );

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

        const customer = await User.findById(userId);
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

    console.log("========== ORDER EMAIL DEBUG ==========");

    console.log("Customer:", customer);

    console.log("Customer Email:", customer?.email);

    console.log("Delivery Info:", deliveryInfo);

    console.log("Total:", totalAmount);

    console.log("Order ID:", order._id);

    console.log("Items:", orderItems);

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

₹${totalAmount}

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

Cash On Delivery

</p>

<p>

Payment Status :

<strong style="color:#16a34a;">

Paid

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

            userId: req.params.userId

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

        const orders = await Order.find()

        .populate('items.jerseyId')

        .sort({

            orderDate: -1

        })

        const result = await Promise.all(

            orders.map(async (order) => {

                const user = await User.findById(

                    order.userId

                )

                return {

                    ...order._doc,

                    customerName: user?.uname,

                    customerEmail: user?.email

                }

            })

        )

        res.status(200).json(

            result

        )

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

        const customer = await User.findById(

            order.userId

        );

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

        const customer = await User.findById(

            order.userId

        )

        .select(

            '-password'

        )

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

module.exports = {

    placeOrder,

    getOrders,

    getAllOrders,

    updateOrderStatus,
    downloadInvoice,
    getSingleOrder,
    createRazorpayOrder

}