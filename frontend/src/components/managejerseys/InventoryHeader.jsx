import React from "react";
import "./InventoryHeader.css";

const InventoryHeader = ({

    total,

    selected,

    allSelected,

    onSelectAll

}) => {

    return (

        <section className="adminjersey-inventory">

            <div className="adminjersey-inventory-card">

                {/* =========================
                        LEFT
                ========================== */}

                <div className="adminjersey-inventory-left">

                    <span className="adminjersey-inventory-badge">

                        ⚽ Football Inventory

                    </span>

                    <h2 className="adminjersey-inventory-title">

                        Manage Jerseys

                    </h2>

                    <p className="adminjersey-inventory-subtitle">

                        Organize, edit and manage your football jersey collection.

                    </p>

                    <div className="adminjersey-inventory-stats">

                        <div className="adminjersey-stat-pill">

                            📦

                            <span>

                                {total}

                            </span>

                            Jerseys

                        </div>

                        <div className="adminjersey-stat-pill">

                            ✅

                            <span>

                                {selected}

                            </span>

                            Selected

                        </div>

                    </div>

                </div>

                {/* =========================
                        RIGHT
                ========================== */}

                <div className="adminjersey-inventory-right">

                    <label className="adminjersey-selectall">

                        <input

                            type="checkbox"

                            checked={allSelected}

                            onChange={onSelectAll}

                        />

                        <span className="adminjersey-custom-check"></span>

                        <span>

                            Select All Jerseys

                        </span>

                    </label>

                </div>

            </div>

        </section>

    );

};

export default InventoryHeader;