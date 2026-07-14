import React from "react";

import "./OrdersTable.css";

import OrderRow from "./OrderRow";

const OrdersTable = ({

    orders,

    onStatusChange,

    onViewOrder

}) => {

    if(orders.length===0){

        return(

            <div className="admin-orders-empty">

                <h3>

                    No Orders Found

                </h3>

                <p>

                    Try changing the search or filter.

                </p>

            </div>

        );

    }

    return(

        <div className="admin-orders-table-wrapper">

            <table className="admin-orders-table">

                <thead>

                    <tr>

                        <th>Order ID</th>

                        <th>Customer</th>

                        <th>Date</th>

                        <th>Total</th>

                        <th>Status</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        orders.map(order=>(

                            <OrderRow

                                key={order._id}

                                order={order}

                                onStatusChange={onStatusChange}

                                onViewOrder={onViewOrder}

                            />

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

};

export default OrdersTable;