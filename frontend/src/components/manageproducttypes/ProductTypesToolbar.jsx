import React from "react";

import {

    FaSearch,

    FaSortAlphaDown,

    FaFilter

} from "react-icons/fa";

import "./ProductTypesToolbar.css";

const ProductTypesToolbar = ({

    search,

    setSearch,

    sortBy,

    setSortBy,

    filter,

    setFilter,

    totalResults

}) => {

    return (

        <div className="product-types-toolbar">

            {/* SEARCH */}

            <div className="toolbar-search">

                <FaSearch />

                <input

                    type="text"

                    placeholder="Search Product Types..."

                    value={search}

                    onChange={(e)=>

                        setSearch(e.target.value)

                    }

                />

            </div>

            {/* SORT */}

            <div className="toolbar-select">

                <FaSortAlphaDown />

                <select

                    value={sortBy}

                    onChange={(e)=>

                        setSortBy(e.target.value)

                    }

                >

                    <option value="az">

                        A - Z

                    </option>

                    <option value="za">

                        Z - A

                    </option>

                    <option value="newest">

                        Newest

                    </option>

                    <option value="oldest">

                        Oldest

                    </option>

                </select>

            </div>

            {/* FILTER */}

            <div className="toolbar-select">

                <FaFilter />

                <select

                    value={filter}

                    onChange={(e)=>

                        setFilter(e.target.value)

                    }

                >

                    <option value="all">

                        All Types

                    </option>

                    <option value="active">

                        Active

                    </option>

                    <option value="inactive">

                        Inactive

                    </option>

                </select>

            </div>

            {/* RESULTS */}

            <div className="toolbar-results">

                {totalResults}

                {" "}

                Types Found

            </div>

        </div>

    );

};

export default ProductTypesToolbar;