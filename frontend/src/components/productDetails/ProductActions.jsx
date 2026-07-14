import React, { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import {

    showSuccess,

    showError

} from "../../utils/toastUtils";

const ProductActions = ({

    jersey,

    onAddToCart,


}) => {

    const [quantity, setQuantity] = useState(1);

    const navigate = useNavigate();

    /* ==========================================
                BUY NOW
========================================== */

const handleBuyNow = async () => {

    try {

      const userId = localStorage.getItem("userId");

        if (!userId) {

            showError(

                "Please login first."

            );

            return;

        }

        await axios.post(

            "http://localhost:2987/cart/buy-now",

            {

                userId,

                jerseyId: jersey._id,

                quantity

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

            <button

                className="cart-btn"

                onClick={()=>onAddToCart(quantity)}

            >

                Add To Cart

            </button>

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