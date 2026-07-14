import React, { memo } from "react";
import './LowStock.css';

const LowStock = ({ filteredLowStock }) => {

    return (

        <div className="low-stock-card fade-up">

            <div className="low-stock-header">

                <h4>

                    ⚠ Low Stock Alert

                </h4>

            </div>

            <div className="low-stock-body">

                {

                    filteredLowStock.length === 0

                        ?

                        (

                            <div className="low-stock-empty">

                                <h5 className="text-muted">

                                    🎉 All Jerseys are Well Stocked

                                </h5>

                            </div>

                        )

                        :

                        (

                            <div className="row">

                                {

                                    filteredLowStock.map((jersey) => (

                                        <div
                                            className="col-lg-6 mb-4"
                                            key={jersey._id}
                                        >

                                            <div className="low-stock-item">

                                                <div className="low-stock-content">

                                                    <img

                                                        src={jersey.imageUrl}

                                                        alt={jersey.jerseyName}

                                                        className="low-stock-image"

                                                    />

                                                    <div className="low-stock-info">

                                                        <h5 className="low-stock-team">

                                                            {jersey.teamName}

                                                        </h5>

                                                        <p className="low-stock-name">

                                                            {jersey.jerseyName}

                                                        </p>

                                                        <span className="low-stock-category">

                                                            {jersey.category}

                                                        </span>

                                                    </div>

                                                    <div className="low-stock-count">

                                                        <div className="low-stock-value">

                                                            {jersey.stock}

                                                        </div>

                                                        <small className="low-stock-label">

                                                            Left

                                                        </small>

                                                    </div>

                                                </div>

                                                <div className="low-stock-progress">

                                                    <div

                                                        className="low-stock-progress-bar"

                                                        style={{

                                                            width: `${Math.min(jersey.stock * 20, 100)}%`

                                                        }}

                                                    />

                                                </div>

                                            </div>

                                        </div>

                                    ))

                                }

                            </div>

                        )

                }

            </div>

        </div>

    );

};

export default memo(LowStock);