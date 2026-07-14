import React from "react";

import OrderStatusBadge from "./OrderStatusBadge";

const OrderRow = ({

    order,

    onStatusChange,

    onViewOrder

}) => {

    return (

        <tr className="admin-orders-row">

            {/* Order ID */}

            <td>

                <span className="admin-orders-id">

                    #{order._id.slice(-6).toUpperCase()}

                </span>

            </td>

            {/* Customer */}

            <td>

                <div className="admin-orders-customer">

                    <div className="admin-orders-avatar">

                        {

                            order.customerName

                                ?.charAt(0)

                                ?.toUpperCase()

                        }

                    </div>

                    <div className="admin-orders-customer-info">

                        <h5>

                            {order.customerName}

                        </h5>

                        <small>

                            {order.customerEmail}

                        </small>

                    </div>

                </div>

            </td>

            {/* Date */}

            <td>

                <span className="admin-orders-date">

                    {

                        new Date(

                            order.orderDate

                        ).toLocaleDateString(

                            "en-GB"

                        )

                    }

                </span>

            </td>

            {/* Amount */}

            <td>

                <span className="admin-orders-price">

                    ₹ {Number(order.totalAmount).toLocaleString()}

                </span>

            </td>

            {/* Status */}

            <td>

                <OrderStatusBadge

                    status={order.status}

                    orderId={order._id}

                    onStatusChange={onStatusChange}

                />

            </td>

            {/* Action */}

            <td>

                <button

                    className="admin-orders-view-btn"

                    onClick={() =>

                        onViewOrder(order)

                    }

                >

                    View Details

                </button>

            </td>

        </tr>

    );

};

export default OrderRow;