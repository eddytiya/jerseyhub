const nodemailer = require("nodemailer");

/* ==========================================
            DEBUG ENV VARIABLES
========================================== */

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log(
    "EMAIL_PASS:",
    process.env.EMAIL_PASS ? "Loaded ✅" : "Missing ❌"
);

/* ==========================================
            TRANSPORTER
========================================== */

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // STARTTLS
    family: 4,     // Force IPv4
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

/* ==========================================
            VERIFY CONNECTION
========================================== */

transporter.verify((error, success) => {
    if (error) {
        console.log("❌ Email Server Error:", error);
    } else {
        console.log("✅ Email Server Ready");
    }
});

/* ==========================================
            SEND EMAIL
========================================== */

const sendEmail = async ({ to, subject, html }) => {
    await transporter.sendMail({
        from: `"JerseyHub ⚽" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    });
};

module.exports = sendEmail;