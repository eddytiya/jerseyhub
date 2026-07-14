const courseModel = require("../model/jerseyModel");
const userModel = require("../model/userModel");
const Notification = require("../model/Notification");
const bcryptjs = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");
const sendEmail = require("../utils/sendEmail");

const client = new OAuth2Client(

    process.env.GOOGLE_CLIENT_ID

);
// Register
const register = async (req, resp) => {

    try {

        const { uname, email, password } = req.body;

        console.log("\n================ REGISTER REQUEST ================");
        console.log("Incoming Data:", {
            uname,
            email
        });

        const existingUser = await userModel.findOne({

            $or: [

                { uname },

                { email }

            ]

        });

        console.log("Existing User:", existingUser);

        if (existingUser) {

            return resp.status(400).json({

                message: "User already exists"

            });

        }

        const hashPassword = await bcryptjs.hash(

            password,

            10

        );

        console.log("Creating User...");

        const newUser = await userModel.create({

            uname,

            email,

            password: hashPassword

        });

        console.log("User Created Successfully:");
        console.log(newUser);

        try {

            await sendEmail({

                to: newUser.email,

                subject: "Welcome to JerseyHub ⚽",

                html: `
<div style="margin:0;padding:40px;background:#f3f4f6;font-family:Arial,sans-serif;">

    <div style="max-width:650px;margin:auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.12);">

        <div style="background:linear-gradient(135deg,#2563eb,#1d4ed8);padding:35px;text-align:center;">

            <h1 style="margin:0;color:white;font-size:34px;">

                ⚽ JerseyHub

            </h1>

            <p style="color:#dbeafe;margin-top:10px;">

                Your Football Jersey Destination

            </p>

        </div>

        <div style="padding:40px;">

            <h2 style="margin-top:0;color:#111827;">

                Welcome ${newUser.uname}! 🎉

            </h2>

            <p style="font-size:16px;color:#4b5563;line-height:28px;">

                Thank you for joining the JerseyHub family.

                We are excited to have you with us.

            </p>

            <div style="background:#eff6ff;padding:20px;border-radius:12px;margin:30px 0;">

                <h3 style="margin-top:0;color:#2563eb;">

                    What You'll Enjoy

                </h3>

                <p>⚽ Authentic Football Jerseys</p>

                <p>🔥 Exclusive Club Collections</p>

                <p>🚚 Fast Delivery</p>

                <p>💳 Secure Checkout</p>

                <p>❤️ Wishlist & Reviews</p>

            </div>

            <div style="text-align:center;margin-top:35px;">

                <a

                    href="http://localhost:5173/shop"

                    style="background:#2563eb;color:white;text-decoration:none;padding:15px 35px;border-radius:10px;font-weight:bold;display:inline-block;"

                >

                    Start Shopping

                </a>

            </div>

        </div>

        <div style="background:#111827;padding:20px;text-align:center;color:#9ca3af;font-size:14px;">

            © 2026 JerseyHub

            <br>

            Built with ❤️ for Football Fans

        </div>

    </div>

</div>
`

            });

            console.log("Welcome Email Sent.");

        }

        catch (err) {

            console.log("Email Error:", err.message);

        }

        await Notification.create({

            title: "New Customer Registered",

            message: `${newUser.uname} has registered successfully.`,

            type: "customer"

        });

        console.log("Notification Created.");

        resp.status(201).json({

            message: "Registration Successful"

        });

    }

    catch (error) {

        console.log("\n========== REGISTER ERROR ==========");

        console.log(error);

        console.log("====================================\n");

        resp.status(500).json({

            message: error.message

        });

    }

};
// Login
const login = async (req, resp) => {

    try {

        const { loginId, password } = req.body;

        const user = await userModel.findOne({

            $or: [

                { uname: loginId },

                { email: loginId }

            ]

        });

        if (!user) {

            return resp.status(404).json({

                message: "User not found"

            });

        }

        // Google account (no password)
        if (!user.password) {

            return resp.status(400).json({

                message: "Please login using Google"

            });

        }

        const match = await bcryptjs.compare(

            password,

            user.password

        );

        if (!match) {

            return resp.status(401).json({

                message: "Invalid Password"

            });

        }

        req.session.userId = user._id;

        req.session.name = user.uname;

        req.session.role = user.role;

        resp.status(200).json({

            message: "Login Successful",

            user: user.uname,

            role: user.role,

            userId: user._id

        });

    }

    catch (error) {

        console.log(error);

        resp.status(500).json({

            message: error.message

        });

    }

};
// Google Login
// Google Login
const googleLogin = async (req, resp) => {

    try {

        const { credential } = req.body;

        if (!credential) {

            return resp.status(400).json({

                message: "Credential Missing"

            });

        }

        // Verify Google Token
        const ticket = await client.verifyIdToken({

            idToken: credential,

            audience: process.env.GOOGLE_CLIENT_ID

        });

        const payload = ticket.getPayload();

        const {

            email,

            name,

            sub

        } = payload;

        console.log(payload);

        // Check if user already exists
        let user = await userModel.findOne({

            email

        });

        // Create new Google user if not found
        if (!user) {

            const username = email.split("@")[0];

            user = await userModel.create({

                uname: username,

                email,

                password: "",

                googleId: sub

            });

            await Notification.create({

                title: "New Customer Registered",

                message: `${user.uname} has registered using Google.`,

                type: "customer"

            });

        }

        // Save session
        req.session.userId = user._id;

        req.session.name = user.uname;

        req.session.role = user.role;

        return resp.status(200).json({

            message: "Google Login Successful",

            user: user.uname,

            role: user.role,

            userId: user._id

        });

    }

    catch (error) {

        console.log(error);

        resp.status(500).json({

            message: error.message

        });

    }

};
// Dashboard
const dashboard = async (req, resp) => {

    try {

        if (!req.session.userId) {

            return resp.status(401).json({

                message: "Please Login First"

            });

        }

        const data = await courseModel.find();

        resp.status(200).json({

            user: req.session.name,

            data

        });

    }

    catch (error) {

        console.log(error);

        resp.status(500).json({

            message: error.message

        });

    }

};

// Logout
const logout = async (req, resp) => {

    req.session.destroy(() => {

        resp.status(200).json({

            message: "Logout Successful"

        });

    });

};


/* ==========================================
            GET CURRENT USER
========================================== */

const getCurrentUser = async (req, res) => {

    try {

        if (!req.session.userId) {

            return res.status(401).json({

                message: "User Not Logged In"

            });

        }

        const User = require("../model/userModel");

        const user = await User.findById(

            req.session.userId

        ).select(

            "-password"

        );

        if (!user) {

            return res.status(404).json({

                message: "User Not Found"

            });

        }

        return res.status(200).json(user);

    }

    catch (err) {

        console.log(err);

        return res.status(500).json({

            message: "Failed To Fetch User"

        });

    }

};
module.exports = {

    register,

    login,

    googleLogin,

    dashboard,
    getCurrentUser,
    logout

};