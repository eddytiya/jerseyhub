import React from "react";

import { FaLayerGroup } from "react-icons/fa";

import { MdAdd } from "react-icons/md";

import "./ProductTypesHeader.css";

const ProductTypesHeader = ({ onAdd }) => {

    return (

        <div className="product-types-header">

            <div className="product-types-header-left">

                <div className="product-types-icon">

                    <FaLayerGroup />

                </div>

                <div>

                    <h1>

                        Product Types

                    </h1>

                    <p>

                        Create and manage all product types used across your store.

                    </p>

                </div>

            </div>

            <button

                className="add-product-type-btn"

                onClick={onAdd}

            >

                <MdAdd />

                Add Product Type

            </button>

        </div>

    );

};

export default ProductTypesHeader;