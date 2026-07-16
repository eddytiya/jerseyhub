const buildOrderStatusEmail = ({

    customer,

    order,

    status

}) => {

    let title = "";
    let color = "";
    let emoji = "";
    let message = "";

    switch (status) {

        case "Pending":

            title = "Order Confirmed";
            color = "#2563eb";
            emoji = "🟡";
            message =
                "We've received your order and it is waiting to be processed.";
            break;

        case "Processing":

            title = "Order Processing";
            color = "#f59e0b";
            emoji = "📦";
            message =
                "Great news! We're preparing your jersey for shipment.";
            break;

        case "Shipped":

            title = "Order Shipped";
            color = "#0ea5e9";
            emoji = "🚚";
            message =
                "Your jersey has been shipped and is on its way.";
            break;

        case "Delivered":

            title = "Order Delivered";
            color = "#16a34a";
            emoji = "🎉";
            message =
                "Your order has been delivered successfully. We hope you love it!";
            break;

        case "Cancelled":

            title = "Order Cancelled";
            color = "#dc2626";
            emoji = "❌";
            message =
                "Your order has been cancelled. If payment was made online, the refund will be processed shortly.";
            break;

        default:

            title = "Order Updated";
            color = "#2563eb";
            emoji = "📦";
            message =
                "Your order status has been updated.";

    }

    return `

<div style="margin:0;padding:40px;background:#eef2ff;font-family:Arial,sans-serif;">

<div style="max-width:700px;margin:auto;background:white;border-radius:18px;overflow:hidden;box-shadow:0 12px 30px rgba(0,0,0,.15);">

<div style="background:${color};padding:35px;text-align:center;">

<h1 style="margin:0;color:white;">

⚽ JerseyHub

</h1>

<p style="margin-top:10px;color:white;">

${emoji} ${title}

</p>

</div>

<div style="padding:40px;">

<h2>

Hello ${customer.uname},

</h2>

<p style="font-size:16px;line-height:28px;">

${message}

</p>

<hr>

<h3>

Order Details

</h3>

<p>

<b>Order ID</b>

<br>

${order._id}

</p>

<p>

<b>Current Status</b>

<br>

<span style="color:${color};font-weight:bold;">

${status}

</span>

</p>

<p>

<b>Total Amount</b>

<br>

₹${order.totalAmount}

</p>

<div style="background:#f8fafc;padding:25px;border-radius:12px;margin-top:30px;">

<h3>

Need Help?

</h3>

<p>

If you have any questions regarding your order, feel free to contact JerseyHub Support.

</p>

</div>

<div style="text-align:center;margin-top:40px;">

<a

href="${process.env.FRONTEND_URL}/orders"

style="display:inline-block;padding:16px 40px;background:${color};color:white;text-decoration:none;border-radius:10px;font-weight:bold;">

View My Orders

</a>

</div>

</div>

<div style="background:#111827;color:#9ca3af;padding:25px;text-align:center;">

<h3 style="color:white;">

⚽ JerseyHub

</h3>

<p>

Thank you for shopping with us ❤️

</p>

</div>

</div>

</div>

`;

};

module.exports = buildOrderStatusEmail;