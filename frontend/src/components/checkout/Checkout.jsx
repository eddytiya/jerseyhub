import React, {

    useEffect,

    useState

} from "react";

import {

    useLocation,

    useNavigate

} from "react-router-dom";
import API_URL from "../../utils/api";
import axios from "axios";
import { motion } from "framer-motion";
import CheckoutSteps from "./CheckoutSteps";
import ConfirmOrderModal from "./ConfirmOrderModal";
import MagneticButton from "../common/MagneticButton";
import "../common/MagneticButton.css";
import {

    showError

} from "../../utils/toastUtils";

import "./Checkout.css";

const EASE_OUT = [0.16, 1, 0.3, 1];

const Checkout = () => {
    

    const navigate = useNavigate();

    const location = useLocation();

    const buyNow = new URLSearchParams(

        location.search

    ).get(

        "buyNow"

    );

    const userId = localStorage.getItem(

        "userId"

    );

    const [cartItems, setCartItems] = useState([]);

    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [checkoutQuote, setCheckoutQuote] = useState(null);
    const [idempotencyKey] = useState(() => crypto.randomUUID());

    const [couponInput, setCouponInput] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [couponLoading, setCouponLoading] = useState(false);

    const [savedAddresses, setSavedAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState("");
    const [saveAddress, setSaveAddress] = useState(false);

    const [loyaltyPoints, setLoyaltyPoints] = useState(0);
    const [pointsToRedeem, setPointsToRedeem] = useState(0);
    const [usePoints, setUsePoints] = useState(false);

    const [form, setForm] = useState({

        fullName: "",

        email: "",

        phone: "",

        address1: "",

        address2: "",

        city: "",

        state: "",

        pincode: "",

        landmark: ""

    });

    useEffect(() => {

    fetchCart();

    fetchUser();

    fetchAddresses();

}, []);

    const fetchCart = () => {

        const url = buyNow === "true"

            ?

            `${API_URL}/cart/buy-now/${userId}`

            :

            `${API_URL}/cart/${userId}`;

        axios.get(url)

        .then((resp) => {

            setCartItems(resp.data);

        })

        .catch(console.log);

    };

    /* ==========================================
            FETCH CURRENT USER
========================================== */

const fetchUser = () => {

    axios.get(

        `${API_URL}/user/me`,

        {

            withCredentials: true

        }

    )

    .then((resp) => {

        setForm((prev) => ({

            ...prev,

            fullName: resp.data.uname || "",

            email: resp.data.email || ""

        }));

        setLoyaltyPoints(resp.data.loyaltyPoints || 0);

    })

    .catch((err) => {

        console.log(err);

    });

};

    /* ==========================================
            SAVED ADDRESSES
========================================== */

const fetchAddresses = () => {

    axios.get(

        `${API_URL}/profile/addresses`,

        { withCredentials: true }

    )

    .then((resp) => {

        setSavedAddresses(resp.data);
    })

    .catch(() => {});

};

const handleSelectAddress = (id) => {

    setSelectedAddressId(id);

    const addr = savedAddresses.find((a) => a._id === id);

    if (addr) {

        setForm((prev) => ({

            ...prev,

            fullName: addr.fullName,

            phone: addr.phone,

            address1: addr.address1,

            address2: addr.address2 || "",

            city: addr.city,

            state: addr.state,

            pincode: addr.pincode,

            landmark: addr.landmark || ""

        }));

    }

};

    const totalPrice = cartItems.reduce(

        (total, item) =>

            total +

            item.jerseyId.price *

            item.quantity,

        0

    );

    const maxRedeemablePoints = Math.min(

        loyaltyPoints,

        Math.max(0, totalPrice - (appliedCoupon?.discountAmount || 0))

    );

    const effectivePointsRedeemed = usePoints

        ? Math.min(pointsToRedeem, maxRedeemablePoints)

        : 0;

    const localGrandTotal =

        totalPrice -

        (appliedCoupon?.discountAmount || 0) -

        effectivePointsRedeemed;

    const grandTotal = checkoutQuote?.totalAmount ?? localGrandTotal;

    useEffect(() => {
        if (!cartItems.length) return;
        const timer = setTimeout(() => {
            axios.post(`${API_URL}/order/quote`, {
                buyNow: buyNow === "true",
                couponCode: appliedCoupon?.code,
                redeemPoints: effectivePointsRedeemed
            }).then(({ data }) => {
                setCheckoutQuote(data);
                if (!data.codAvailable) setPaymentMethod("RAZORPAY");
            }).catch(() => setCheckoutQuote(null));
        }, 150);
        return () => clearTimeout(timer);
    }, [cartItems, buyNow, appliedCoupon?.code, effectivePointsRedeemed]);

    const handleApplyCoupon = () => {

        if (!couponInput.trim()) return;

        setCouponLoading(true);

        axios.post(

            `${API_URL}/coupon/validate`,

            {

                code: couponInput.trim(),

                orderAmount: totalPrice

            },

            {

                withCredentials: true

            }

        )

        .then((resp) => {

            setAppliedCoupon({

                code: resp.data.code,

                discountAmount: resp.data.discountAmount

            });

        })

        .catch((err) => {

            setAppliedCoupon(null);

            showError(

                err.response?.data?.message ||

                "Invalid Coupon"

            );

        })

        .finally(() => {

            setCouponLoading(false);

        });

    };

    const handleRemoveCoupon = () => {

        setAppliedCoupon(null);

        setCouponInput("");

    };

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]:

            e.target.value

        });

    };

    const handlePlaceOrder = () => {

    if (

        !form.fullName ||

        !form.email ||

        !form.phone ||

        !form.address1 ||

        !form.city ||

        !form.state ||

        !form.pincode

    ) {

        showError(

            "Please fill all required fields."

        );

        return;

    }

    setShowConfirm(true);

};


