import React from "react";
import { NavLink } from "react-router-dom";
import "./JerseyCard.css";
import {

    Pencil,

    Star,

    Trash2,

    StarOff

} from "lucide-react";
const JerseyCard = ({
    jersey,
    onDelete,
    onToggleFeatured
}) => {

    if (!jersey) return null;

    const stockStatus =
        jersey.stock === 0
            ? "Out Of Stock"
            : jersey.stock <= 5
            ? "Low Stock"
            : "In Stock";

    const stockClass =
        jersey.stock === 0
            ? "adminjersey-out"
            : jersey.stock <= 5
            ? "adminjersey-low"
            : "adminjersey-good";

    return (

    <article className="adminjersey-rowcard">

        {/* IMAGE */}

        <div className="adminjersey-rowcard-image">

            <img
                src={jersey.imageUrl}
                alt={jersey.jerseyName}
            />

            {
                jersey.featured && (

                    <div className="adminjersey-rowcard-featured">

                        ⭐ Featured

                    </div>

                )
            }

        </div>

        {/* DETAILS */}

        <div className="adminjersey-rowcard-details">

            <div className="adminjersey-rowcard-header">

                <div>

                    <h2 className="adminjersey-rowcard-title">

                        {jersey.teamName}

                    </h2>

                    <h5 className="adminjersey-rowcard-subtitle">

                        {jersey.jerseyName}

                    </h5>

                </div>

                <span className="adminjersey-rowcard-category">

                    {jersey.category}

                </span>

            </div>

            <p className="adminjersey-rowcard-description">

                {jersey.description ||
                    "Premium football jersey made with high quality fabric."}

            </p>

        </div>

        {/* PRICE */}

        <div className="adminjersey-rowcard-price">

            <span>Price</span>

            <h3>

                ₹ {jersey.price}

            </h3>

        </div>

        {/* STOCK */}

        <div className="adminjersey-rowcard-stockbox">

            <span>Stock</span>

            <h3>

                {jersey.stock}

            </h3>

            <div
                className={`adminjersey-rowcard-status ${stockClass}`}
            >

                {stockStatus}

            </div>

        </div>

        {/* ACTIONS */}

        <div className="adminjersey-rowcard-actions">

            <NavLink

                to={`/edit-jersey/${jersey._id}`}

                className="adminjersey-rowcard-btn adminjersey-edit"

            >

               <Pencil size={18} />

<span>Edit</span>

            </NavLink>

            <button

                type="button"

                className="adminjersey-rowcard-btn adminjersey-feature"

                onClick={() => onToggleFeatured(jersey._id)}

            >

                {

    jersey.featured ?

    <>

        <StarOff size={18} />

        <span>Unfeature</span>

    </>

    :

    <>

        <Star size={18} />

        <span>Feature</span>

    </>

}

            </button>

            <button

                type="button"

                className="adminjersey-rowcard-btn adminjersey-delete"

                onClick={() => onDelete(jersey._id)}

            >

                <Trash2 size={18} />

<span>Delete</span>

            </button>

        </div>

    </article>

);

};

export default JerseyCard;