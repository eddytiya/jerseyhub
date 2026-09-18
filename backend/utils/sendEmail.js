const nodemailer = require("nodemailer");
const dns = require("dns");

/* ==========================================
            DEBUG ENV VARIABLES
========================================== */

/* ==========================================
            TRANSPORTER
========================================== */

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 60000,
    greetingTimeout: 60000,
    socketTimeout: 60000,
});
/* ==========================================
            VERIFY CONNECTION
========================================== */

if (process.env.NODE_ENV !== "test" && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter.verify((error) => {
        if (error) {
            console.log("❌ Email Server Error:", error.message);
        } else {
            console.log("✅ Email Server Ready");
        }
    });
}

/* ==========================================
            SEND EMAIL
========================================== */

const sendEmail = async ({ to, subject, html }) => {
    if (process.env.NODE_ENV === "test") {
        return { messageId: "test-message" };
    }
    try {
        const info = await transporter.sendMail({
            from: `"JerseyHub ⚽" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });

        console.log("✅ Email Sent:", info.messageId);
    } catch (err) {
        console.log("❌ Send Email Failed");
        console.log(err);
        throw err;
    }
};

module.exports = sendEmail;
