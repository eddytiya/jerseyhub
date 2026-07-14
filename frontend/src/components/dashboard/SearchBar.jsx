import React from 'react';
import './SearchBar.css';

const SearchBar = ({ search, setSearch, filter, setFilter }) => {

    return (

        <div className="search-card fade-up">

            <div className="search-body">

                <div className="row align-items-center g-3">

                   <div className="col-lg-8">

                    <div className="search-wrapper">

                        <span className="search-icon">
                            🔍
                        </span>

                        <input
                            type="text"
                            className="form-control search-input"
                            placeholder="Search Jerseys, Orders, Customers..."
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                        />

                    </div>

                </div>

                    <div className="col-lg-4">

                        <select

                            className="form-select search-select"

                            value={filter}

                            onChange={(e) => setFilter(e.target.value)}

                        >

                            <option>All</option>

                            <option>Club</option>

                            <option>International</option>

                            <option>Retro</option>

                            <option>Special Edition</option>

                            <option>Featured</option>

                            <option>Low Stock</option>

                        </select>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default SearchBar;