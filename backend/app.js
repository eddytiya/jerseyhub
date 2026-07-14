require("dotenv").config();

const express = require("express");
const cors = require('cors');
const session = require('express-session');

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

const app = express();

/* ==========================================
            DATABASE CONNECTION
========================================== */

connectDB();

/* ==========================================
            MIDDLEWARE
========================================== */

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            process.env.FRONTEND_URL
        ],
        credentials: true
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
        cookie: {
            maxAge: 1000 * 60 * 60,
            secure: false
        }
    })
);

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

/* ==========================================
                SERVER
========================================== */

const PORT = process.env.PORT || 2987;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
