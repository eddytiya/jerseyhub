import React from "react";
import "./ProductMiniCard.css";

const ProductMiniCard = ({ product }) => {

    return (

        <div className="ai-product-card">

            <img

                src={product.imageUrl}

                alt={product.jerseyName}

                className="ai-product-image"

            />

            <div className="ai-product-info">

                <h4>

                    {product.teamName}

                </h4>

                <p>

                    {product.jerseyName}

                </p>

                <span>

                    ₹{product.price}

                </span>

                <button>

                    View Product

                </button>

            </div>

        </div>

    );

};

export default ProductMiniCard;