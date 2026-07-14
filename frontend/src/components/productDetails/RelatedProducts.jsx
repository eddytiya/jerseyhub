import React from "react";
import ProductGrid from "../products/ProductGrid";

const RelatedProducts = ({ jerseys }) => {

    if (!jerseys.length) {

        return null;

    }

    return (

        <section className="related-products">

            <h2>

                You May Also Like

            </h2>

            <ProductGrid

                products={jerseys.slice(0,4)}

            />

        </section>

    );

};

export default RelatedProducts;