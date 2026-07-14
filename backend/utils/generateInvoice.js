const PDFDocument = require("pdfkit");

/* ==========================================
            COLOR PALETTE
========================================== */

const COLORS = {

    primary: "#2563eb",

    dark: "#111827",

    light: "#f8fafc",

    border: "#d1d5db",

    muted: "#6b7280",

    success: "#16a34a",

    warning: "#f59e0b",

    danger: "#dc2626",

    white: "#ffffff",

    background: "#eff6ff"

};

/* ==========================================
            PAGE SETTINGS
========================================== */

const PAGE = {

    width: 595,

    height: 842,

    margin: 40,

    contentWidth: 515

};

/* ==========================================
            HELPERS
========================================== */

const money = (amount = 0) => {

    return `₹${Number(amount).toLocaleString("en-IN")}`;

};

const formatDate = (date) => {

    if (!date) return "-";

    return new Date(date).toLocaleDateString(

        "en-IN",

        {

            day: "numeric",

            month: "long",

            year: "numeric"

        }

    );

};

const invoiceNumber = (order) => {

    const year = new Date(

        order.orderDate

    ).getFullYear();

    return `INV-${year}-${order._id
        .toString()
        .slice(-6)
        .toUpperCase()}`;

};

const orderNumber = (order) => {

    const year = new Date(

        order.orderDate

    ).getFullYear();

    return `JH-${year}-${order._id
        .toString()
        .slice(-6)
        .toUpperCase()}`;

};

/* ==========================================
        MAIN FUNCTION
========================================== */

