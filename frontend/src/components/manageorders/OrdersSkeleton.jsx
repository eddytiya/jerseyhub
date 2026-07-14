import React from "react";

import "./OrdersSkeleton.css";

const OrdersSkeleton = () => {

    return (

        <div className="admin-orders-skeleton-page">

            {/* Header */}

            <div className="admin-orders-skeleton-header">

                <div className="admin-orders-skeleton-badge"/>

                <div className="admin-orders-skeleton-title"/>

                <div className="admin-orders-skeleton-subtitle"/>

            </div>

            {/* Stats */}

            <div className="admin-orders-skeleton-stats">

                {

                    [...Array(4)].map((_,index)=>(

                        <div

                            key={index}

                            className="admin-orders-skeleton-card"

                        />

                    ))

                }

            </div>

            {/* Toolbar */}

            <div className="admin-orders-skeleton-toolbar"/>

            {/* Table */}

            <div className="admin-orders-skeleton-table">

                {

                    [...Array(6)].map((_,index)=>(

                        <div

                            key={index}

                            className="admin-orders-skeleton-row"

                        />

                    ))

                }

            </div>

        </div>

    );

};

export default OrdersSkeleton;