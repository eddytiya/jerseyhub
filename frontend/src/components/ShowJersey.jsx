import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import {
    showSuccess,
    showError
} from "../utils/toastUtils";

import Breadcrumb from "./productDetails/Breadcrumb";
import ProductGallery from "./productDetails/ProductGallery";
import ProductInfo from "./productDetails/ProductInfo";
import ProductActions from "./productDetails/ProductActions";
import ProductTabs from "./productDetails/ProductTabs";
import RelatedProducts from "./productDetails/RelatedProducts";

import "./productDetails/ShowJersey.css";

const ShowJersey = () => {

    const [jersey, setJersey] = useState({});

    const [relatedProducts, setRelatedProducts] = useState([]);

    const { id } = useParams();

    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");

    useEffect(() => {

        axios

            .get(`http://localhost:2987/jersey/show/${id}`)

            .then((resp) => {

                setJersey(resp.data);

            })

            .catch((err) => console.log(err));

    }, [id]);

    useEffect(() => {

        if (!jersey.category) return;

        axios

            .get(`http://localhost:2987/jersey/category/${jersey.category}`)

            .then((resp) => {

                const filtered = resp.data.filter(

                    item => item._id !== jersey._id

                );

                setRelatedProducts(filtered);

            })

            .catch((err) => console.log(err));

    }, [jersey]);

    
    

    const handleAddToCart = () => {

        if (!userId) {

            showWarning("Please login first");

            navigate("/login");

            return;

        }

        axios

            .post(

                "http://localhost:2987/cart/add",

                {

                    userId,

                    jerseyId: jersey._id,

                    quantity: 1

                }

            )

            .then(() => {

                showSuccess(

                    "Added To Cart Successfully"

                );

            })

            .catch((err) => {

                console.log(err);

                showError(

                    err.response?.data?.message ||

                    "Failed To Add To Cart"

                );

            });

    };

    if (!jersey._id) {

        return <h2>Loading...</h2>;

    }

    return (

        <section className="show-jersey-page">

    <div className="show-jersey-container">

        <Breadcrumb
            category={jersey.category}
            jerseyName={jersey.jerseyName}
        />

        <div className="product-layout">

            <ProductGallery jersey={jersey} />

            <div className="product-right">

                <ProductInfo jersey={jersey} />

                <ProductActions
    jersey={jersey}
    onAddToCart={handleAddToCart}
/>

            </div>

        </div>

        <ProductTabs jersey={jersey} />

        <RelatedProducts jerseys={relatedProducts} />

    </div>

</section>

    );

};

export default ShowJersey;