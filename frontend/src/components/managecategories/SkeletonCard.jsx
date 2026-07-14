import React from "react";
import "./SkeletonCard.css";

const SkeletonCard = () => {
    return (
        <div className="categories-admin-skeleton-card">

            <div className="categories-admin-skeleton-image skeleton-shimmer"></div>

            <div className="categories-admin-skeleton-content">

                <div className="categories-admin-skeleton-title skeleton-shimmer"></div>

                <div className="categories-admin-skeleton-badge skeleton-shimmer"></div>

                <div className="categories-admin-skeleton-line skeleton-shimmer"></div>

                <div className="categories-admin-skeleton-line short skeleton-shimmer"></div>

                <div className="categories-admin-skeleton-count skeleton-shimmer"></div>

            </div>

            <div className="categories-admin-skeleton-actions">

                <div className="categories-admin-skeleton-btn skeleton-shimmer"></div>

                <div className="categories-admin-skeleton-icon skeleton-shimmer"></div>

                <div className="categories-admin-skeleton-icon skeleton-shimmer"></div>

            </div>

        </div>
    );
};

export default SkeletonCard;