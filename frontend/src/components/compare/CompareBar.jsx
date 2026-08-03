import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBalanceScale, FaTimes } from "react-icons/fa";
import { useCompare } from "./CompareContext";
import "./CompareBar.css";

const CompareBar = () => {

    const { compareList, removeFromCompare, clearCompare } = useCompare();

    const navigate = useNavigate();

    if (compareList.length < 2) return null;

    return (

        <div className="compare-bar">

            <div className="compare-bar-items">

                {
                    compareList.map((item) => (
                        <div className="compare-bar-item" key={item._id}>

                            <img src={item.imageUrl} alt={item.jerseyName} />

                            <button onClick={() => removeFromCompare(item._id)}>
                                <FaTimes />
                            </button>

                        </div>
                    ))
                }

            </div>

            <div className="compare-bar-actions">

                <button className="compare-bar-clear" onClick={clearCompare}>
                    Clear
                </button>

                <button
                    className="compare-bar-cta"
                    onClick={() => navigate("/compare")}
                >
                    <FaBalanceScale />
                    Compare ({compareList.length})
                </button>

            </div>

        </div>

    );

};

export default CompareBar;
