import React, { memo } from "react";
import { NavLink } from 'react-router-dom';
import './RecentOrders.css';

const RecentOrders = ({ filteredOrders }) => {

    const getStatusClass = (status) => {

        switch(status){

    case "Pending":
        return "status-pending";

    case "Processing":
        return "status-processing";

    case "Shipped":
        return "status-shipped";

    default:
        return "status-delivered";

}

    };

    return (

    <section className="adminpage-orders">

        <div className="adminpage-orders-card">

            <div className="adminpage-orders-header">

                <div>

                    <h3 className="adminpage-orders-title">

                        📦 Recent Orders

                    </h3>

                    <p className="adminpage-orders-subtitle">

                        Latest customer purchases

                    </p>

                </div>

                <span className="adminpage-orders-count">

                    {filteredOrders.length} Orders

                </span>

            </div>

            {

                filteredOrders.length === 0

                ?

                (

                    <div className="adminpage-orders-empty">

                        <div className="adminpage-orders-empty-icon">

                            📦

                        </div>

                        <h4>No Orders Found</h4>

                        <p>

                            Orders matching your search will appear here.

                        </p>

                    </div>

                )

                :

                (

                    <div className="adminpage-orders-table-wrapper">

                        <table className="adminpage-orders-table">

                            <thead>

                                <tr>

                                    <th>Customer</th>

                                    <th>Total</th>

                                    <th>Status</th>

                                    <th>Date</th>

                                    <th>Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    filteredOrders.map((order)=>(

                                        <tr

                                            key={order._id}

                                            className="adminpage-orders-row"

                                        >

                                            <td>

                                                <div className="adminpage-orders-customer">

                                                    <div className="adminpage-orders-avatar">

                                                        {

                                                            order.customerName?.charAt(0)

                                                        }

                                                    </div>

                                                    <div>

                                                        <h6>

                                                            {order.customerName}

                                                        </h6>

                                                        <small>

                                                            Customer

                                                        </small>

                                                    </div>

                                                </div>

                                            </td>

                                            <td>

                                                <span className="adminpage-orders-price">

                                                    ₹ {order.totalAmount}

                                                </span>

                                            </td>

                                            <td>

                                                <span

                                                  className={`adminpage-orders-status adminpage-${getStatusClass(order.status)}`}

                                                >

                                                    {order.status}

                                                </span>

                                            </td>

                                            <td>

                                                {

                                                    new Date(order.createdAt)

                                                    .toLocaleDateString()

                                                }

                                            </td>

                                            <td>

                                                <NavLink

                                                    to={`/manage-orders/${order._id}`}

                                                    className="adminpage-orders-btn"

                                                >

                                                    View →

                                                </NavLink>

                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    </div>

                )

            }

        </div>

    </section>

);

};

export default memo(RecentOrders);