import React from "react";
import SkeletonCard from "./SkeletonCard";
import "./CategoriesSkeleton.css";

const CategoriesSkeleton = () => {

    return (

        <div className="categories-admin-skeleton-page">

            {/* Header */}

            <div className="categories-admin-skeleton-header">

                <div>

                    <div className="categories-admin-skeleton-badge skeleton-loading"></div>

                    <div className="categories-admin-skeleton-heading skeleton-loading"></div>

                    <div className="categories-admin-skeleton-subtitle skeleton-loading"></div>

                </div>

                <div className="categories-admin-skeleton-button skeleton-loading"></div>

            </div>

            {/* Stats */}

            <div className="categories-admin-skeleton-stats">

                {[1,2,3,4].map(item=>(

                    <div
                        key={item}
                        className="categories-admin-skeleton-stat skeleton-loading"
                    />

                ))}

            </div>

            {/* Toolbar */}

            <div className="categories-admin-skeleton-toolbar">

                <div className="categories-admin-skeleton-search skeleton-loading"></div>

                <div className="categories-admin-skeleton-select skeleton-loading"></div>

                <div className="categories-admin-skeleton-select skeleton-loading"></div>

            </div>

            {/* Cards */}

            <div className="categories-admin-skeleton-list">

                {

                    Array.from({length:6}).map((_,index)=>(

                        <SkeletonCard
                            key={index}
                        />

                    ))

                }

            </div>

        </div>

    );

};

export default CategoriesSkeleton;