import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../utils/api";

import OrderHero from "./OrderHero";
import OrderToolbar from "./OrderToolbar";
import OrderGrid from "./OrderGrid";
import OrderDetailsDrawer from "./OrderDetailsDrawer";

import "./Orders.css";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");
    const [selectedOrder, setSelectedOrder] = useState(null);

    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (!userId) return;

        axios
            axios.get(`${API_URL}/order/${userId}`)
            .then((resp) => {
                setOrders(resp.data);
            })
            .catch(console.log);
    }, [userId]);

    const filteredOrders = orders.filter((order) => {
        const teamName = order.items?.[0]?.jerseyId?.teamName || "";

        const matchesSearch = teamName
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesStatus =
            status === "All" || order.status === status;

        return matchesSearch && matchesStatus;
    });

    return (
        <>
            <section
                className={`orders-page ${
                    selectedOrder ? "drawer-open" : ""
                }`}
            >
                <OrderHero total={filteredOrders.length} />

                <OrderToolbar
                    search={search}
                    setSearch={setSearch}
                    status={status}
                    setStatus={setStatus}
                />

                <OrderGrid
                    orders={filteredOrders}
                    onViewDetails={setSelectedOrder}
                />
            </section>

            <OrderDetailsDrawer
                order={selectedOrder}
                onClose={() => setSelectedOrder(null)}
            />
        </>
    );
};

export default Orders;