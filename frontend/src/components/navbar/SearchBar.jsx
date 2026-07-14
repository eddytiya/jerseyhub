import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

import "./SearchBar.css";

const SearchBar = ({

    search,

    setSearch,

    handleSearch

}) => {

    const [expanded, setExpanded] = useState(false);

    return (

        <form

            className={`navbar-search ${expanded ? "expanded" : ""}`}

            onSubmit={handleSearch}

            onMouseEnter={() => setExpanded(true)}

            onMouseLeave={() => setExpanded(false)}

        >

            <button

                type="submit"

                className="search-icon-btn"

            >

                <FaSearch />

            </button>

            <input

                type="text"

                placeholder="Search jerseys..."

                value={search}

                onChange={(e) =>

                    setSearch(e.target.value)

                }

            />

        </form>

    );

};

export default SearchBar;