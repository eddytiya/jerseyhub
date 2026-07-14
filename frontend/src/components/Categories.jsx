import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import API_URL from "../utils/api";
import "./Categories.css";
import CategoryListCard from "./CategoryListCard";

import { FiSearch } from "../utils/navbarIcons";

const Categories = () => {

    const [categories, setCategories] = useState([]);

    const [products, setProducts] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        axios
    .get(`${API_URL}/category`)
            .then((resp) => setCategories(resp.data))
            .catch((err) => console.log(err));

        axios
    .get(`${API_URL}/jersey`)
            .then((resp) => setProducts(resp.data))
            .catch((err) => console.log(err));

    }, []);

    const filteredCategories = useMemo(() => {

        return categories.filter(category =>

            category.name
                .toLowerCase()
                .includes(search.toLowerCase())

        );

    }, [categories, search]);

    return (

<section className="categories-page">

    {/* HERO */}

    <section className="categories-hero">

        <div className="hero-left">

            <span className="hero-badge">

                JERSEYHUB COLLECTIONS

            </span>

            <h1>

                All Categories

            </h1>

            <p>

                Browse every football collection available at JerseyHub.
                Discover club jerseys, international kits, retro classics,
                boots, merchandise and special editions.

            </p>

            <div className="hero-stats">

                <div>

                    <h2>{categories.length}</h2>

                    <span>Categories</span>

                </div>

                <div>

                    <h2>{products.length}</h2>

                    <span>Products</span>

                </div>

                <div>

                    <h2>24/7</h2>

                    <span>Updated</span>

                </div>

            </div>

        </div>

        <div className="hero-right">

            <div className="hero-glass">

                <h3>

                    Explore every football collection.

                </h3>

                <p>

                    Official club jerseys,
                    national teams,
                    retro collections,
                    boots,
                    merchandise
                    and much more.

                </p>

            </div>

        </div>

    </section>

    {/* SEARCH */}

    <div className="category-search">

        <input

            type="text"

            placeholder="Search Categories..."

            value={search}

            onChange={(e)=>setSearch(e.target.value)}

        />

    </div>

    {/* CATEGORY LIST */}

    <div className="categories-container">

        {

            filteredCategories.length>0 ?

            (

                filteredCategories.map(category=>(

                    <CategoryListCard

                        key={category._id}

                        category={category}

                        productCount={

                            products.filter(

                                product=>product.category===category.name

                            ).length

                        }

                    />

                ))

            )

            :

            (

                <div className="empty-category">

                    <h2>No Categories Found ⚽</h2>

                    <p>

                        Try another keyword.

                    </p>

                </div>

            )

        }

    </div>

</section>

)

};

export default Categories;