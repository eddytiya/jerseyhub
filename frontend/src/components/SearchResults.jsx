import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

import ProductCard from "./products/ProductCard";

import "./SearchResults.css";

const SearchResults = () => {

    const [jerseys, setJerseys] = useState([]);

    const [loading, setLoading] = useState(true);

    const [searchParams] = useSearchParams();

    const keyword = searchParams.get("name") || "";

    useEffect(() => {

        setLoading(true);

        axios

            .get(

                `http://localhost:2987/jersey/search?name=${keyword}`

            )

            .then((resp) => {

                setJerseys(resp.data);

                setLoading(false);

            })

            .catch((err) => {

                console.log(err);

                setLoading(false);

            });

    }, [keyword]);

    if (loading) {

        return (

            <div className="search-loading">

                Loading...

            </div>

        );

    }

    return (

        <section className="search-page">

            <div className="container">

                <div className="search-header">

                    <h2>

                        Search Results

                    </h2>

                    <p>

                        Showing results for

                        <span>

                            "{keyword}"

                        </span>

                    </p>

                    <div className="search-count">

                        {jerseys.length} Product

                        {jerseys.length !== 1 ? "s" : ""}

                        Found

                    </div>

                </div>

                {

                    jerseys.length === 0 ?

                    (

                        <div className="search-empty">

                            <h3>

                                😕 No products found

                            </h3>

                            <p>

                                Try searching by

                                team,

                                category,

                                jersey type,

                                season,

                                or description.

                            </p>

                        </div>

                    )

                    :

                    (

                        <div className="product-grid">

                            {

                                jerseys.map((jersey) => (

                                    <ProductCard

                                        key={jersey._id}

                                        product={jersey}

                                    />

                                ))

                            }

                        </div>

                    )

                }

            </div>

        </section>

    );

};

export default SearchResults;