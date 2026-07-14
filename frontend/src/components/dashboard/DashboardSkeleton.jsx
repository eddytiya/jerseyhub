import React from "react";
import "./DashboardSkeleton.css";

/* ==========================================================
                    BASE SKELETON
========================================================== */

const Skeleton = ({ className = "" }) => (

    <div className={`skeleton ${className}`}></div>

);

/* ==========================================================
                    CARD WRAPPER
========================================================== */

const SkeletonCard = ({ children }) => (

    <div className="skeleton-card">

        <div className="card-body p-4">

            {children}

        </div>

    </div>

);

/* ==========================================================
                    SECTION TITLE
========================================================== */

const SectionTitle = () => (

    <Skeleton className="skeleton-text-lg mb-4" />

);
/* ==========================================================
                    STATS CARD
========================================================== */

const StatsCard = () => (

    <SkeletonCard>

        <div className="d-flex justify-content-between align-items-center">

            <div className="skeleton-content">

                <Skeleton className="skeleton-text-sm mb-3" />

                <Skeleton className="skeleton-text-lg" />

            </div>

            <Skeleton className="skeleton-circle" />

        </div>

    </SkeletonCard>

);

/* ==========================================================
                    STATS GRID
========================================================== */

const StatsGrid = ({

    count,

    colClass

}) => (

    <div className="row mb-5">

        {

            Array.from({ length: count }).map((_, index) => (

                <div

                    key={index}

                    className={colClass}

                >

                    <StatsCard />

                </div>

            ))

        }

    </div>

);
/* ==========================================================
                    TABLE SKELETON
========================================================== */

const TableSkeleton = ({

    action = "button",

    showBadge = false

}) => (

    <SkeletonCard>

        <SectionTitle />

        {

            Array.from({ length: 6 }).map((_, index) => (

                <div

                    key={index}

                    className={`d-flex justify-content-between align-items-center pb-3 mb-3 ${
                        index !== 5 ? "skeleton-divider" : ""
                    }`}

                >

                    <div className="d-flex align-items-center">

                        <Skeleton className="skeleton-avatar me-3" />

                        <div>

                            <Skeleton className="skeleton-text-sm mb-2" />

                            <Skeleton className="skeleton-text-xs mb-2" />

                            {

                                showBadge && (

                                    <Skeleton className="skeleton-badge" />

                                )

                            }

                        </div>

                    </div>

                    {

                        action === "button"

                            ?

                            <Skeleton className="skeleton-button" />

                            :

                            <Skeleton className="skeleton-pill" />

                    }

                </div>

            ))

        }

    </SkeletonCard>

);

/* ==========================================================
                    ANALYTICS CARD
========================================================== */

const AnalyticsCard = ({

    colClass = "col-lg-6 mb-4"

}) => (

    <div className={colClass}>

        <SkeletonCard>

            <SectionTitle />

            <Skeleton className="skeleton-line" />

        </SkeletonCard>

    </div>

);

/* ==========================================================
                    CHARTS SKELETON
========================================================== */

const ChartsSkeleton = () => (

    <div className="row mb-5">

        <div className="col-lg-8 mb-4">

            <SkeletonCard>

                <SectionTitle />

                <div className="d-flex align-items-end justify-content-between skeleton-chart-wrapper">

                    {

                        [90,140,110,180,135,215,175].map((height,index)=>(

                            <div

                                key={index}

                                className="skeleton skeleton-dashboard"

                                style={{

                                    height:`${height}px`

                                }}

                            ></div>

                        ))

                    }

                </div>

            </SkeletonCard>

        </div>

        <div className="col-lg-4 mb-4">

            <SkeletonCard>

                <SectionTitle />

                <div className="d-flex justify-content-center">

                    <Skeleton className="skeleton-pie" />

                </div>

            </SkeletonCard>

        </div>

    </div>

);

const SearchSkeleton = () => (

    <SkeletonCard>

        <div className="row g-3">

            <div className="col-lg-8">

                <Skeleton className="skeleton-search" />

            </div>

            <div className="col-lg-4">

                <Skeleton className="skeleton-search" />

            </div>

        </div>

    </SkeletonCard>

);

/* ==========================================================
                    ANALYTICS GRID
========================================================== */

/* ==========================================================
                    ANALYTICS GRID
========================================================== */

const AnalyticsGrid = () => (

    <div className="row mb-5">

        {

            Array.from({ length: 2 }).map((_, index) => (

                <AnalyticsCard

                    key={index}

                />

            ))

        }

    </div>

);
/* ==========================================
            MAIN COMPONENT
========================================== */

const DashboardSkeleton = () => {
    return (
        <div className="dashboard-skeleton container mt-4 fade-up">

            {/* ==========================================
                        PAGE TITLE
            ========================================== */}

            <Skeleton className="skeleton-title mb-4" />

            {/* ==========================================
                        SEARCH BAR
            ========================================== */}

            <SearchSkeleton />

            {/* ==========================================
                    DASHBOARD STAT CARDS
            ========================================== */}

            <StatsGrid

                count={4}

                colClass="col-lg-3 col-md-6 mb-4"

            />

            {/* ==========================================
                    INVENTORY CARDS
            ========================================== */}

            <StatsGrid

                count={6}

                colClass="col-lg-4 col-md-6 mb-4"

            />

            {/* ==========================================
                    PRICE ANALYTICS
            ========================================== */}

            <AnalyticsGrid />

            {/* ==========================================
                    RECENT ORDERS
            ========================================== */}

<TableSkeleton

    action="button"

    showBadge={true}

/>

            {/* ==========================================
                    REVENUE ANALYTICS
            ========================================== */}

           <ChartsSkeleton />

            {/* ==========================================
                    CUSTOMERS
            ========================================== */}

            <TableSkeleton

    action="pill"

/>

        </div>
    );
};

export default DashboardSkeleton;