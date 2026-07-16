const nodemailer = require("nodemailer");
const dns = require("dns");

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

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },

    tls: {
        rejectUnauthorized: false,
    },

    // Force IPv4
    getSocket: (options, callback) => {
        dns.lookup(options.host, { family: 4 }, (err, address) => {
            if (err) return callback(err);

            options.host = address;
            callback(null, false);
        });
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