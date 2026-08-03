import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../utils/api";

import "./Shop.css";

import ShopHero from "./ShopHero";
import ShopToolbar from "./ShopToolbar";
import ShopGrid from "./ShopGrid";
import ProductFilters from "../products/ProductFilters";

const Shop = () => {

    const [jerseys, setJerseys] = useState([]);

    const [search, setSearch] = useState("");

    const [filters, setFilters] = useState({

        minPrice: "",

        maxPrice: "",

        sizes: [],

        inStockOnly: false

    });

    useEffect(() => {

        axios

           .get(`${API_URL}/jersey`)

            .then((resp)=>setJerseys(resp.data))

            .catch(console.log);

    }, []);

   const filtered = jerseys.filter((jersey) => {

    const nameMatch =

        jersey.jerseyName
            .toLowerCase()
            .includes(search.toLowerCase())

        ||

        jersey.teamName
            .toLowerCase()
            .includes(search.toLowerCase());

    const minPriceMatch =

        filters.minPrice === "" ? true : jersey.price >= filters.minPrice;

    const maxPriceMatch =

        filters.maxPrice === "" ? true : jersey.price <= filters.maxPrice;

    const sizeMatch =

        filters.sizes.length === 0

            ? true

            : filters.sizes.some((size) => jersey.sizes?.includes(size));

    const stockMatch = filters.inStockOnly ? jersey.stock > 0 : true;

    return nameMatch && minPriceMatch && maxPriceMatch && sizeMatch && stockMatch;

});

    return (

        <section className="shop-page">

            <div className="shop-container">

                <ShopHero

                    total={jerseys.length}

                />

                <ShopToolbar

                    search={search}

                    setSearch={setSearch}

                    total={filtered.length}

                />

                <ProductFilters

                    filters={filters}

                    setFilters={setFilters}

                />

                <ShopGrid

                    jerseys={filtered}

                />

            </div>

        </section>

    );

};

export default Shop;