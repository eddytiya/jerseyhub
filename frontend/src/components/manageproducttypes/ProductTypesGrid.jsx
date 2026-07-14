import React from "react";

import ProductTypesCard from "./ProductTypesCard";

import "./ProductTypesGrid.css";

const ProductTypesGrid = ({

    productTypes,

    onEdit,

    onDelete,

    onToggle

}) => {

    if(productTypes.length===0){

        return(

            <div className="product-types-empty">

                <h2>

                    No Product Types Found

                </h2>

                <p>

                    Click "Add Product Type" to create your first product type.

                </p>

            </div>

        );

    }

    return(

        <div className="product-types-grid">

            {

                productTypes.map(type=>(

                    <ProductTypesCard

                        key={type._id}

                        productType={type}

                        onEdit={onEdit}

                        onDelete={onDelete}

                        onToggle={onToggle}

                    />

                ))

            }

        </div>

    );

};

export default ProductTypesGrid;