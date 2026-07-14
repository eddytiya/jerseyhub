import React, {

    useEffect,

    useState

} from "react";

import {

    useLocation,

    useNavigate

} from "react-router-dom";

import axios from "axios";
import CheckoutSteps from "./CheckoutSteps";
import ConfirmOrderModal from "./ConfirmOrderModal";
import {

    showError

} from "../../utils/toastUtils";

import "./Checkout.css";

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

}, []);

    const fetchCart = () => {

        const url = buyNow === "true"

            ?

            `http://localhost:2987/cart/buy-now/${userId}`

            :

            `http://localhost:2987/cart/${userId}`;

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

        "http://localhost:2987/user/me",

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

    })

    .catch((err) => {

        console.log(err);

    });

};

    const totalPrice = cartItems.reduce(

        (total, item) =>

            total +

            item.jerseyId.price *

            item.quantity,

        0

    );

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

            "http://localhost:2987/order/create-order",

            {

                amount: totalPrice

            }

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

                console.log(response);

            }

        };

        const razor = new window.Razorpay(options);

        razor.open();

    }

    catch (err) {

        console.log(err);

        showError(

            "Unable to start payment."

        );

    }

    finally {

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

    if (!/^\d{10}$/.test(form.phone)) {

        showError(

            "Enter a valid 10-digit mobile number."

        );

        return;

    }

    if (!/^\d{6}$/.test(form.pincode)) {

        showError(

            "Enter a valid 6-digit pincode."

        );

        return;

    }

    setLoading(true);

if (paymentMethod === "COD") {

    axios.post(

        "http://localhost:2987/order/checkout",

        {

            userId,

            buyNow: buyNow === "true",

            deliveryInfo: form,

            paymentMethod

        }

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

        <div className="checkout-form">

            <h2>

                Delivery Information

            </h2>

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
            onChange={(e) =>
                setPaymentMethod(e.target.value)
            }
        />

        Cash On Delivery

    </label>

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

        </div>

        {/* ================= RIGHT ================= */}

          {/* ================= RIGHT ================= */}

        <div className="checkout-right">

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

                <div className="shipping-row">

                    <span>

                        Shipping

                    </span>

                    <strong>

                        FREE

                    </strong>

                </div>

                <div className="summary-total">

                    <h2>

                        Grand Total

                    </h2>

                    <h2>

                        ₹

                        {

                            totalPrice

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

                <button

                    className="place-order-btn"

                    disabled={loading}

                    onClick={handlePlaceOrder}

                >

                    {

                        loading

                            ?

                            "Placing Order..."

                            :

                            "Place Order"

                    }

                </button>

            </div>

        </div>

    </div>

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

        total={totalPrice}

    />

</div>

);

};

export default Checkout;

