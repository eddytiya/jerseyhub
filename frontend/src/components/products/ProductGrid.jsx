import React from "react";
import ProductCard from "./ProductCard";
import "./ProductGrid.css";

const ProductGrid = ({ products }) => {

    if (products.length === 0) {

        return (

            <div className="products-empty">

                <h2>

                    No Products Found 😕

                </h2>

                <p>

                    Try searching for another product.

                </p>

            </div>

        );

    }

    return (

        <section className="product-grid">

            {

                products.map((product) => (

                    <ProductCard

                        key={product._id}

                        product={product}

                    />

                ))

            }

        </section>

    );

};

export default ProductGrid;