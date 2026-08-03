import React, { useState } from "react";
import "./ProductFilters.css";

const SIZES = ["S", "M", "L", "XL", "XXL"];

const ProductFilters = ({ filters, setFilters }) => {

    const [open, setOpen] = useState(false);

    const toggleSize = (size) => {

        setFilters((prev) => ({

            ...prev,

            sizes: prev.sizes.includes(size)

                ? prev.sizes.filter((s) => s !== size)

                : [...prev.sizes, size]

        }));

    };

    const handlePriceChange = (key, value) => {

        setFilters((prev) => ({

            ...prev,

            [key]: value === "" ? "" : Number(value)

        }));

    };

    const clearFilters = () => {

        setFilters({

            minPrice: "",

            maxPrice: "",

            sizes: [],

            inStockOnly: false

        });

    };

    const activeCount =

        (filters.minPrice !== "" ? 1 : 0) +

        (filters.maxPrice !== "" ? 1 : 0) +

        filters.sizes.length +

        (filters.inStockOnly ? 1 : 0);

    return (

        <div className="product-filters">

            <button

                type="button"

                className="filters-toggle"

                onClick={() => setOpen(!open)}

            >

                Filters

                {

                    activeCount > 0 && (
                        <span className="filters-count">{activeCount}</span>
                    )

                }

            </button>

            {
                open && (

                    <div className="filters-panel">

                        <div className="filter-group">

                            <h5>Price Range</h5>

                            <div className="price-inputs">

                                <input
                                    type="number"
                                    min="0"
                                    placeholder="Min"
                                    value={filters.minPrice}
                                    onChange={(e) => handlePriceChange("minPrice", e.target.value)}
                                />

                                <span>to</span>

                                <input
                                    type="number"
                                    min="0"
                                    placeholder="Max"
                                    value={filters.maxPrice}
                                    onChange={(e) => handlePriceChange("maxPrice", e.target.value)}
                                />

                            </div>

                        </div>

                        <div className="filter-group">

                            <h5>Size</h5>

                            <div className="size-filter-chips">

                                {
                                    SIZES.map((size) => (
                                        <button
                                            type="button"
                                            key={size}
                                            className={`size-filter-chip ${filters.sizes.includes(size) ? "active" : ""}`}
                                            onClick={() => toggleSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))
                                }

                            </div>

                        </div>

                        <div className="filter-group">

                            <label className="in-stock-toggle">

                                <input
                                    type="checkbox"
                                    checked={filters.inStockOnly}
                                    onChange={(e) =>
                                        setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }))
                                    }
                                />

                                In Stock Only

                            </label>

                        </div>

                        {
                            activeCount > 0 && (
                                <button
                                    type="button"
                                    className="filters-clear"
                                    onClick={clearFilters}
                                >
                                    Clear All
                                </button>
                            )
                        }

                    </div>

                )
            }

        </div>

    );

};

export default ProductFilters;