const loadRazorpayScript = () => {

    return new Promise((resolve) => {

        const script = document.createElement("script");

        script.src = "https://checkout.razorpay.com/v1/checkout.js";

        script.onload = () => resolve(true);

        script.onerror = () => resolve(false);

        document.body.appendChild(script);

    });

};


const startRazorpayPayment = async () => {

    const loaded = await loadRazorpayScript();

    if (!loaded) {

        showError(

            "Unable to load Razorpay."

        );

        return;

    }

    try {

        const { data } = await axios.post(

           `${API_URL}/order/create-order`,

            {
                buyNow: buyNow === "true",
                couponCode: appliedCoupon?.code,
                redeemPoints: effectivePointsRedeemed,
                deliveryInfo: form,
                idempotencyKey

            },
            { headers: { "Idempotency-Key": idempotencyKey } }

        );

        const options = {

            key: import.meta.env.VITE_RAZORPAY_KEY,

            amount: data.amount,

            currency: data.currency,

            name: "JerseyHub",

            description: "Football Jersey Purchase",

            order_id: data.id,

            prefill: {

                name: form.fullName,

                email: form.email,

                contact: form.phone

            },

            theme: {

                color: "#2563eb"

            },

            handler: function (response) {

                axios.post(

                    `${API_URL}/order/verify-payment`,

                    {

                        razorpay_order_id: response.razorpay_order_id,

                        razorpay_payment_id: response.razorpay_payment_id,

                        razorpay_signature: response.razorpay_signature,

                        buyNow: buyNow === "true",

                        deliveryInfo: form,

                        couponCode: appliedCoupon?.code,

                        redeemPoints: effectivePointsRedeemed,
                        idempotencyKey

                    },
                    { headers: { "Idempotency-Key": idempotencyKey } }

                )

                .then((resp) => {

                    navigate("/order-success", {

                        state: {

                            order: resp.data.order

                        }

                    });

                })

                .catch((err) => {

                    showError(

                        err.response?.data?.message ||

                        "Payment Verification Failed"

                    );

                })

                .finally(() => {

                    setLoading(false);

                });

            },

            modal: {

                ondismiss: function () {

                    setLoading(false);

                }

            }

        };

        const razor = new window.Razorpay(options);

        razor.on("payment.failed", function () {

            showError("Payment Failed. Please try again.");

            setLoading(false);

        });

        razor.open();

    }

    catch (err) {

        console.log(err);

        showError(

            "Unable to start payment."

        );

        setLoading(false);

    }

};
    /* ==========================================
            PLACE ORDER
========================================== */

const confirmPlaceOrder = () => {

    if (

        !form.fullName ||

        !form.email ||

        !form.phone ||

        !form.address1 ||

        !form.city ||

        !form.state ||

        !form.pincode

    ) {

        showError(

            "Please fill all required fields."

        );

        return;

    }

    if (!/^[6-9]\d{9}$/.test(form.phone)) {

        showError(

            "Enter a valid 10-digit mobile number."

        );

        return;

    }

    if (!/^[1-9]\d{5}$/.test(form.pincode)) {

        showError(

            "Enter a valid 6-digit pincode."

        );

        return;

    }

    if (saveAddress && userId) {

        axios.post(

            `${API_URL}/profile/addresses`,

            form,

            { withCredentials: true }

        ).catch(() => {});

    }

    setLoading(true);

    if (paymentMethod === "COD" && checkoutQuote && !checkoutQuote.codAvailable) {
        showError(checkoutQuote.codUnavailableReason);
        setLoading(false);
        return;
    }

if (paymentMethod === "COD") {

    axios.post(

       `${API_URL}/order/checkout`,

        {

            userId,

            buyNow: buyNow === "true",

            deliveryInfo: form,

            paymentMethod,

            couponCode: appliedCoupon?.code,

            redeemPoints: effectivePointsRedeemed,
            idempotencyKey

        },
        { headers: { "Idempotency-Key": idempotencyKey } }

    )

    .then((resp) => {

        navigate("/order-success", {

            state: {

                order: resp.data.order

            }

        });

    })

    .catch((err) => {

        showError(

            err.response?.data?.message ||

            "Order Failed"

        );

    })

    .finally(() => {

        setLoading(false);

    });

}

else {

    startRazorpayPayment();

}

};



