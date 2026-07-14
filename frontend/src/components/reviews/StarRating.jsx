import React, { useState } from "react";
import {
    FaStar,
    FaRegStar
} from "react-icons/fa";
import "./StarRating.css";

const StarRating = ({

    value = 0,

    onChange = () => {},

    size = 28,

    readOnly = false

}) => {

    const [hover, setHover] = useState(0);

    return (

        <div

            className={

                readOnly

                    ?

                    "star-rating read-only"

                    :

                    "star-rating"

            }

        >

            {

                [1, 2, 3, 4, 5].map((star) => (

                    <span

                        key={star}

                        className="star-rating-star"

                        onClick={() =>

                            !readOnly &&

                            onChange(star)

                        }

                        onMouseEnter={() =>

                            !readOnly &&

                            setHover(star)

                        }

                        onMouseLeave={() =>

                            !readOnly &&

                            setHover(0)

                        }

                    >

                        {

                            (hover || value) >= star

                                ?

                                <FaStar

                                    size={size}

                                    className="active"

                                />

                                :

                                <FaRegStar

                                    size={size}

                                    className="inactive"

                                />

                        }

                    </span>

                ))

            }

        </div>

    );

};

export default StarRating;