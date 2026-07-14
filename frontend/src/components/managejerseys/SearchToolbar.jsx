import React from "react";
import "./SearchToolbar.css";

const SearchToolbar = ({
    search,
    setSearch,

    categoryFilter,
    setCategoryFilter,

    sortBy,
    setSortBy,

    total
}) => {

    return (

        <section className="adminjersey-search">

            <div className="adminjersey-search-card">

                {/* ======================================
                            HEADER
                ======================================= */}

                <div className="adminjersey-search-header">

                    <div>

                        <span className="adminjersey-search-badge">

                            🔍 Search & Filters

                        </span>

                        <h2 className="adminjersey-search-title">

                            Find Jerseys Instantly

                        </h2>

                        <p className="adminjersey-search-subtitle">

                            Search, filter and sort your football jersey inventory.

                        </p>

                    </div>

                    <div className="adminjersey-search-total">

                        <span>{total}</span>

                        <small>Jerseys Found</small>

                    </div>

                </div>

                {/* ======================================
                            BODY
                ======================================= */}

                <div className="row g-4 align-items-end">

                    {/* SEARCH */}

                    <div className="col-lg-6">

                        <label className="adminjersey-search-label">

                            Search Jerseys

                        </label>

                        <div className="adminjersey-search-box">

                            <span className="adminjersey-search-icon">

                                🔍

                            </span>

                            <input
                                type="text"
                                className="adminjersey-search-input"
                                placeholder="Search by team, jersey or category..."
                                value={search}
                                onChange={(e)=>setSearch(e.target.value)}
                            />

                            {

                                search && (

                                    <button
                                        className="adminjersey-search-clear"
                                        onClick={() => setSearch("")}
                                        type="button"
                                    >

                                        ✕

                                    </button>

                                )

                            }

                        </div>

                    </div>

                    {/* CATEGORY */}

                    <div className="col-lg-3">

                        <label className="adminjersey-search-label">

                            Category

                        </label>

                        <select
                            className="adminjersey-search-select"
                            value={categoryFilter}
                            onChange={(e)=>setCategoryFilter(e.target.value)}
                        >

                            <option value="All">All Categories</option>

                            <option value="Club">Club</option>

                            <option value="International">International</option>

                            <option value="Retro">Retro</option>

                            <option value="Special Edition">Special Edition</option>

                        </select>

                    </div>

                    {/* SORT */}

                    <div className="col-lg-3">

                        <label className="adminjersey-search-label">

                            Sort By

                        </label>

                        <select
                            className="adminjersey-search-select"
                            value={sortBy}
                            onChange={(e)=>setSortBy(e.target.value)}
                        >

                            <option value="latest">Latest</option>

                            <option value="priceHigh">Price ↑</option>

                            <option value="priceLow">Price ↓</option>

                            <option value="stock">Stock</option>

                        </select>

                    </div>

                </div>

            </div>

        </section>

    );

};

export default SearchToolbar;