const BulkInquiry = require('../model/BulkInquiry');
const Notification = require('../model/Notification');
const sendEmail = require('../utils/sendEmail');

/* ==========================================
        CUSTOMER - SUBMIT BULK INQUIRY
========================================== */

const createBulkInquiry = async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            teamName,
            quantity,
            jerseyDetails,
            message
        } = req.body;

        if (!name || !email || !phone || !quantity) {

            return res.status(400).json({

                message: "Name, Email, Phone And Quantity Are Required"

            });

        }

        const inquiry = await BulkInquiry.create({
            name,
            email,
            phone,
            teamName,
            quantity,
            jerseyDetails,
            message
        });

        await Notification.create({

            title: "New Bulk Order Inquiry",

            message: `${name} requested a bulk order of ${quantity} jerseys.`,

            type: "bulk-inquiry"

        });

        try {

            await sendEmail({

                to: process.env.EMAIL_USER,

                subject: `⚽ New Bulk Order Inquiry - ${name}`,

                html: `<div style="font-family:Arial,sans-serif;padding:30px;">
                    <h2>⚽ JerseyHub — Bulk Order Inquiry</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Team Name:</strong> ${teamName || "-"}</p>
                    <p><strong>Quantity:</strong> ${quantity}</p>
                    <p><strong>Jersey Details:</strong> ${jerseyDetails || "-"}</p>
                    <p><strong>Message:</strong> ${message || "-"}</p>
                </div>`

            });

        }

        catch (err) {

            console.log("Bulk Inquiry Email Error:", err.message);

        }

        res.status(201).json({

            message: "Thanks! Our Team Will Reach Out To You Shortly.",

            inquiry

        });

    }

    catch (err) {

        res.status(500).json({ message: err.message });

    }

};

/* ==========================================
        ADMIN - GET ALL INQUIRIES
========================================== */

const getBulkInquiries = async (req, res) => {

    try {

        const inquiries = await BulkInquiry.find().sort({ createdAt: -1 });

        res.status(200).json(inquiries);

    }

    catch (err) {

        res.status(500).json({ message: err.message });

    }

};

/* ==========================================
        ADMIN - UPDATE INQUIRY STATUS
========================================== */

const updateBulkInquiryStatus = async (req, res) => {

    try {

        const { status } = req.body;

        const inquiry = await BulkInquiry.findByIdAndUpdate(

            req.params.id,

            { status },

            { new: true, runValidators: true }

        );

        if (!inquiry) {

            return res.status(404).json({ message: "Inquiry Not Found" });

        }

        res.status(200).json(inquiry);

    }

    catch (err) {

        res.status(400).json({ message: err.message });

    }

};

module.exports = {

    createBulkInquiry,

    getBulkInquiries,

    updateBulkInquiryStatus

};
