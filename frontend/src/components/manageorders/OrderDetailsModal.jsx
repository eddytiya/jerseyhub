import React from "react";

import "./OrderDetailsModal.css";

const OrderDetailsModal = ({

    isOpen,

    order,

    onClose

}) => {

    if(

        !isOpen ||

        !order

    ){

        return null;

    }

    return (

        <div className="admin-orders-modal-overlay">

            <div className="admin-orders-modal">

                <div className="admin-orders-modal-header">

                    <h2>

                        Order Details

                    </h2>

                    <button

                        onClick={onClose}

                        className="admin-orders-close-btn"

                    >

                        ✕

                    </button>

                </div>

                <div className="admin-orders-modal-body">

                    <div className="admin-orders-modal-grid">

                        <div>

                            <label>

                                Order ID

                            </label>

                            <p>

                                #{order._id}

                            </p>

                        </div>

                        <div>

                            <label>

                                Customer

                            </label>

                            <p>

                                {order.customerName}

                            </p>

                        </div>

                        <div>

                            <label>

                                Email

                            </label>

                            <p>

                                {order.email}

                            </p>

                        </div>

                        <div>

                            <label>

                                Phone

                            </label>

                            <p>

                                {order.phone}

                            </p>

                        </div>

                        <div>

                            <label>

                                Total Amount

                            </label>

                            <p>

                                ₹ {Number(order.totalAmount).toLocaleString()}

                            </p>

                        </div>

                        <div>

                            <label>

                                Status

                            </label>

                            <p>

                                {order.status}

                            </p>

                        </div>

                    </div>

                    <div className="admin-orders-address">

                        <label>

                            Delivery Address

                        </label>

                        <p>

                            {order.address}

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default OrderDetailsModal;