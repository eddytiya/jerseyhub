import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { useCompare } from "./CompareContext";
import "./ComparePage.css";

const ROWS = [

    { label: "Price", render: (j) => `₹ ${j.price}` },
    { label: "Team", render: (j) => j.teamName },
    { label: "Category", render: (j) => j.category },
    { label: "Season", render: (j) => j.season },
    { label: "Sizes", render: (j) => j.sizes?.join(", ") || "-" },
    { label: "Stock", render: (j) => (j.stock > 0 ? `${j.stock} Available` : "Out Of Stock") },
    { label: "Rating", render: (j) => (j.averageRating ? `${j.averageRating.toFixed(1)} / 5` : "No Reviews Yet") }

];

const ComparePage = () => {

    const { compareList, removeFromCompare } = useCompare();

    const navigate = useNavigate();

    if (compareList.length === 0) {

        return (

            <div className="compare-page-empty">

                <h2>Nothing To Compare Yet</h2>

                <p>Add 2-3 jerseys to compare from any product page.</p>

                <button onClick={() => navigate("/products")}>
                    Browse Jerseys
                </button>

            </div>

        );

    }

    return (

        <div className="compare-page container">

            <h1 className="compare-title">Compare Jerseys</h1>

            <div className="compare-table-wrap">

                <table className="compare-table">

                    <thead>

                        <tr>

                            <th></th>

                            {
                                compareList.map((jersey) => (
                                    <th key={jersey._id}>

                                        <div className="compare-card">

                                            <button
                                                className="compare-remove"
                                                onClick={() => removeFromCompare(jersey._id)}
                                            >
                                                <FaTimes />
                                            </button>

                                            <img src={jersey.imageUrl} alt={jersey.jerseyName} />

                                            <h4>{jersey.jerseyName}</h4>

                                            <button
                                                className="compare-view-btn"
                                                onClick={() => navigate(`/jersey/${jersey._id}`)}
                                            >
                                                View Product
                                            </button>

                                        </div>

                                    </th>
                                ))
                            }

                        </tr>

                    </thead>

                    <tbody>

                        {
                            ROWS.map((row) => (
                                <tr key={row.label}>

                                    <td className="compare-row-label">{row.label}</td>

                                    {
                                        compareList.map((jersey) => (
                                            <td key={jersey._id}>
                                                {row.render(jersey)}
                                            </td>
                                        ))
                                    }

                                </tr>
                            ))
                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default ComparePage;
