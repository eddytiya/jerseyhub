import React from "react";

import "./ConfirmOrderModal.css";

const ConfirmOrderModal = ({

    show,

    onClose,

    onConfirm,

    form,

    total

}) => {

    if (!show) return null;

    return (

        <div

            className="confirm-overlay"

            onClick={onClose}

        >

            <div

                className="confirm-modal"

                onClick={(e)=>e.stopPropagation()}

            >

                <h2>

                    Confirm Your Order

                </h2>

                <div className="confirm-section">

                    <h4>

                        Delivery Address

                    </h4>

                    <p>

                        <strong>

                            {form.fullName}

                        </strong>

                    </p>

                    <p>

                        {form.address1}

                    </p>

                    {

                        form.address2 &&

                        <p>

                            {form.address2}

                        </p>

                    }

                    <p>

                        {form.city},

                        {" "}

                        {form.state}

                    </p>

                    <p>

                        {form.pincode}

                    </p>

                    <p>

                        📞

                        {" "}

                        {form.phone}

                    </p>

                </div>

                <div className="confirm-section">

                    <h4>

                        Payment

                    </h4>

                    <p>

                        Cash On Delivery

                    </p>

                </div>

                <div className="confirm-total">

                    Grand Total

                    <span>

                        ₹{total}

                    </span>

                </div>

                <div className="confirm-buttons">

                    <button

                        className="cancel-confirm"

                        onClick={onClose}

                    >

                        Cancel

                    </button>

                    <button

                        className="place-confirm"

                        onClick={onConfirm}

                    >

                        Place Order

                    </button>

                </div>

            </div>

        </div>

    );

};

export default ConfirmOrderModal;