import React from "react";
import "./ShopToolbar.css";

const ShopToolbar = ({

    search,
    setSearch,
    total

}) => {

    return (

        <section className="shop-toolbar">

            <div className="shop-search">

                <input

                    type="text"

                    placeholder="Search Jerseys..."

                    value={search}

                    onChange={(e)=>setSearch(e.target.value)}

                />

            </div>

            <div className="shop-count">

                {total} Jerseys Found

            </div>

        </section>

    );

};

export default ShopToolbar;