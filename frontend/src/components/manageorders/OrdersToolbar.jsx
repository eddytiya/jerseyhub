import React from "react";

import "./OrdersToolbar.css";

const OrdersToolbar = ({

    search,

    setSearch,

    statusFilter,

    setStatusFilter,

    sortBy,

    setSortBy,

    totalResults

}) => {

    return (

        <section className="admin-orders-toolbar">

            {/* Search */}

            <div className="admin-orders-search-wrapper">

                <input

                    type="text"

                    placeholder="Search customer..."

                    className="admin-orders-search"

                    value={search}

                    onChange={(e)=>

                        setSearch(

                            e.target.value

                        )

                    }

                />

            </div>

            {/* Right Side */}

            <div className="admin-orders-toolbar-right">

                <select

                    className="admin-orders-select"

                    value={statusFilter}

                    onChange={(e)=>

                        setStatusFilter(

                            e.target.value

                        )

                    }

                >

                    <option>

                        All

                    </option>

                    <option>

                        Pending

                    </option>

                    <option>

                        Processing

                    </option>

                    <option>

                        Delivered

                    </option>

                    <option>

                        Cancelled

                    </option>

                </select>

                <select

                    className="admin-orders-select"

                    value={sortBy}

                    onChange={(e)=>

                        setSortBy(

                            e.target.value

                        )

                    }

                >

                    <option>

                        Newest

                    </option>

                    <option>

                        Oldest

                    </option>

                    <option>

                        Highest

                    </option>

                    <option>

                        Lowest

                    </option>

                </select>

            </div>

            <div className="admin-orders-results">

                <span>

                    {totalResults}

                </span>

                Results

            </div>

        </section>

    );

};

export default OrdersToolbar;