import React from "react";

import ProductMiniCard from "./ProductMiniCard";

const ProductMessage = ({ products }) => {

    return (

        <div>

            {

                products.map(product => (

                    <ProductMiniCard

                        key={product._id}

                        product={product}

                    />

                ))

            }

        </div>

    );

};

export default ProductMessage;