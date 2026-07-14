import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, NavLink } from 'react-router-dom'
import API_URL from "../utils/api";
const OrderDetails = () => {

    const { id } = useParams()

    const [order, setOrder] = useState(null)

    useEffect(() => {

        axios.get(

            `${API_URL}/order/admin/${id}`,

            {
                withCredentials: true
            }

        )

        .then((resp) => {

            setOrder(resp.data)

        })

        .catch((err) => {

            console.log(err)

        })

    }, [id])

    if (!order) {

        return (

            <div className="container mt-5">

                <h3 className="text-center">

                    Loading...

                </h3>

            </div>

        )

    }

    return (

        <div className="container mt-4">

            <NavLink
                to="/manage-orders"
                className="btn btn-secondary mb-4"
            >
                ← Back To Orders
            </NavLink>

            <div className="card shadow border-0">

                <div className="card-body p-4">

                    <h2 className="text-center mb-4">

                        Order Details

                    </h2>

                    {/* Customer */}

                    <div className="card mb-4">

                        <div className="card-header bg-dark text-white">

                            Customer Information

                        </div>

                        <div className="card-body">

                            <div className="row">

                                <div className="col-md-6">

                                    <h5>Name</h5>

                                    <p>{order.customer?.uname}</p>

                                </div>

                                <div className="col-md-6">

                                    <h5>Email</h5>

                                    <p>{order.customer?.email}</p>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Ordered Items */}

                    <div className="card mb-4">

                        <div className="card-header bg-primary text-white">

                            Ordered Items

                        </div>

                        <div className="card-body">

                            {

                                order.items.map((item) => (

                                    <div

                                        key={item._id}

                                        className="row align-items-center border-bottom pb-4 mb-4"

                                    >

                                        <div className="col-md-3 text-center">

                                            <img

                                                src={item.jerseyId.imageUrl}

                                                alt={item.jerseyId.jerseyName}

                                                className="img-fluid rounded"

                                                style={{

                                                    maxHeight: "220px",

                                                    objectFit: "contain"

                                                }}

                                            />

                                        </div>

                                        <div className="col-md-9">

                                            <h3>

                                                {item.jerseyId.teamName}

                                            </h3>

                                            <h5 className="text-muted">

                                                {item.jerseyId.jerseyName}

                                            </h5>

                                            <p>

                                                Price :

                                                ₹ {item.jerseyId.price}

                                            </p>

                                            <p>

                                                Quantity :

                                                {item.quantity}

                                            </p>

                                            <h5 className="text-success">

                                                Subtotal :

                                                ₹ {

                                                    item.quantity *

                                                    item.jerseyId.price

                                                }

                                            </h5>

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                    </div>

                    {/* Payment */}

                    <div className="card mb-4">

                        <div className="card-header bg-success text-white">

                            Payment

                        </div>

                        <div className="card-body">

                            <h5>Status</h5>

                            <span className="badge bg-warning text-dark">

                                {order.paymentStatus}

                            </span>

                        </div>

                    </div>

                    {/* Timeline */}

                    <div className="card mb-4">

                        <div className="card-header bg-info text-white">

                            Order Timeline

                        </div>

                        <div className="card-body">

                            {/* Order Placed */}

                            <div className="d-flex align-items-center">

                                <div

                                    className={`rounded-circle d-flex justify-content-center align-items-center ${
                                        order.status === "Pending" ||
                                        order.status === "Processing" ||
                                        order.status === "Shipped" ||
                                        order.status === "Delivered"
                                            ? "bg-success text-white"
                                            : "bg-secondary text-white"
                                    }`}

                                    style={{

                                        width: "45px",

                                        height: "45px"

                                    }}

                                >

                                    ✓

                                </div>

                                <h5 className="ms-4">

                                    Order Placed

                                </h5>

                            </div>

                            <div

                                style={{

                                    width: "3px",

                                    height: "45px",

                                    background: "#ccc",

                                    marginLeft: "21px"

                                }}

                            />

                            {/* Processing */}

                            <div className="d-flex align-items-center">

                                <div

                                    className={`rounded-circle d-flex justify-content-center align-items-center ${
                                        order.status === "Processing" ||
                                        order.status === "Shipped" ||
                                        order.status === "Delivered"
                                            ? "bg-success text-white"
                                            : "bg-secondary text-white"
                                    }`}

                                    style={{

                                        width: "45px",

                                        height: "45px"

                                    }}

                                >

                                    ✓

                                </div>

                                <h5 className="ms-4">

                                    Processing

                                </h5>

                            </div>

                            <div

                                style={{

                                    width: "3px",

                                    height: "45px",

                                    background: "#ccc",

                                    marginLeft: "21px"

                                }}

                            />

                            {/* Shipped */}

                            <div className="d-flex align-items-center">

                                <div

                                    className={`rounded-circle d-flex justify-content-center align-items-center ${
                                        order.status === "Shipped" ||
                                        order.status === "Delivered"
                                            ? "bg-success text-white"
                                            : "bg-secondary text-white"
                                    }`}

                                    style={{

                                        width: "45px",

                                        height: "45px"

                                    }}

                                >

                                    ✓

                                </div>

                                <h5 className="ms-4">

                                    Shipped

                                </h5>

                            </div>

                            <div

                                style={{

                                    width: "3px",

                                    height: "45px",

                                    background: "#ccc",

                                    marginLeft: "21px"

                                }}

                            />

                            {/* Delivered */}

                            <div className="d-flex align-items-center">

                                <div

                                    className={`rounded-circle d-flex justify-content-center align-items-center ${
                                        order.status === "Delivered"
                                            ? "bg-success text-white"
                                            : "bg-secondary text-white"
                                    }`}

                                    style={{

                                        width: "45px",

                                        height: "45px"

                                    }}

                                >

                                    ✓

                                </div>

                                <h5 className="ms-4">

                                    Delivered

                                </h5>

                            </div>

                        </div>

                    </div>

                    {/* Total */}

                    <div className="card bg-light">

    <div className="card-body text-end">

        <h2 className="mb-4">
            Total :
            ₹ {order.totalAmount}
        </h2>

        <div
            className="d-flex justify-content-end gap-3 flex-wrap"
        >

            <a
                href={`${API_URL}/order/invoice/${order._id}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-lg"
            >
                📄 Download Invoice
            </a>

            <NavLink
                to="/manage-orders"
                className="btn btn-dark btn-lg"
            >
                ← Back
            </NavLink>

        </div>

    </div>

</div>

                </div>

            </div>

        </div>

    )

}

export default OrderDetails