import React from "react";
import "./ProductToolbar.css";

const ProductToolbar = ({

    search,
    setSearch,

    selectedCategory,
    setSelectedCategory,

    sort,
    setSort,

    total,

    categories = []

}) => {

    return (

        <section className="product-toolbar">

            {/* Search */}

            <div className="toolbar-search">

                <input

                    type="text"

                    placeholder="Search products..."

                    value={search}

                    onChange={(e) => setSearch(e.target.value)}

                />

            </div>

            {/* Categories (Only if available) */}

            {

                categories.length > 0 && (

                    <div className="toolbar-categories">

                        {

                            categories.map((category, index) => (

    <button

        key={`${category}-${index}`}

                                    className={

                                        selectedCategory === category

                                            ? "toolbar-chip active"

                                            : "toolbar-chip"

                                    }

                                    onClick={() =>

                                        setSelectedCategory(category)

                                    }

                                >

                                    {category}

                                </button>

                            ))

                        }

                    </div>

                )

            }

            {/* Right Side */}

            <div className="toolbar-right">

                <select

                    value={sort}

                    onChange={(e) =>

                        setSort(e.target.value)

                    }

                >

                    <option value="featured">

                        Featured

                    </option>

                    <option value="low">

                        Price : Low → High

                    </option>

                    <option value="high">

                        Price : High → Low

                    </option>

                </select>

                <span>

                    {total} Products

                </span>

            </div>

        </section>

    );

};

export default ProductToolbar;