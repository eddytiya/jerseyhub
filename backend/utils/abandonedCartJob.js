const mongoose = require('mongoose');
const cron = require('node-cron');
const Cart = require('../model/cartModel');
const User = require('../model/userModel');
const sendEmail = require('./sendEmail');

/* ==========================================
    EMAIL USERS WHOSE CART HAS SAT IDLE 24H+
========================================== */

const sendAbandonedCartReminders = async () => {

    try {

        const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);

        const staleItems = await Cart.find({

            buyNow: false,

            reminderSent: false,

            updatedAt: { $lte: cutoff }

        }).populate('jerseyId');

        if (!staleItems.length) return;

        const byUser = {};

        for (const item of staleItems) {

            if (!mongoose.Types.ObjectId.isValid(item.userId)) continue;

            if (!byUser[item.userId]) byUser[item.userId] = [];

            byUser[item.userId].push(item);

        }

        for (const userId of Object.keys(byUser)) {

            const user = await User.findById(userId);

            if (!user) continue;

            const items = byUser[userId].filter(i => i.jerseyId);

            if (!items.length) continue;

            const itemRows = items.map(item => `
                <tr>
                    <td style="padding:10px;border-bottom:1px solid #eee;">
                        ${item.jerseyId.teamName} - ${item.jerseyId.jerseyName}
                    </td>
                    <td align="center">${item.quantity}</td>
                    <td align="right">₹${item.jerseyId.price}</td>
                </tr>
            `).join("");

            try {

                await sendEmail({

                    to: user.email,

                    subject: "⚽ You Left Something In Your Cart",

                    html: `<div style="margin:0;padding:40px;background:#f3f4f6;font-family:Arial,sans-serif;">
                        <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.12);">
                            <div style="background:linear-gradient(135deg,#2563eb,#1d4ed8);padding:35px;text-align:center;">
                                <h1 style="margin:0;color:white;font-size:30px;">⚽ JerseyHub</h1>
                            </div>
                            <div style="padding:40px;">
                                <h2 style="margin-top:0;color:#111827;">Still Thinking It Over, ${user.uname}?</h2>
                                <p style="font-size:16px;color:#4b5563;">These are still waiting in your cart:</p>
                                <table width="100%" cellspacing="0" style="border-collapse:collapse;margin-top:16px;">
                                    ${itemRows}
                                </table>
                                <div style="text-align:center;margin-top:30px;">
                                    <a href="${process.env.FRONTEND_URL}/cart" style="background:#2563eb;color:white;text-decoration:none;padding:15px 35px;border-radius:10px;font-weight:bold;display:inline-block;">Complete Your Order</a>
                                </div>
                            </div>
                        </div>
                    </div>`

                });

            }

            catch (err) {

                console.log("Abandoned Cart Email Error:", err.message);

            }

        }

        await Cart.updateMany(

            { _id: { $in: staleItems.map(i => i._id) } },

            { reminderSent: true }

        );

    }

    catch (err) {

        console.log("Abandoned Cart Job Error:", err.message);

    }

};

/* ==========================================
        SCHEDULE — RUNS EVERY HOUR
========================================== */

const startAbandonedCartJob = () => {

    cron.schedule('0 * * * *', sendAbandonedCartReminders);

};

module.exports = { startAbandonedCartJob, sendAbandonedCartReminders };
