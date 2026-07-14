import React from "react";
import { motion } from "framer-motion";

import "./OrdersStats.css";

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

const cardVariants = {

    hidden: {

        opacity: 0,

        y: 30,

        scale: 0.94

    },

    visible: {

        opacity: 1,

        y: 0,

        scale: 1,

        transition: {

            duration: 0.5,

            type: "spring",

            stiffness: 140,

            damping: 12

        }

    }

};

const OrdersStats = ({

    totalOrders,

    pendingOrders,

    deliveredOrders,

    revenue

}) => {

    const stats = [

        {

            title: "Total Orders",

            value: totalOrders,

            className: "admin-orders-stat-blue"

        },

        {

            title: "Pending Orders",

            value: pendingOrders,

            className: "admin-orders-stat-orange"

        },

        {

            title: "Delivered",

            value: deliveredOrders,

            className: "admin-orders-stat-green"

        },

        {

            title: "Revenue",

            value: `₹ ${Number(revenue).toLocaleString()}`,

            className: "admin-orders-stat-purple"

        }

    ];

    return (

        <motion.section

            className="admin-orders-stats"

            variants={containerVariants}

            initial="hidden"

            whileInView="visible"

            viewport={{

                once: true

            }}

        >

            {

                stats.map((stat, index) => (

                    <motion.div

                        key={index}

                        variants={cardVariants}

                        whileHover={{

                            y: -10,

                            scale: 1.03

                        }}

                        whileTap={{

                            scale: 0.98

                        }}

                        className={`admin-orders-stat-card ${stat.className}`}

                    >

                        <div className="admin-orders-stat-top">

                            <h4>

                                {stat.title}

                            </h4>

                        </div>

                        <h2>

                            {stat.value}

                        </h2>

                    </motion.div>

                ))

            }

        </motion.section>

    );

};

export default OrdersStats;