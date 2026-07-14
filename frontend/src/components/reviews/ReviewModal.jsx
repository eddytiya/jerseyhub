import React from "react";

import {

    FaTimes,

    FaStar,

    FaCheckCircle,

    FaThumbsUp

} from "react-icons/fa";

import "./ReviewModal.css";

const ReviewModal = ({

    review,

    onClose

}) => {

    if (!review) return null;

    return (

        <div

            className="review-modal-overlay"

            onClick={onClose}

        >

            <div

                className="review-modal"

                onClick={(e)=>e.stopPropagation()}

            >

                <button

                    className="review-close-btn"

                    onClick={onClose}

                >

                    <FaTimes/>

                </button>

                <h2>

                    Review Details

                </h2>

                <div className="review-modal-header">

                    <div>

                        <h4>

                            {

                                review.user?.uname

                            }

                        </h4>

                        <p>

                            {

                                review.user?.email

                            }

                        </p>

                    </div>

                    {

                        review.verifiedPurchase &&

                        <span className="review-modal-badge">

                            <FaCheckCircle/>

                            Verified Purchase

                        </span>

                    }

                </div>

                <div className="review-modal-rating">

                    {

                        [...Array(review.rating)].map(

                            (_,i)=>

                            <FaStar

                                key={i}

                            />

                        )

                    }

                </div>

                <div className="review-modal-comment">

                    {

                        review.comment

                    }

                </div>

                {

    review.images?.length > 0 &&

    <div className="review-modal-images">

        {

            review.images.map(

                (

                    img,

                    index

                ) => (

                    <img

                        key={index}

                        src={img}

                        alt="Review"

                        onClick={() =>

                            window.open(

                                img,

                                "_blank"

                            )

                        }

                    />

                )

            )

        }

    </div>

}

                <div className="review-modal-grid">

    <div className="review-item">

        <span>

            Customer

        </span>

        <p>

            {

                review.user?.uname

            }

        </p>

    </div>

    <div className="review-item">

        <span>

            Email

        </span>

        <p>

            {

                review.user?.email

            }

        </p>

    </div>

    <div className="review-item">

        <span>

            Jersey

        </span>

        <p>

            {

                review.jersey?.teamName

            }

            {" "}

            {

                review.jersey?.season

            }

        </p>

    </div>

    <div className="review-item">

        <span>

            Rating

        </span>

        <p>

            {

                review.rating

            }/5 ⭐

        </p>

    </div>

    <div className="review-item">

        <span>

            Helpful

        </span>

        <p>

            <FaThumbsUp />

            {" "}

            {

                review.helpful

            }

        </p>

    </div>

    <div className="review-item">

        <span>

            Created

        </span>

        <p>

            {

                new Date(

                    review.createdAt

                ).toLocaleString()

            }

        </p>

    </div>

</div>

            </div>

        </div>

    );

};

export default ReviewModal;