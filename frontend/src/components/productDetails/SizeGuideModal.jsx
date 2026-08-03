import React from "react";
import { FaTimes } from "react-icons/fa";
import "./SizeGuideModal.css";

const SIZE_CHART = [
    { size: "S", chest: "36 - 38", length: "27" },
    { size: "M", chest: "39 - 41", length: "28" },
    { size: "L", chest: "42 - 44", length: "29" },
    { size: "XL", chest: "45 - 47", length: "30" },
    { size: "XXL", chest: "48 - 50", length: "31" }
];

const SizeGuideModal = ({ onClose }) => {

    return (

        <div className="size-guide-overlay" onClick={onClose}>

            <div
                className="size-guide-modal"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="size-guide-header">
                    <h3>Size Guide</h3>
                    <button onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <p className="size-guide-note">
                    All measurements are in inches. Jerseys are designed with
                    a relaxed athletic fit — if you're between sizes, we
                    recommend sizing up.
                </p>

                <table className="size-guide-table">
                    <thead>
                        <tr>
                            <th>Size</th>
                            <th>Chest (in)</th>
                            <th>Length (in)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            SIZE_CHART.map((row) => (
                                <tr key={row.size}>
                                    <td>{row.size}</td>
                                    <td>{row.chest}</td>
                                    <td>{row.length}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                <div className="size-guide-tips">
                    <h4>How To Measure</h4>
                    <ul>
                        <li>
                            <strong>Chest :</strong> Measure around the
                            fullest part of your chest, keeping the tape
                            level.
                        </li>
                        <li>
                            <strong>Length :</strong> Measure from the
                            highest point of the shoulder down to the hem.
                        </li>
                    </ul>
                </div>

            </div>

        </div>

    );

};

export default SizeGuideModal;
