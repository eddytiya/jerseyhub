import React from "react";
import { FiSearch } from "../../utils/navbarIcons";
import "./CategoriesToolbar.css";

const CategoriesToolbar = ({
    search,
    setSearch,
    sortBy,
    setSortBy,
    filter,
    setFilter,
    categories,
    totalResults
}) => {

    return (

        <section className="categories-admin-toolbar">

            <div className="categories-admin-search-wrapper">

                <FiSearch className="categories-admin-search-icon" />

                <input

                    type="text"

                    placeholder="Search categories..."

                    value={search}

                    onChange={(e) => setSearch(e.target.value)}

                    className="categories-admin-search"

                />

            </div>

            <div className="categories-admin-toolbar-right">

                <select

                    className="categories-admin-select"

                    value={sortBy}

                    onChange={(e)=>setSortBy(e.target.value)}

                >

                    <option value="A-Z">A - Z</option>

                    <option value="Z-A">Z - A</option>

                </select>

                <select

                    className="categories-admin-select"

                    value={filter}

                    onChange={(e)=>setFilter(e.target.value)}

                >

                    <option value="All">

                        All Categories

                    </option>

                    {

                        categories.map(category=>(

                            <option

                                key={category._id}

                                value={category.name}

                            >

                                {category.name}

                            </option>

                        ))

                    }

                </select>

            </div>

            <div className="categories-admin-results">

                <span>

                    {totalResults}

                </span>

                Results

            </div>

        </section>

    );

};

export default CategoriesToolbar;