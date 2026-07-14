import React from 'react';

import './SearchResults.css';

import RecentOrders from './RecentOrders';
import Customers from './Customers';
import LowStock from './LowStock';
import TopSelling from './TopSelling';

const SearchResults = ({

    search,

    filteredOrders,

    filteredCustomers,

    filteredLowStock,

    filteredTopSelling

}) => {

    return (

        <>

            <div className="search-results-card fade-up">

                <div className="search-results-header">

                    <h3>

                        🔍 Search Results

                    </h3>

                </div>

                <div className="search-results-body">

                    <div className="search-results-title">

                        Showing results for

                    </div>

                    <div className="search-keyword">

                        "{search}"

                    </div>

                </div>

            </div>

            <RecentOrders

                filteredOrders={filteredOrders}

            />

            <Customers

                filteredCustomers={filteredCustomers}

            />

            <LowStock

                filteredLowStock={filteredLowStock}

            />

            <TopSelling

                filteredTopSelling={filteredTopSelling}

            />

        </>

    );

};

export default SearchResults;