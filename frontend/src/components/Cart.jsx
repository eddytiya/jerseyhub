import React, {

    useEffect,

    useState

} from 'react'

import {

    useLocation,

    useNavigate,

    Link

} from "react-router-dom";
import axios from 'axios'
import { AnimatePresence, motion } from 'framer-motion'
import API_URL from "../utils/api";
import {

    showSuccess,

    showError

} from '../utils/toastUtils'

import "./Cart.css";


import { FaLock, FaShoppingBag, FaArrowRight } from "react-icons/fa";

const EASE_OUT = [0.16, 1, 0.3, 1];

const listVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } }
};

// Entrance only animates opacity (never `transform`) so the existing
// CSS hover lift/scale on .cart-item keeps working after mount — Framer
// leaves inline transform styles in place once it has animated them,
// which would otherwise permanently override the CSS :hover rule.
const itemVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.45, ease: EASE_OUT } },
    exit: { opacity: 0, x: -40, transition: { duration: 0.3, ease: EASE_OUT } }
};
const Cart = () => {

    const [cartItems, setCartItems] = useState([])

    const location = useLocation();
    const navigate = useNavigate();

const buyNow = new URLSearchParams(

    location.search

).get(

    "buyNow"

);

    useEffect(() => {

    fetchCart()

}, [])
const fetchCart = () => {

    const url = buyNow

        ?

        `${API_URL}/cart/buy-now/me`

        :

        `${API_URL}/cart/me`;

    axios.get(url, { withCredentials: true })

    .then((resp) => {

        setCartItems(

            resp.data

        );

    })

    .catch((err) => {

        console.log(err);

        showError(

            err.response?.data?.message ||

            "Failed To Fetch Cart"

        );

    });

};

const updateQuantity = (id, quantity) => {

    if (quantity < 1) return

    // Optimistic update — the number should move the instant you click,
    // not after a round trip. Reverted via fetchCart() if the request fails.
    const previous = cartItems

    setCartItems((items) =>
        items.map((item) =>
            item._id === id ? { ...item, quantity } : item
        )
    )

    axios.put(

        `${API_URL}/cart/update/${id}`,

        {

            quantity

        }

    )

    .catch((err) => {

        console.log(err)

        setCartItems(previous)

        showError(

            err.response?.data?.message ||

            "Failed To Update Quantity"

        )

    })

}

const removeItem = (id) => {

    const previous = cartItems

    setCartItems((items) => items.filter((item) => item._id !== id))

    axios.delete(

        `${API_URL}/cart/remove/${id}`

    )

    .then(() => {

        showSuccess(

            "Item Removed From Cart"

        )

    })

    .catch((err) => {

        console.log(err)

        setCartItems(previous)

        showError(

            err.response?.data?.message ||

            "Failed To Remove Item"

        )

    })

}

const handleCheckout = () => {

    navigate(

        `/checkout?buyNow=${buyNow === "true"}`

    );

};

const totalPrice =

    cartItems.reduce(

        (total, item) =>

            total +

            item.jerseyId.price *

            item.quantity,

        0

    )

   return (

    <div className="cart-page">

        {/* ================= HERO ================= */}

        <div className="cart-hero">

            <div className="cart-hero-content">

                <h1>

                    Shopping Cart

                </h1>

                <p>

                    Review your jerseys before proceeding to secure checkout.

                </p>

                <div className="cart-badges">

                    <div className="cart-badge">

                        🔒 Secure Checkout

                    </div>

                    <div className="cart-badge">

                        🚚 Fast Delivery

                    </div>

                    <div className="cart-badge">

                        ↩ Easy Returns

                    </div>

                </div>

            </div>

        </div>

        {

            cartItems.length === 0 ?

            (

                <motion.div
                    className="cart-empty"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE_OUT }}
                >

                    <div className="cart-empty-icon">
                        <FaShoppingBag />
                    </div>

                    <h4>

                        Your Cart Is Empty

                    </h4>

                    <p>

                        Looks like you haven't added any jerseys yet.

                    </p>

                    <Link to="/shop" className="cart-empty-btn">
                        Browse Jerseys
                        <FaArrowRight />
                    </Link>

                </motion.div>

            )

            :

            (

                <div className="cart-layout">

                    {/* ================= LEFT SIDE ================= */}

                    <motion.div

                        className="cart-items"

                        variants={listVariants}

                        initial="hidden"

                        animate="show"

                    >

                        <AnimatePresence>

                        {

                            cartItems.map((item) => (

                                <motion.div

                                    className="cart-item"

                                    key={item._id}

                                    variants={itemVariants}

                                    exit="exit"

                                >

                                    {/* IMAGE */}

                                    <div className="cart-image">

                                        <img

                                            src={item.jerseyId.imageUrl}

                                            alt={item.jerseyId.jerseyName}

                                        />

                                    </div>

                                    {/* INFO */}

                                    <div className="cart-info">

                                        <span className="cart-category">

                                            {item.jerseyId.category}

                                        </span>

                                        <h2>

                                            {item.jerseyId.teamName}

                                        </h2>

                                        <p>

                                            {item.jerseyId.jerseyName}

                                        </p>

                                        <h3>

                                            ₹ {item.jerseyId.price}

                                        </h3>

                                    </div>

                                    {/* QUANTITY */}

                                    <div className="cart-qty">

                                        <button

                                            onClick={() =>

                                                updateQuantity(

                                                    item._id,

                                                    item.quantity - 1

                                                )

                                            }

                                        >

                                            −

                                        </button>

                                        <span>

                                            {item.quantity}

                                        </span>

                                        <button

                                            onClick={() =>

                                                updateQuantity(

                                                    item._id,

                                                    item.quantity + 1

                                                )

                                            }

                                        >

                                            +

                                        </button>

                                    </div>

                                    {/* SUBTOTAL */}

                                    <div className="cart-subtotal">

                                        <small>

                                            Subtotal

                                        </small>

                                        <h2>

                                            ₹ {

                                                item.jerseyId.price *

                                                item.quantity

                                            }

                                        </h2>

                                    </div>

                                    {/* REMOVE */}

                                    <div className="cart-remove">

                                        <button

                                            onClick={() =>

                                                removeItem(

                                                    item._id

                                                )

                                            }

                                        >

                                            Remove

                                        </button>

                                    </div>

                                </motion.div>

                            ))

                        }

                        </AnimatePresence>

                    </motion.div>

                    {/* ================= RIGHT SIDE ================= */}

                    <div className="cart-summary">

    <div className="summary-header">

        <small>

            ORDER SUMMARY

        </small>

        <h3>

            Ready to Checkout

        </h3>

        <p>

            Your jerseys are reserved for a limited time.

        </p>

    </div>

    <div className="summary-divider"></div>

    <div className="summary-row">

        <span>

            🛒 Items

        </span>

        <strong>

            {cartItems.length}

        </strong>

    </div>

    <div className="summary-row">

        <span>

            💰 Subtotal

        </span>

        <strong>

            ₹ {totalPrice}

        </strong>

    </div>

    <div className="summary-row">

        <span>

            🚚 Shipping

        </span>

        <strong className="free">

            FREE

        </strong>

    </div>

    <div className="summary-row">

        <span>

            🎁 Discount

        </span>

        <strong>

            ₹ 0

        </strong>

    </div>

    <div className="summary-row">

        <span>

            🧾 Tax

        </span>

        <strong>

            Included

        </strong>

    </div>

    <div className="summary-divider"></div>

    <div className="summary-total">

        <div>

            <small>

                Grand Total

            </small>

            <h1>

                ₹ {totalPrice}

            </h1>

        </div>

    </div>

    <button

        className="checkout-btn"

        onClick={handleCheckout}

    >

        <span>

            <FaLock />

            Secure Checkout

        </span>

    </button>

    <div className="trust-box">

        <div>

            🔒 256-bit SSL Encryption

        </div>

        <div>

            🚚 Free Shipping

        </div>

        <div>

            ⭐ Trusted by 10,000+ Customers

        </div>

    </div>

</div>

                </div>

            )

        }

        {/* Mobile-only — the full checkout button lives inside
            .cart-summary which is far down the page on a phone;
            this keeps the primary action within thumb reach. */}
        {

            cartItems.length > 0 &&

            (

                <div className="mobile-checkout-bar">

                    <div className="mobile-checkout-total">
                        <small>Total</small>
                        <strong>₹ {totalPrice}</strong>
                    </div>

                    <button onClick={handleCheckout}>
                        <FaLock />
                        Checkout
                    </button>

                </div>

            )

        }

    </div>

)

}

export default Cart