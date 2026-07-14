import React, { memo } from "react";
import "./Customers.css";

const Customers = ({ filteredCustomers }) => {

    return (

        <section className="adminpage-customers">

            <div className="adminpage-customers-card">

                <div className="adminpage-customers-header">

                    <div>

                        <h3 className="adminpage-customers-title">

                            🏆 Best Customers

                        </h3>

                        <p className="adminpage-customers-subtitle">

                            Top customers based on total purchases

                        </p>

                    </div>

                    <span className="adminpage-customers-count">

                        {filteredCustomers.length} Customers

                    </span>

                </div>

                {

                    filteredCustomers.length === 0

                    ?

                    (

                        <div className="adminpage-customers-empty">

                            <div className="adminpage-customers-empty-icon">

                                🏆

                            </div>

                            <h4>No Customers Found</h4>

                            <p>

                                Customers matching your search will appear here.

                            </p>

                        </div>

                    )

                    :

                    (

                        <div className="adminpage-customers-table-wrapper">

                            <table className="adminpage-customers-table">

                                <thead>

                                    <tr>

                                        <th>Rank</th>

                                        <th>Customer</th>

                                        <th>Email</th>

                                        <th>Orders</th>

                                        <th>Total Spent</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        filteredCustomers.map((customer,index)=>(

                                            <tr

                                                key={index}

                                                className="adminpage-customers-row"

                                            >

                                                <td>

                                                    <div className="adminpage-customers-rank">

                                                        {

                                                            index===0

                                                            ?

                                                            "🥇"

                                                            :

                                                            index===1

                                                            ?

                                                            "🥈"

                                                            :

                                                            index===2

                                                            ?

                                                            "🥉"

                                                            :

                                                            `#${index+1}`

                                                        }

                                                    </div>

                                                </td>

                                                <td>

                                                    <div className="adminpage-customers-user">

                                                        <div className="adminpage-customers-avatar">

                                                            {

                                                                customer.name?.charAt(0)

                                                            }

                                                        </div>

                                                        <div>

                                                            <h6>

                                                                {customer.name}

                                                            </h6>

                                                            <small>

                                                                Premium Customer

                                                            </small>

                                                        </div>

                                                    </div>

                                                </td>

                                                <td>

                                                    <span className="adminpage-customers-email">

                                                        {customer.email}

                                                    </span>

                                                </td>

                                                <td>

                                                    <span className="adminpage-customers-orders">

                                                        {customer.totalOrders}

                                                    </span>

                                                </td>

                                                <td>

                                                    <span className="adminpage-customers-price">

                                                        ₹ {customer.totalSpent}

                                                    </span>

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

export default memo(Customers);