return (

<div className="checkout-page">
    <CheckoutSteps />
    <div className="checkout-container">

        {/* ================= LEFT ================= */}

        <motion.div
            className="checkout-form"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
        >

            <h2>

                Delivery Information

            </h2>

            {
                savedAddresses.length > 0 && (
                    <div className="saved-address-row">
                        {
                            savedAddresses.map((addr) => (
                                <button
                                    type="button"
                                    key={addr._id}
                                    className={`saved-address-chip ${selectedAddressId === addr._id ? "active" : ""}`}
                                    onClick={() => handleSelectAddress(addr._id)}
                                >
                                    {addr.label || "Address"} — {addr.city}
                                </button>
                            ))
                        }
                    </div>
                )
            }

            <div className="checkout-grid">

                <input

    type="text"

    name="fullName"

    placeholder="Full Name"

    value={form.fullName}

    onChange={handleChange}

/>

                <input

    type="email"

    name="email"

    placeholder="Email"

    value={form.email}

    onChange={handleChange}

/>

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="address1"
                    placeholder="Address Line 1"
                    value={form.address1}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="address2"
                    placeholder="Address Line 2 (Optional)"
                    value={form.address2}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={form.state}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={form.pincode}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="landmark"
                    placeholder="Landmark (Optional)"
                    value={form.landmark}
                    onChange={handleChange}
                />

            </div>

            {
                userId && (
                    <label className="save-address-checkbox">
                        <input
                            type="checkbox"
                            checked={saveAddress}
                            onChange={(e) => setSaveAddress(e.target.checked)}
                        />
                        Save This Address For Next Time
                    </label>
                )
            }

            <div className="payment-box">

    <h4>

        Payment Method

    </h4>

    <label className="payment-option">

        <input
            type="radio"
            name="payment"
            value="COD"
            checked={paymentMethod === "COD"}
            disabled={checkoutQuote && !checkoutQuote.codAvailable}
            onChange={(e) =>
                setPaymentMethod(e.target.value)
            }
        />

        Cash On Delivery

    </label>

    {checkoutQuote && !checkoutQuote.codAvailable && (
        <small style={{ color: "var(--danger, #dc2626)" }}>
            {checkoutQuote.codUnavailableReason}
        </small>
    )}

    <label className="payment-option">

        <input
            type="radio"
            name="payment"
            value="RAZORPAY"
            checked={paymentMethod === "RAZORPAY"}
            onChange={(e) =>
                setPaymentMethod(e.target.value)
            }
        />

        Razorpay (UPI / Card / Wallet / Net Banking)

    </label>

</div>

        </motion.div>

        {/* ================= RIGHT ================= */}

        <motion.div
            className="checkout-right"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: EASE_OUT }}
        >

            {/* Delivery Card */}

            <div className="delivery-card">

                <h4>

                    🚚 Delivery

                </h4>

                <p>

                    FREE Delivery

                </p>

                <strong>

                    Estimated Delivery :

                    {

                        new Date(

                            Date.now() +

                            5 * 24 * 60 * 60 * 1000

                        ).toLocaleDateString(

                            "en-IN",

                            {

                                day: "numeric",

                                month: "long"

                            }

                        )

                    }

                </strong>

            </div>

            {/* Order Summary */}

            <div className="checkout-summary">

                <h3>

                    Order Summary

                </h3>

                {

                    cartItems.map(item => (

                        <div

                            className="summary-item"

                            key={item._id}

                        >

                            <img

                                src={item.jerseyId.imageUrl}

                                alt={item.jerseyId.jerseyName}

                                className="summary-image"

                            />

                            <div className="summary-details">

                                <h5>

                                    {

                                        item.jerseyId.teamName

                                    }

                                </h5>

                                <p>

                                    {

                                        item.jerseyId.jerseyName

                                    }

                                    {item.selectedSize && (
                                        <small style={{ display: "block" }}>
                                            Size: {item.selectedSize}{item.sku ? ` · ${item.sku}` : ""}
                                        </small>
                                    )}

                                </p>

                                <small>

                                    Qty :

                                    {

                                        item.quantity

                                    }

                                </small>

                            </div>

                            <strong>

                                ₹

                                {

                                    item.jerseyId.price *

                                    item.quantity

                                }

                            </strong>

                        </div>

                    ))

                }

                <hr />

                <div className="coupon-box">

                    {
                        appliedCoupon ? (
                            <div className="coupon-applied">
                                <span>
                                    🎟 {appliedCoupon.code} Applied
                                </span>
                                <button
                                    type="button"
                                    onClick={handleRemoveCoupon}
                                >
                                    Remove
                                </button>
                            </div>
                        ) : (
                            <div className="coupon-input-row">
                                <input
                                    type="text"
                                    placeholder="Coupon Code"
                                    value={couponInput}
                                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                                />
                                <button
                                    type="button"
                                    disabled={couponLoading}
                                    onClick={handleApplyCoupon}
                                >
                                    {couponLoading ? "..." : "Apply"}
                                </button>
                            </div>
                        )
                    }

                </div>

                {
                    userId && loyaltyPoints > 0 && (
                        <div className="coupon-box">

                            <label className="save-address-checkbox">
                                <input
                                    type="checkbox"
                                    checked={usePoints}
                                    onChange={(e) => {
                                        setUsePoints(e.target.checked);
                                        if (e.target.checked && pointsToRedeem === 0) {
                                            setPointsToRedeem(maxRedeemablePoints);
                                        }
                                    }}
                                />
                                Use Loyalty Points ({loyaltyPoints} Available)
                            </label>

                            {
                                usePoints && (
                                    <div className="coupon-input-row" style={{ marginTop: "10px" }}>
                                        <input
                                            type="number"
                                            min="0"
                                            max={maxRedeemablePoints}
                                            value={pointsToRedeem}
                                            onChange={(e) =>
                                                setPointsToRedeem(
                                                    Math.max(0, Math.min(Number(e.target.value), maxRedeemablePoints))
                                                )
                                            }
                                        />
                                        <span style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
                                            = ₹{effectivePointsRedeemed} Off
                                        </span>
                                    </div>
                                )
                            }

                        </div>
                    )
                }

                <div className="shipping-row">

                    <span>

                        Shipping

                    </span>

                    <strong>

                        {checkoutQuote?.shippingAmount ? `₹${checkoutQuote.shippingAmount}` : "FREE"}

                    </strong>

                </div>

                {checkoutQuote && (
                    <div className="shipping-row">
                        <span>GST ({checkoutQuote.taxRate}% included)</span>
                        <strong>₹{checkoutQuote.taxAmount}</strong>
                    </div>
                )}

                {
                    appliedCoupon && (
                        <div className="shipping-row discount-row">
                            <span>
                                Discount ({appliedCoupon.code})
                            </span>
                            <strong>
                                -₹{appliedCoupon.discountAmount}
                            </strong>
                        </div>
                    )
                }

                {
                    effectivePointsRedeemed > 0 && (
                        <div className="shipping-row discount-row">
                            <span>
                                Points Redeemed
                            </span>
                            <strong>
                                -₹{effectivePointsRedeemed}
                            </strong>
                        </div>
                    )
                }

                <div className="summary-total">

                    <h2>

                        Grand Total

                    </h2>

                    <h2>

                        ₹

                        {

                            grandTotal

                        }

                    </h2>

                </div>

                <div className="checkout-trust">

                    <h5>

                        🔒 Secure Checkout

                    </h5>

                    <ul>

                        <li>

                            ✔ 100% Authentic Jerseys

                        </li>

                        <li>

                            ✔ Cash On Delivery

                        </li>

                        <li>

                            ✔ Easy Returns

                        </li>

                        <li>

                            ✔ Safe & Secure Payment

                        </li>

                    </ul>

                </div>

                <MagneticButton

                    className="place-order-btn"

                    disabled={loading}

                    onClick={handlePlaceOrder}

                    pullStrength={0.12}

                >

                    {

                        loading

                            ?

                            "Placing Order..."

                            :

                            "Place Order"

                    }

                </MagneticButton>

            </div>

        </motion.div>

    </div>

    {/* Mobile-only — keeps the primary action within thumb reach instead
        of requiring a scroll past the whole delivery form + summary. */}
    {

        cartItems.length > 0 &&

        (

            <div className="mobile-checkout-bar">

                <div className="mobile-checkout-total">
                    <small>Total</small>
                    <strong>₹ {grandTotal}</strong>
                </div>

                <button disabled={loading} onClick={handlePlaceOrder}>
                    {loading ? "Placing…" : "Place Order"}
                </button>

            </div>

        )

    }

    <ConfirmOrderModal

        show={showConfirm}

        onClose={() =>

            setShowConfirm(false)

        }

        onConfirm={() => {

            setShowConfirm(false);

            confirmPlaceOrder();

        }}

        form={form}

        total={grandTotal}

    />

</div>

);

};

export default Checkout;

