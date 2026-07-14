import React, { memo } from "react";
import { Line, Pie } from 'react-chartjs-2';
import './Analytics.css';

const Analytics = ({ revenueChart, orderStatusChart }) => {

    return (

        <>

            {/* ===========================================
                    MONTHLY REVENUE
            =========================================== */}

            <div className="analytics-card fade-up">

                <div className="analytics-header revenue">

                    <h4>

                        📈 Monthly Revenue

                    </h4>

                </div>

                <div className="analytics-body">

                    <Line

                        data={revenueChart}

                        options={{

                            responsive: true,

                            maintainAspectRatio: true,

                            plugins: {

                                legend: {

                                    display: true,

                                    position: "top"

                                }

                            }

                        }}

                    />

                </div>

            </div>

            {/* ===========================================
                    ORDERS BY STATUS
            =========================================== */}

            <div className="analytics-card fade-up">

                <div className="analytics-header orders">

                    <h4>

                        📦 Orders By Status

                    </h4>

                </div>

                <div className="analytics-body">

                    <div className="analytics-pie">

                        <Pie

                            data={orderStatusChart}

                            options={{

                                responsive: true,

                                maintainAspectRatio: true,

                                plugins: {

                                    legend: {

                                        position: "bottom",

                                        labels: {

                                            padding: 20,

                                            usePointStyle: true,

                                            font: {

                                                size: 14,

                                                weight: "600"

                                            }

                                        }

                                    }

                                }

                            }}

                        />

                    </div>

                </div>

            </div>

        </>

    );

};

export default memo(Analytics);