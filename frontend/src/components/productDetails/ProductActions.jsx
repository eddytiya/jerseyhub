import React, { useState } from "react";
import API_URL from "../../utils/api";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";

import MagneticButton from "../common/MagneticButton";
import "../common/MagneticButton.css";

import {

    showSuccess,

    showError

} from "../../utils/toastUtils";

const ProductActions = ({

    jersey,

    onAddToCart,


}) => {

    const [quantity, setQuantity] = useState(1);

    const [justAdded, setJustAdded] = useState(false);

    const [notifyEmail, setNotifyEmail] = useState("");

    const [notifyLoading, setNotifyLoading] = useState(false);

    const [notifySubmitted, setNotifySubmitted] = useState(false);

    const navigate = useNavigate();

    const outOfStock = jersey.stock <= 0;

    const handleAddToCart = () => {

        onAddToCart(quantity);

        setJustAdded(true);

        setTimeout(() => setJustAdded(false), 1400);

    };

    /* ==========================================
            NOTIFY ME (BACK IN STOCK)
========================================== */

    const handleNotifyMe = async () => {

        if (!notifyEmail || !/^\S+@\S+\.\S+$/.test(notifyEmail)) {

            showError("Please enter a valid email.");

            return;

        }

        setNotifyLoading(true);

        try {

            const resp = await axios.post(

                `${API_URL}/stock-alert`,

                {

                    jerseyId: jersey._id,

                    email: notifyEmail

                }

            );

            showSuccess(resp.data.message || "You'll Be Notified");

            setNotifySubmitted(true);

        }

        catch (err) {

            showError(

                err.response?.data?.message ||

                "Failed To Set Up Alert"

            );

        }

        finally {

            setNotifyLoading(false);

        }

    };

    /* ==========================================
                BUY NOW
========================================== */

const handleBuyNow = async () => {

    try {

       await axios.post(
    `${API_URL}/cart/buy-now`,
    {
        jerseyId: jersey._id,
        quantity
    },
    {
        withCredentials: true
    }
);

        showSuccess(

            "Proceeding To Checkout..."

        );

        navigate(

    "/cart?buyNow=true"

);

    }

    catch (err) {

        console.log(err);

        showError(

            err.response?.data?.message ||

            "Buy Now Failed."

        );

    }

};

    if (outOfStock) {

        return (

            <div className="product-actions">

                <p className="out-of-stock-label">
                    Out Of Stock
                </p>

                {
                    notifySubmitted ? (
                        <p className="notify-confirmation">
                            🔔 We'll Email You When It's Back
                        </p>
                    ) : (
                        <div className="notify-box">

                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                value={notifyEmail}
                                onChange={(e) => setNotifyEmail(e.target.value)}
                            />

                            <button
                                className="notify-btn"
                                disabled={notifyLoading}
                                onClick={handleNotifyMe}
                            >
                                {notifyLoading ? "..." : "Notify Me"}
                            </button>

                        </div>
                    )
                }

            </div>

        );

    }

    return (

        <div className="product-actions">

            <div className="quantity-selector">

                <button

                    onClick={()=>

                        quantity>1 &&

                        setQuantity(quantity-1)

                    }

                >

                    -

                </button>

                <span>

                    {quantity}

                </span>

                <button

                    onClick={()=>

                        setQuantity(quantity+1)

                    }

                >

                    +

                </button>

            </div>

            <MagneticButton

                className="cart-btn"

                pullStrength={0.18}

                disabled={justAdded}

                onClick={handleAddToCart}

            >

                <AnimatePresence mode="wait" initial={false}>

                    {
                        justAdded ? (
                            <motion.span
                                key="added"
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
                            >
                                <FiCheck /> Added
                            </motion.span>
                        ) : (
                            <motion.span
                                key="idle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                            >
                                Add To Cart
                            </motion.span>
                        )
                    }

                </AnimatePresence>

            </MagneticButton>

            <button

    className="buy-btn"

    onClick={handleBuyNow}

>

    Buy Now

</button>



        </div>

    );

};

export default ProductActions;