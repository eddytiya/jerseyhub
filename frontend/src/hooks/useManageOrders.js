import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const useManageOrders = () => {

    const [loading, setLoading] = useState(true);

    const [orders, setOrders] = useState([]);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    const [sortBy, setSortBy] = useState("Newest");

    const [selectedOrder, setSelectedOrder] = useState(null);

    const [modalOpen, setModalOpen] = useState(false);

    /* ==========================================
                    FETCH ORDERS
    ========================================== */

    const fetchOrders = async () => {

        try {

            setLoading(true);

            const res = await axios.get(

                "http://localhost:2987/order/admin/all",

                {

                    withCredentials: true

                }

            );

            setOrders(res.data);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchOrders();

    }, []);

    /* ==========================================
                UPDATE STATUS
    ========================================== */

    const updateOrderStatus = async (

        id,

        status

    ) => {

        try {

            await axios.put(

                `http://localhost:2987/order/status/${id}`,

                {

                    status

                },

                {

                    withCredentials: true

                }

            );

            fetchOrders();

        }

        catch (err) {

            console.log(err);

        }

    };

    /* ==========================================
                    MODAL
    ========================================== */

    const openOrder = (order) => {

        setSelectedOrder(order);

        setModalOpen(true);

    };

    const closeOrder = () => {

        setModalOpen(false);

        setSelectedOrder(null);

    };

    /* ==========================================
                FILTER + SORT
    ========================================== */

    const filteredOrders = useMemo(() => {

        let data = [...orders];

        /* ---------- Search ---------- */

        if (search.trim()) {

            const keyword = search.toLowerCase();

            data = data.filter(order =>

                order.customerName

                    ?.toLowerCase()

                    .includes(keyword)

                ||

                order._id

                    ?.toLowerCase()

                    .includes(keyword)

            );

        }

        /* ---------- Status ---------- */

        if (statusFilter !== "All") {

            data = data.filter(

                order =>

                    order.status === statusFilter

            );

        }

        /* ---------- Sort ---------- */

        switch (sortBy) {

            case "Oldest":

                data.sort(

                    (a, b) =>

                        new Date(a.orderDate) -

                        new Date(b.orderDate)

                );

                break;

            case "Highest":

                data.sort(

                    (a, b) =>

                        b.totalAmount -

                        a.totalAmount

                );

                break;

            case "Lowest":

                data.sort(

                    (a, b) =>

                        a.totalAmount -

                        b.totalAmount

                );

                break;

            default:

                data.sort(

                    (a, b) =>

                        new Date(b.orderDate) -

                        new Date(a.orderDate)

                );

        }

        return data;

    }, [

        orders,

        search,

        statusFilter,

        sortBy

    ]);

    return {

        loading,

        orders,

        filteredOrders,

        fetchOrders,

        search,

        setSearch,

        statusFilter,

        setStatusFilter,

        sortBy,

        setSortBy,

        modalOpen,

        selectedOrder,

        openOrder,

        closeOrder,

        updateOrderStatus

    };

};

export default useManageOrders;