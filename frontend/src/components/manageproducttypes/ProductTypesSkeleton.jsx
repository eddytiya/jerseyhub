import React from "react";

import "./ProductTypesSkeleton.css";

const SkeletonCard = () => {

    return (

        <div className="product-type-skeleton-card">

            <div className="skeleton skeleton-icon"></div>

            <div className="skeleton skeleton-title"></div>

            <div className="skeleton skeleton-line"></div>

            <div className="skeleton skeleton-line short"></div>

            <div className="skeleton skeleton-status"></div>

            <div className="skeleton-btn-group">

                <div className="skeleton skeleton-btn"></div>

                <div className="skeleton skeleton-btn"></div>

            </div>

        </div>

    );

};

const ProductTypesSkeleton = () => {

    return (

        <div className="product-types-skeleton-grid">

            {

                Array.from({ length: 8 }).map((_, index) => (

                    <SkeletonCard

                        key={index}

                    />

                ))

            }

        </div>

    );

};

export default ProductTypesSkeleton;