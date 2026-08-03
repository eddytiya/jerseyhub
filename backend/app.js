require("dotenv").config();

const express = require("express");
const cors = require('cors');
const session = require('express-session');
const { MongoStore } = require('connect-mongo');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const { connectDB } = require('./db');

const jerseyRouter = require('./route/jerseyRoute');
const productRoute = require("./route/ProductRoutes");

const userRouter = require('./route/userRoute');
const categoryRoute = require('./route/categoryRoute');
const cartRoute = require('./route/cartRoute');
const dashboardRoute = require('./route/dashboardRoute');
const orderRoute = require('./route/orderRoute');
const notificationRoutes = require('./route/notificationRoutes');
const profileRoute = require('./route/profileRoute');
const reviewRoute = require("./route/reviewRoute");
const productTypeRouter = require("./route/productTypeRoute");
const paymentRoute=require("./route/paymentRoute");
const newsletterRoute = require("./route/newsletterRoute");
const stockAlertRoute = require("./route/stockAlertRoute");
const couponRoute = require("./route/couponRoute");
const bulkInquiryRoute = require("./route/bulkInquiryRoute");
const seoRoute = require("./route/seoRoute");
const { startAbandonedCartJob } = require("./utils/abandonedCartJob");

const app = express();

app.set("trust proxy", 1);

/* ==========================================
            DATABASE CONNECTION
========================================== */

connectDB();
startAbandonedCartJob();

/* ==========================================
            MIDDLEWARE
========================================== */

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5180",
      "https://jerseyhub-git-main-eddytiyaa.vercel.app",
      "https://jerseyhub-lilac.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        proxy: true,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            collectionName: "sessions",
            ttl: 60 * 60,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax",
        },
    })
);

/* ==========================================
            RATE LIMITING (AUTH ROUTES)
========================================== */

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many attempts. Please try again later." },
});

app.use(["/user/login", "/user/register", "/user/google-login"], authLimiter);

/* ==========================================
                HOME
========================================== */

app.get('/', (req, res) => {

    res.send('Football Jersey Store API Running');

});

app.use(

    "/newsletter",

    newsletterRoute

);

/* ==========================================
                ROUTES
========================================== */

app.use('/jersey', jerseyRouter);

app.use('/product', productRoute); // ✅ NEW

app.use('/category', categoryRoute);

app.use('/user', userRouter);
app.use("/review",reviewRoute);

app.use('/cart', cartRoute);

app.use('/dashboard', dashboardRoute);

app.use('/order', orderRoute);

app.use('/profile', profileRoute);

app.use('/notification', notificationRoutes);

app.use("/product-type", productTypeRouter);



app.use(

    "/payment",

    paymentRoute

);

app.use("/stock-alert", stockAlertRoute);

app.use("/coupon", couponRoute);

app.use("/bulk-inquiry", bulkInquiryRoute);

app.use(seoRoute);

/* ==========================================
                SERVER
========================================== */

const PORT = process.env.PORT || 2987;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
