import React from "react";

import {

    FaEdit,

    FaTrash,

    FaCheckCircle,

    FaTimesCircle,

    FaLayerGroup

} from "react-icons/fa";

import "./ProductTypesCard.css";

const ProductTypesCard = ({

    productType,

    onEdit,

    onDelete,

    onToggle

}) => {

    return (

        <div className="product-type-card">

            {/* HEADER */}

            <div className="product-type-card-header">

                <div className="product-type-avatar">

                    <FaLayerGroup />

                </div>

                <div>

                    <h2>

                        {productType.typeName}

                    </h2>

                    <p>

                        {

                            productType.description ||

                            "No description available."

                        }

                    </p>

                </div>

            </div>

            {/* STATUS */}

            <div className="product-type-status-row">

                <span

                    className={

                        productType.status

                        ?

                        "status-badge active"

                        :

                        "status-badge inactive"

                    }

                >

                    {

                        productType.status

                        ?

                        <>

                            <FaCheckCircle />

                            Active

                        </>

                        :

                        <>

                            <FaTimesCircle />

                            Inactive

                        </>

                    }

                </span>

            </div>

            {/* FOOTER */}

            <div className="product-type-footer">

                <button

                    className="edit-btn"

                    onClick={()=>

                        onEdit(productType)

                    }

                >

                    <FaEdit />

                    Edit

                </button>

                <button

                    className="delete-btn"

                    onClick={()=>

                        onDelete(productType)

                    }

                >

                    <FaTrash />

                    Delete

                </button>

            </div>

        </div>

    );

};

export default ProductTypesCard;