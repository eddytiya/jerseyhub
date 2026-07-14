import React from "react";

import "./ManageOrders.css";

import OrdersHeader from "./manageorders/OrdersHeader";
import OrdersStats from "./manageorders/OrdersStats";
import OrdersToolbar from "./manageorders/OrdersToolbar";
import OrdersTable from "./manageorders/OrdersTable";
import OrdersSkeleton from "./manageorders/OrdersSkeleton";
import OrderDetailsModal from "./manageorders/OrderDetailsModal";

import useManageOrders from "../hooks/useManageOrders";
import { motion } from "framer-motion";
import {

    getTotalOrders,

    getPendingOrders,

    getDeliveredOrders,

    getRevenue

} from "../utils/orderHelpers";

/* ==========================================
            ANIMATIONS
========================================== */

const containerVariants = {

    hidden: {},

    visible: {

        transition: {

            staggerChildren: 0.12

        }

    }

};

const itemVariants = {

    hidden: {

        opacity: 0,

        y: 30

    },

    visible: {

        opacity: 1,

        y: 0,

        transition: {

            duration: .45,

            ease: "easeOut"

        }

    }

};

const ManageOrders = () => {

    const {

        loading,

        orders,

        filteredOrders,

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

    } = useManageOrders();

    if(loading){

        return <OrdersSkeleton />;

    }

    return(

    <motion.div

        className="admin-orders-page container"

        variants={containerVariants}

        initial="hidden"

        animate="visible"

    >

        {/* =====================================
                    HEADER
        ===================================== */}

        <motion.div variants={itemVariants}>

            <OrdersHeader />

        </motion.div>

        {/* =====================================
                    STATS
        ===================================== */}

        <motion.div variants={itemVariants}>

            <OrdersStats

                totalOrders={

                    getTotalOrders(

                        orders

                    )

                }

                pendingOrders={

                    getPendingOrders(

                        orders

                    )

                }

                deliveredOrders={

                    getDeliveredOrders(

                        orders

                    )

                }

                revenue={

                    getRevenue(

                        orders

                    )

                }

            />

        </motion.div>

        {/* =====================================
                    TOOLBAR
        ===================================== */}

        <motion.div variants={itemVariants}>

            <OrdersToolbar

                search={search}

                setSearch={setSearch}

                statusFilter={statusFilter}

                setStatusFilter={

                    setStatusFilter

                }

                sortBy={sortBy}

                setSortBy={setSortBy}

                totalResults={

                    filteredOrders.length

                }

            />

        </motion.div>

        {/* =====================================
                    TABLE
        ===================================== */}

        <motion.div variants={itemVariants}>

            <OrdersTable

                orders={filteredOrders}

                onStatusChange={

                    updateOrderStatus

                }

                onViewOrder={

                    openOrder

                }

            />

        </motion.div>

        {/* =====================================
                    MODAL
        ===================================== */}

        <OrderDetailsModal

            isOpen={modalOpen}

            order={selectedOrder}

            onClose={closeOrder}

        />

    </motion.div>

);

};

export default ManageOrders;