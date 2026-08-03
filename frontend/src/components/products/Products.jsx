import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Products.css";
import API_URL from "../../utils/api";
import ProductHero from "./ProductHero";
import ProductToolbar from "./ProductToolbar";
import ProductFilters from "./ProductFilters";
import ProductGrid from "./ProductGrid";

const Products = () => {

    const [products, setProducts] = useState([]);

    const [categories, setCategories] = useState(["All"]);

    const [search, setSearch] = useState("");

    const [selectedCategory, setSelectedCategory] = useState("All");

    const [sort, setSort] = useState("featured");

    const [filters, setFilters] = useState({

        minPrice: "",

        maxPrice: "",

        sizes: [],

        inStockOnly: false

    });

    useEffect(() => {

      axios
    .get(`${API_URL}/jersey`)
    .then((resp) => {
        setProducts(resp.data);
    })
    .catch((err) => console.log(err));

axios
    .get(`${API_URL}/category`)
    .then((resp) => {
        setCategories([
            "All",
            ...resp.data.map((category) => category.name),
        ]);
    })
    .catch((err) => console.log(err));

    }, []);

    let filteredProducts = products.filter((product) => {

        const nameMatch = product.jerseyName

            ?.toLowerCase()

            .includes(search.toLowerCase());

        const categoryMatch =

            selectedCategory === "All"

                ? true

                : product.category === selectedCategory;

        const minPriceMatch =

            filters.minPrice === "" ? true : product.price >= filters.minPrice;

        const maxPriceMatch =

            filters.maxPrice === "" ? true : product.price <= filters.maxPrice;

        const sizeMatch =

            filters.sizes.length === 0

                ? true

                : filters.sizes.some((size) => product.sizes?.includes(size));

        const stockMatch = filters.inStockOnly ? product.stock > 0 : true;

        return (

            nameMatch &&

            categoryMatch &&

            minPriceMatch &&

            maxPriceMatch &&

            sizeMatch &&

            stockMatch

        );

    });

    if (sort === "low") {

        filteredProducts.sort((a, b) => a.price - b.price);

    }

    else if (sort === "high") {

        filteredProducts.sort((a, b) => b.price - a.price);

    }

    return (

        <section className="products-page">

            <ProductHero

                title="Explore Every Product"

                subtitle="Browse jerseys, boots, footballs, accessories and everything available at JerseyHub."

                totalProducts={filteredProducts.length}

            />

            <ProductToolbar

                search={search}

                setSearch={setSearch}

                selectedCategory={selectedCategory}

                setSelectedCategory={setSelectedCategory}

                sort={sort}

                setSort={setSort}

                total={filteredProducts.length}

                categories={categories}

            />

            <ProductFilters

                filters={filters}

                setFilters={setFilters}

            />

            <ProductGrid

                products={filteredProducts}

            />

        </section>

    );

};

export default Products;