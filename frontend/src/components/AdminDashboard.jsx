import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

/* ==========================================================
                        HOOKS
========================================================== */

import useDashboardData from "../hooks/useDashboardData";
import useDashboardFilters from "../hooks/useDashboardFilters";

/* ==========================================================
                        CHART.JS
========================================================== */

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Filler,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

/* ==========================================================
                    DASHBOARD COMPONENTS
========================================================== */

import DashboardSkeleton from "./dashboard/DashboardSkeleton";
import DashboardCards from "../components/dashboard/DashboardCards";
import SearchBar from "../components/dashboard/SearchBar";
import InventoryCards from "../components/dashboard/InventoryCards";
import PriceAnalytics from "../components/dashboard/PriceAnalytics";
import RecentOrders from "../components/dashboard/RecentOrders";
import LowStock from "../components/dashboard/LowStock";
import TopSelling from "../components/dashboard/TopSelling";
import Analytics from "../components/dashboard/Analytics";
import Customers from "../components/dashboard/Customers";
import SearchResults from "../components/dashboard/SearchResults";
import DashboardActions from "../components/dashboard/DashboardActions";
import DashboardHeader from "./dashboard/DashboardHeader";
import ScrollReveal from "./dashboard/ScrollReveal";
import "./dashboard/Dashboard.css";
/* ==========================================================
                        DASHBOARD UTILS
========================================================== */

import {
    getInventoryStats,
    getRevenueGrowth,
    getRevenueChart,
    getOrderStatusChart,
} from "../utils/dashboardUtils";

/* ==========================================================
                    CHART REGISTRATION
========================================================== */

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Filler,
    Title,
    Tooltip,
    Legend
);

/* ==========================================================
                    ANIMATION VARIANTS
========================================================== */


/* ==========================================================
                    REUSABLE COMPONENTS
========================================================== */
const DashboardSection = ({

    children,

    delay = 0,

}) => (

    <ScrollReveal delay={delay}>

        {children}

    </ScrollReveal>

);

const DashboardHeading = () => (
    <DashboardSection>
        <h2 className="text-center mb-4">
            Admin Dashboard
        </h2>
    </DashboardSection>
);

/* ==========================================================
                    MAIN COMPONENT
========================================================== */



const AdminDashboard=()=>{
       /* ==========================================================
                            STATE
    ========================================================== */

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    /* ==========================================================
                        DASHBOARD DATA
    ========================================================== */

    const {
        loading,
        jerseys,
        lowStock,
        recentOrders,
        topSelling,
        dashboard,
        monthlyRevenue,
        orderStatus,
        bestCustomers,
    } = useDashboardData();

    /* ==========================================================
                        FILTERED DATA
    ========================================================== */

    const {
        isSearching,
        filteredJerseys,
        filteredLowStock,
        filteredOrders,
        filteredCustomers,
        filteredTopSelling,
    } = useDashboardFilters({

        jerseys,
        lowStock,
        recentOrders,
        topSelling,
        bestCustomers,
        search,
        filter,

    });
/* ==========================================================
                    INVENTORY STATS
========================================================== */

const {

    totalJerseys,

    featuredJerseys,

    totalStock,

    inventoryValue,

    mostExpensive,

    cheapest,

    categoryStats,

} = useMemo(

    () => getInventoryStats(filteredJerseys),

    [filteredJerseys]

);

    /* ==========================================================
                        ANALYTICS
    ========================================================== */

    const revenueGrowth = useMemo(

    () => getRevenueGrowth(monthlyRevenue),

    [monthlyRevenue]

);

    const revenueChart = useMemo(

    () => getRevenueChart(monthlyRevenue),

    [monthlyRevenue]

);

    const orderStatusChart = useMemo(

    () => getOrderStatusChart(orderStatus),

    [orderStatus]

);

    /* ==========================================================
                        LOADING
    ========================================================== */


    
    
    /* ==========================================================
                            LOADING
    ========================================================== */

    if (loading) {

        return <DashboardSkeleton />;

    }

    /* ==========================================================
                        SEARCH CONTENT
    ========================================================== */

    const SearchContent = () => (

        <DashboardSection>

            <SearchResults

                search={search}

                filteredOrders={filteredOrders}

                filteredCustomers={filteredCustomers}

                filteredLowStock={filteredLowStock}

                filteredTopSelling={filteredTopSelling}

            />

        </DashboardSection>

    );

    /* ==========================================================
                        DASHBOARD CONTENT
    ========================================================== */

    const DashboardContent = () => (

        <>

            <DashboardSection delay={0.10}>

                <DashboardCards

                    dashboard={dashboard}

                    revenueGrowth={revenueGrowth}

                />

            </DashboardSection>

            <DashboardSection delay={0.15}>

                <InventoryCards

                    totalJerseys={totalJerseys}

                    featuredJerseys={featuredJerseys}

                    categoryStats={categoryStats}

                    totalStock={totalStock}

                    inventoryValue={inventoryValue}

                    mostExpensive={mostExpensive}

                    cheapest={cheapest}

                />

            </DashboardSection>

           <DashboardSection delay={0.20}>
                <PriceAnalytics

                    mostExpensive={mostExpensive}

                    cheapest={cheapest}

                />

            </DashboardSection>

            <DashboardSection delay={0.25}>

                <RecentOrders

                    filteredOrders={filteredOrders}

                />

            </DashboardSection>

            <DashboardSection delay={0.30}>

                <LowStock

                    filteredLowStock={filteredLowStock}

                />

            </DashboardSection>

           <DashboardSection delay={0.35}>

                <TopSelling

                    filteredTopSelling={filteredTopSelling}

                />

            </DashboardSection>

           <DashboardSection delay={0.40}>
                <Analytics

                    revenueChart={revenueChart}

                    orderStatusChart={orderStatusChart}

                />

            </DashboardSection>

            <DashboardSection delay={0.45}>

                <Customers

                    filteredCustomers={filteredCustomers}

                />

            </DashboardSection>

           <DashboardSection delay={0.50}>

                <DashboardActions />

            </DashboardSection>

        </>

    );

    /* ==========================================================
                            RETURN
    ========================================================== */

    return (

     <div className="dashboard-page">

    <div className="container mt-4 dashboard-content">

            <DashboardSection delay={0}>
                <DashboardHeader />
            </DashboardSection>

            <DashboardSection delay={0.05}>
                <SearchBar
                    search={search}
                    setSearch={setSearch}
                    filter={filter}
                    setFilter={setFilter}
                />
            </DashboardSection>

            {

                isSearching

                    ?

                    <SearchContent />

                    :

                    <DashboardContent />

            }

        </div>
</div>
    );

}

export default AdminDashboard