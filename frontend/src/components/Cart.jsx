import React, {

    useEffect,

    useState

} from 'react'

import {

    useLocation,

    useNavigate

} from "react-router-dom";
import axios from 'axios'
import {

    showSuccess,

    showError

} from '../utils/toastUtils'

import "./Cart.css";


import { FaLock } from "react-icons/fa";
const Cart = () => {

    const [cartItems, setCartItems] = useState([])

    const userId = localStorage.getItem('userId')
    const location = useLocation();
    const navigate = useNavigate();

const buyNow = new URLSearchParams(

    location.search

).get(

    "buyNow"

);

    useEffect(() => {

    if (userId) {

        fetchCart()

    }

}, [])
const fetchCart = () => {

    const url = buyNow

        ?

        `http://localhost:2987/cart/buy-now/${userId}`

        :

        `http://localhost:2987/cart/${userId}`;

    axios.get(url)

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

    axios.put(

        `http://localhost:2987/cart/update/${id}`,

        {

            quantity

        }

    )

    .then(() => {

        fetchCart()

    })

    .catch((err) => {

        console.log(err)

        showError(

            err.response?.data?.message ||

            "Failed To Update Quantity"

        )

    })

}

const removeItem = (id) => {

    axios.delete(

        `http://localhost:2987/cart/remove/${id}`

    )

    .then(() => {

        showSuccess(

            "Item Removed From Cart"

        )

        fetchCart()

    })

    .catch((err) => {

        console.log(err)

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

                <div className="text-center">

                    <h4>

                        Cart Is Empty

                    </h4>

                </div>

            )

            :

            (

                <div className="cart-layout">

                    {/* ================= LEFT SIDE ================= */}

                    <div className="cart-items">

                        {

                            cartItems.map((item) => (

                                <div

                                    className="cart-item"

                                    key={item._id}

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

                                </div>

                            ))

                        }

                    </div>

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

    </div>

)

}

export default Cart