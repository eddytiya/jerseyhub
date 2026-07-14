import React from "react";
import "./BulkActions.css";

const BulkActions = ({
    selectedCount,
    onDelete,
    onFeature,
    onUnfeature
}) => {

    if (selectedCount === 0) return null;

    return (

        <section className="adminjersey-actions">

            <div className="adminjersey-actions-card">

                {/* ======================================
                            LEFT
                ======================================= */}

                <div className="adminjersey-actions-left">

                    <span className="adminjersey-actions-badge">

                        ⚡ Bulk Actions

                    </span>

                    <h3 className="adminjersey-actions-title">

                        {selectedCount} Jersey{selectedCount > 1 ? "s" : ""} Selected

                    </h3>

                    <p className="adminjersey-actions-subtitle">

                        Apply actions to all selected jerseys at once.

                    </p>

                </div>

                {/* ======================================
                            RIGHT
                ======================================= */}

                <div className="adminjersey-actions-right">

                    <button
                        className="adminjersey-action-btn adminjersey-feature-btn"
                        onClick={onFeature}
                    >
                        ⭐
                        <span>Feature</span>
                    </button>

                    <button
                        className="adminjersey-action-btn adminjersey-unfeature-btn"
                        onClick={onUnfeature}
                    >
                        ✨
                        <span>Remove</span>
                    </button>

                    <button
                        className="adminjersey-action-btn adminjersey-delete-btn"
                        onClick={onDelete}
                    >
                        🗑
                        <span>Delete</span>
                    </button>

                </div>

            </div>

        </section>

    );

};

export default BulkActions;