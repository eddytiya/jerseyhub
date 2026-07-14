import React from "react";

import {

    FaTrashAlt,

    FaExclamationTriangle

} from "react-icons/fa";

import "./DeleteProductTypeModal.css";

const DeleteProductTypeModal = ({

    isOpen,

    productTypeName,

    onCancel,

    onConfirm

}) => {

    if(!isOpen) return null;

    return(

        <div className="delete-type-overlay">

            <div className="delete-type-modal fade-in">

                <div className="delete-warning-icon">

                    <FaExclamationTriangle/>

                </div>

                <h2>

                    Delete Product Type?

                </h2>

                <p>

                    Are you sure you want to delete

                    <strong>

                        {" "}

                        {productTypeName}

                    </strong>

                    ?

                </p>

                <span>

                    This action cannot be undone.

                </span>

                <div className="delete-modal-actions">

                    <button

                        className="cancel-delete-btn"

                        onClick={onCancel}

                    >

                        Cancel

                    </button>

                    <button

                        className="confirm-delete-btn"

                        onClick={onConfirm}

                    >

                        <FaTrashAlt/>

                        Delete

                    </button>

                </div>

            </div>

        </div>

    );

};

export default DeleteProductTypeModal;