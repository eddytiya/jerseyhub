import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../utils/api";
import { useParams } from "react-router-dom";

import ProductListing from "./products/ProductListing";

const CategoryPage = () => {

    const { category } = useParams();

    const [products, setProducts] = useState([]);

    const [search, setSearch] = useState("");

    const [sort, setSort] = useState("featured");

    useEffect(() => {

        axios

            .get(`${API_URL}/jersey/category/${category}`)

            .then((resp)=>{

                setProducts(resp.data);

            })

            .catch((err)=>console.log(err));

    },[category]);

    let filteredProducts = products.filter(product=>{

        return product.jerseyName

            ?.toLowerCase()

            .includes(search.toLowerCase());

    });

    if(sort==="low"){

        filteredProducts.sort((a,b)=>a.price-b.price);

    }

    else if(sort==="high"){

        filteredProducts.sort((a,b)=>b.price-a.price);

    }

    return(

        <ProductListing

            title={category}

            subtitle={`Browse every ${category} available at JerseyHub.`}

            badge={`${category.toUpperCase()} COLLECTION`}

            glassTitle={`${category} Collection ⚽`}

            glassText={`Discover premium ${category.toLowerCase()} available exclusively at JerseyHub.`}

            products={filteredProducts}

            search={search}

            setSearch={setSearch}

            selectedCategory="All"

            setSelectedCategory={()=>{}}

            sort={sort}

            setSort={setSort}

            total={filteredProducts.length}

            categories={[]}

        />

    );

};

export default CategoryPage;