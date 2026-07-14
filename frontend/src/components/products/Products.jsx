import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Products.css";

import ProductHero from "./ProductHero";
import ProductToolbar from "./ProductToolbar";
import ProductGrid from "./ProductGrid";

const Products = () => {

    const [products, setProducts] = useState([]);

    const [categories, setCategories] = useState(["All"]);

    const [search, setSearch] = useState("");

    const [selectedCategory, setSelectedCategory] = useState("All");

    const [sort, setSort] = useState("featured");

    useEffect(() => {

        axios

            .get("http://localhost:2987/jersey")

            .then((resp) => {

                setProducts(resp.data);

            })

            .catch((err) => console.log(err));

        axios

            .get("http://localhost:2987/category")

            .then((resp) => {

                setCategories([

                    "All",

                    ...resp.data.map(category => category.categoryName)

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

        return nameMatch && categoryMatch;

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

            <ProductGrid

                products={filteredProducts}

            />

        </section>

    );

};

export default Products;