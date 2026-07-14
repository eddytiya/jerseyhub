const nodemailer = require("nodemailer");

/* ==========================================
            DEBUG ENV VARIABLES
========================================== */

console.log("EMAIL_USER:", process.env.EMAIL_USER);

console.log(

    "EMAIL_PASS:",

    process.env.EMAIL_PASS

        ? "Loaded ✅"

        : "Missing ❌"

);

/* ==========================================
            TRANSPORTER
========================================== */

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS

    }

});

/* ==========================================
            SEND EMAIL
========================================== */

const sendEmail = async ({

    to,

    subject,

    html

}) => {

    await transporter.sendMail({

        from: `"JerseyHub ⚽" <${process.env.EMAIL_USER}>`,

        to,

        subject,

        html

    });

};

module.exports = sendEmail;