const generateInvoice = (order, res) => {

    const doc = new PDFDocument({

        size: "A4",

        margin: PAGE.margin,

        bufferPages: true

    });

    res.setHeader(

        "Content-Type",

        "application/pdf"

    );

    res.setHeader(

        "Content-Disposition",

        `attachment; filename=${invoiceNumber(order)}.pdf`

    );

    doc.pipe(res);

    let y = 40;

/* ==========================================
                HEADER
========================================== */

doc

.rect(

    0,

    0,

    PAGE.width,

    95

)

.fill(COLORS.primary);

doc

.fillColor(COLORS.white)

.font("Helvetica-Bold")

.fontSize(28)

.text(

    "⚽ JerseyHub",

    40,

    26

);

doc

.font("Helvetica")

.fontSize(12)

.fillColor("#dbeafe")

.text(

    "Official Football Jersey Store",

    42,

    58

);

doc

.fillColor(COLORS.white)

.font("Helvetica-Bold")

.fontSize(24)

.text(

    "INVOICE",

    350,

    28,

    {

        width:170,

        align:"right"

    }

);

doc

.font("Helvetica")

.fontSize(10)

.text(

    "Thank you for shopping with JerseyHub",

    350,

    58,

    {

        width:170,

        align:"right"

    }

);

y = 120;

/* ==========================================
            INVOICE INFO
========================================== */

doc

.font("Helvetica-Bold")

.fillColor(COLORS.dark)

.fontSize(12)

.text(

    "Invoice Information",

    40,

    y

);

y += 25;

const left = 40;

const right = 330;

doc

.font("Helvetica")

.fontSize(11);

doc.text(

    "Invoice No",

    left,

    y

);

doc.text(

    invoiceNumber(order),

    left + 110,

    y

);

doc.text(

    "Order No",

    right,

    y

);

doc.text(

    orderNumber(order),

    right + 90,

    y

);

y += 20;

doc.text(

    "Invoice Date",

    left,

    y

);

doc.text(

    formatDate(

        order.orderDate

    ),

    left + 110,

    y

);

doc.text(

    "Status",

    right,

    y

);

doc

.fillColor(

    order.status === "Delivered"

        ? COLORS.success

        : COLORS.warning

)

.text(

    order.status,

    right + 90,

    y

);

doc.fillColor(COLORS.dark);

y += 35;


/* ==========================================
        CUSTOMER + SHIPPING
========================================== */

const cardWidth = 245;

const cardHeight = 120;

/* CUSTOMER */

doc

.roundedRect(

    40,

    y,

    cardWidth,

    cardHeight,

    8

)

.fillAndStroke(

    COLORS.light,

    COLORS.border

);

doc

.font("Helvetica-Bold")

.fontSize(13)

.fillColor(COLORS.primary)

.text(

    "Customer Details",

    55,

    y + 15

);

let cy = y + 45;

doc

.font("Helvetica")

.fontSize(11)

.fillColor(COLORS.dark)

.text(

    order.deliveryInfo.fullName,

    55,

    cy

);

cy += 20;

doc.text(

    order.deliveryInfo.email,

    55,

    cy

);

cy += 18;

doc.text(

    order.deliveryInfo.phone,

    55,

    cy

);

/* SHIPPING */

doc

.roundedRect(

    310,

    y,

    cardWidth,

    cardHeight,

    8

)

.fillAndStroke(

    COLORS.light,

    COLORS.border

);

doc

.font("Helvetica-Bold")

.fontSize(13)

.fillColor(COLORS.primary)

.text(

    "Shipping Address",

    325,

    y + 15

);

let sy = y + 45;

doc

.font("Helvetica")

.fontSize(11)

.fillColor(COLORS.dark)

.text(

    order.deliveryInfo.address1,

    325,

    sy,

    {

        width:190

    }

);

sy += 35;

if(order.deliveryInfo.address2){

doc.text(

    order.deliveryInfo.address2,

    325,

    sy,

    {

        width:190

    }

);

sy += 30;

}

doc.text(

    `${order.deliveryInfo.city}, ${order.deliveryInfo.state}`,

    325,

    sy

);

sy += 18;

doc.text(

    order.deliveryInfo.pincode,

    325,

    sy

);

y += 145;

/* ==========================================
            PRODUCTS TABLE
========================================== */

doc
    .font("Helvetica-Bold")
    .fontSize(13)
    .fillColor(COLORS.dark)
    .text("Purchased Products", 40, y);

y += 28;

const tableX = 40;
const tableWidth = 515;
const rowHeight = 32;

const cols = {
    sr: tableX + 10,
    product: tableX + 40,
    qty: tableX + 290,
    price: tableX + 350,
    subtotal: tableX + 445
};

/* ---------- Header ---------- */

doc
    .roundedRect(
        tableX,
        y,
        tableWidth,
        rowHeight,
        6
    )
    .fill(COLORS.primary);

doc
    .fillColor(COLORS.white)
    .font("Helvetica-Bold")
    .fontSize(11);

doc.text("#", cols.sr, y + 10);

doc.text(
    "Product",
    cols.product,
    y + 10
);

doc.text(
    "Qty",
    cols.qty,
    y + 10
);

doc.text(
    "Price",
    cols.price,
    y + 10
);

doc.text(
    "Total",
    cols.subtotal,
    y + 10
);

y += rowHeight;

/* ---------- Rows ---------- */

doc.font("Helvetica");

order.items.forEach((item, index) => {

    /* Automatic page break */

    if (y > 650) {

        doc.addPage();

        y = 60;

        doc
            .roundedRect(
                tableX,
                y,
                tableWidth,
                rowHeight,
                6
            )
            .fill(COLORS.primary);

        doc
            .fillColor(COLORS.white)
            .font("Helvetica-Bold")
            .fontSize(11);

        doc.text("#", cols.sr, y + 10);

        doc.text(
            "Product",
            cols.product,
            y + 10
        );

        doc.text(
            "Qty",
            cols.qty,
            y + 10
        );

        doc.text(
            "Price",
            cols.price,
            y + 10
        );

        doc.text(
            "Total",
            cols.subtotal,
            y + 10
        );

        y += rowHeight;
    }

    /* Zebra background */

    doc
        .rect(
            tableX,
            y,
            tableWidth,
            rowHeight
        )
        .fill(
            index % 2 === 0
                ? "#ffffff"
                : "#f8fafc"
        );

    /* Border */

    doc
        .rect(
            tableX,
            y,
            tableWidth,
            rowHeight
        )
        .stroke(COLORS.border);

    doc
        .fillColor(COLORS.dark)
        .font("Helvetica")
        .fontSize(10);

    doc.text(
        String(index + 1),
        cols.sr,
        y + 10
    );

    doc.text(
        item.teamName,
        cols.product,
        y + 6,
        {
            width: 220
        }
    );

    doc
        .fontSize(8)
        .fillColor(COLORS.muted)
        .text(
            item.jerseyName,
            cols.product,
            y + 18,
            {
                width: 220
            }
        );

    doc
        .fontSize(10)
        .fillColor(COLORS.dark);

    doc.text(
        item.quantity.toString(),
        cols.qty,
        y + 10
    );

    doc.text(
        money(item.price),
        cols.price,
        y + 10
    );

    doc.text(
        money(item.subtotal),
        cols.subtotal,
        y + 10
    );

    y += rowHeight;

});

/* Bottom Gap */

y += 25;

/* ==========================================
            SUMMARY + PAYMENT
========================================== */

const summaryY = y;

const summaryX = 325;

const summaryWidth = 230;

const summaryHeight = 140;

/* SUMMARY CARD */

doc

.roundedRect(

    summaryX,

    summaryY,

    summaryWidth,

    summaryHeight,

    8

)

.fillAndStroke(

    COLORS.light,

    COLORS.border

);

doc

.font("Helvetica-Bold")

.fontSize(14)

.fillColor(COLORS.primary)

.text(

    "Order Summary",

    summaryX + 15,

    summaryY + 15

);

let sY = summaryY + 45;

const subtotal = order.items.reduce(

    (sum,item)=>sum+item.subtotal,

    0

);

doc

.font("Helvetica")

.fontSize(11)

.fillColor(COLORS.dark);

doc.text(

    "Subtotal",

    summaryX+15,

    sY

);

doc.text(

    money(subtotal),

    summaryX+135,

    sY,

    {

        width:70,

        align:"right"

    }

);

sY += 22;

doc.text(

    "Shipping",

    summaryX+15,

    sY

);

doc.text(

    "FREE",

    summaryX+135,

    sY,

    {

        width:70,

        align:"right"

    }

);

sY += 22;

doc.text(

    "Tax",

    summaryX+15,

    sY

);

doc.text(

    "Included",

    summaryX+135,

    sY,

    {

        width:70,

        align:"right"

    }

);

sY += 18;

doc

.moveTo(

    summaryX+15,

    sY

)

.lineTo(

    summaryX+210,

    sY

)

.strokeColor(COLORS.border)

.stroke();

sY += 14;

doc

.font("Helvetica-Bold")

.fontSize(13);

doc.text(

    "Grand Total",

    summaryX+15,

    sY

);

doc

.fillColor(COLORS.primary)

.text(

    money(order.totalAmount),

    summaryX+115,

    sY,

    {

        width:90,

        align:"right"

    }

);

/* PAYMENT CARD */

const paymentY = summaryY;

const paymentWidth = 260;

doc

.roundedRect(

    40,

    paymentY,

    paymentWidth,

    summaryHeight,

    8

)

.fillAndStroke(

    COLORS.light,

    COLORS.border

);

doc

.fillColor(COLORS.primary)

.font("Helvetica-Bold")

.fontSize(14)

.text(

    "Payment Details",

    55,

    paymentY+15

);

let pY = paymentY+45;

doc

.font("Helvetica")

.fontSize(11)

.fillColor(COLORS.dark);

doc.text(

    "Method",

    55,

    pY

);

doc

.font("Helvetica-Bold")

.text(

    order.paymentMethod,

    140,

    pY

);

pY += 24;

doc

.font("Helvetica")

.text(

    "Status",

    55,

    pY

);

const paymentColor =

order.paymentStatus==="Paid"

?COLORS.success

:order.paymentStatus==="Failed"

?COLORS.danger

:COLORS.warning;

doc

.fillColor(paymentColor)

.font("Helvetica-Bold")

.text(

    order.paymentStatus,

    140,

    pY

);

pY += 24;

doc

.fillColor(COLORS.dark)

.font("Helvetica")

.text(

    "Order Status",

    55,

    pY

);

const orderColor =

order.status==="Delivered"

?COLORS.success

:order.status==="Cancelled"

?COLORS.danger

:COLORS.warning;

doc

.fillColor(orderColor)

.font("Helvetica-Bold")

.text(

    order.status,

    140,

    pY

);

y = paymentY + summaryHeight + 30;

/* ==========================================
            SHIPMENT CARD
========================================== */

doc

.roundedRect(

    40,

    y,

    515,

    90,

    8

)

.fillAndStroke(

    COLORS.light,

    COLORS.border

);

doc

.fillColor(COLORS.primary)

.font("Helvetica-Bold")

.fontSize(14)

.text(

    "Shipment Details",

    55,

    y+15

);

let shipY = y+45;

doc

.font("Helvetica")

.fontSize(11)

.fillColor(COLORS.dark);

doc.text(

    "Tracking Number",

    55,

    shipY

);

doc

.font("Helvetica-Bold")

.text(

    order.trackingNumber ||

    "Not Assigned",

    180,

    shipY

);

shipY += 24;

doc

.font("Helvetica")

.text(

    "Estimated Delivery",

    55,

    shipY

);

doc

.font("Helvetica-Bold")

.text(

    order.estimatedDelivery

    ?

    formatDate(order.estimatedDelivery)

    :

    "To Be Updated",

    180,

    shipY

);

y += 130;

/* ==========================================
            SIGNATURE
========================================== */

if (y > 670) {

    doc.addPage();

    y = 60;

}

doc

.strokeColor(COLORS.border)

.moveTo(355, y)

.lineTo(540, y)

.stroke();

doc

.font("Helvetica")

.fontSize(10)

.fillColor(COLORS.muted)

.text(

    "Authorized Signature",

    390,

    y + 8

);

y += 55;

/* ==========================================
            THANK YOU CARD
========================================== */

doc

.roundedRect(

    40,

    y,

    515,

    85,

    10

)

.fillAndStroke(

    "#eef6ff",

    "#bfdbfe"

);

doc

.font("Helvetica-Bold")

.fontSize(18)

.fillColor(COLORS.primary)

.text(

    "❤ Thank You For Shopping With JerseyHub!",

    60,

    y + 18

);

doc

.font("Helvetica")

.fontSize(11)

.fillColor(COLORS.dark)

.text(

    "Your order has been placed successfully and is being processed by our warehouse.",

    60,

    y + 50,

    {

        width:470,

        align:"left"

    }

);

doc.text(

    "We truly appreciate your support. We hope to see you again soon!",

    60,

    y + 70,

    {

        width:470

    }

);

y += 130;

/* ==========================================
            SUPPORT CARD
========================================== */

doc

.roundedRect(

    40,

    y,

    515,

    60,

    8

)

.fillAndStroke(

    COLORS.white,

    COLORS.border

);

doc

.font("Helvetica-Bold")

.fontSize(13)

.fillColor(COLORS.primary)

.text(

    "Customer Support",

    60,

    y + 15

);

doc

.font("Helvetica")

.fontSize(10)

.fillColor(COLORS.dark)

.text(

    "Email : support@jerseyhub.com",

    60,

    y + 40

);

doc.text(

    "Phone : +91 98765 43210",

    250,

    y + 40

);

doc.text(

    "Website : www.jerseyhub.com",

    400,

    y + 40

);

y += 100;

/* ==========================================
            FOOTER
========================================== */

const pages = doc.bufferedPageRange();

for (

    let i = 0;

    i < pages.count;

    i++

) {

    doc.switchToPage(i);

    doc

    .strokeColor("#d1d5db")

    .moveTo(

        40,

        800

    )

    .lineTo(

        555,

        800

    )

    .stroke();

    doc

    .font("Helvetica")

    .fontSize(9)

    .fillColor(COLORS.muted)

    .text(

        "Generated automatically by JerseyHub",

        40,

        810,

        {

            width:515,

            align:"center"

        }

    );

    doc

    .fontSize(9)

    .fillColor("#9ca3af")

    .text(

        `Page ${i + 1} of ${pages.count}`,

        40,

        825,

        {

            width:515,

            align:"center"

        }

    );

}

doc.flushPages();

doc.end();

};

module.exports = generateInvoice;