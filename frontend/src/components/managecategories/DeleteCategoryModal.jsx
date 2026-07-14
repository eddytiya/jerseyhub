import React from "react";
import "./DeleteCategoryModal.css";

const DeleteCategoryModal = ({
    isOpen,
    categoryName,
    onCancel,
    onConfirm,
    loading = false
}) => {

    if (!isOpen) return null;

    return (

        <div className="categories-admin-modal-overlay">

            <div className="categories-admin-modal">

                <div className="categories-admin-modal-icon">

                    🗑️

                </div>

                <h2>

                    Delete Category

                </h2>

                <p>

                    Are you sure you want to delete

                    <strong> {categoryName} </strong>

                    ?

                </p>

                <span className="categories-admin-modal-warning">

                    This action cannot be undone.

                </span>

                <div className="categories-admin-modal-actions">

                    <button

                        className="categories-admin-modal-btn cancel"

                        onClick={onCancel}

                        disabled={loading}

                    >

                        Cancel

                    </button>

                    <button

                        className="categories-admin-modal-btn delete"

                        onClick={onConfirm}

                        disabled={loading}

                    >

                        {

                            loading

                                ? "Deleting..."

                                : "Delete Category"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

};

export default DeleteCategoryModal;