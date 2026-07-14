import React from "react";
import axios from "axios";
import {

    FaStar,

    FaCheckCircle,

    FaThumbsUp

} from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

import "./ReviewTable.css";

import ReviewModal from "./ReviewModal";

const ReviewTable = ({

    reviews,

    loading,

    setSelectedReview,

    refreshReviews

}) => {


    if (loading) {

        return (

            <div className="review-table-loading">

                Loading Reviews...

            </div>

        );

    }

    if (reviews.length === 0) {

        return (

            <div className="review-table-empty">

                No Reviews Found

            </div>

        );

    }

    const deleteReview = async (id) => {

    const confirmDelete = window.confirm(

        "Delete this review?"

    );

    if (!confirmDelete) return;

    try {

        await axios.delete(

            `http://localhost:2987/review/admin/${id}`,

            {

                withCredentials: true

            }

        );

        refreshReviews();

    }

    catch (err) {

        console.log(err);

    }

};

   return (

    <>

        <div className="review-table-wrapper">

            <table className="review-table">

                <thead>

                    <tr>

                        <th>Customer</th>

                        <th>Jersey</th>

                        <th>Rating</th>

                        <th>Review</th>

                        <th>Verified</th>

                        <th>Helpful</th>

                        <th>Date</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        reviews.map(review => (

                            <tr

                                key={review._id}

                            >

                                <td>

                                    <div className="review-user">

                                        {

                                            review.user?.picture ?

                                            <img

                                                src={review.user.picture}

                                                alt=""

                                            />

                                            :

                                            <div className="review-avatar">

                                                {

                                                    review.user?.uname

                                                    ?.charAt(0)

                                                    ?.toUpperCase()

                                                }

                                            </div>

                                        }

                                        <span>

                                            {

                                                review.user?.uname

                                            }

                                        </span>

                                    </div>

                                </td>

                                <td>

                                    {

                                        review.jersey?.name ||

                                        "Jersey"

                                    }

                                </td>

                                <td>

                                    <span className="rating-badge">

                                        <FaStar />

                                        {

                                            review.rating

                                        }

                                    </span>

                                </td>

                                <td>

                                    <div className="review-comment">

                                        {

                                            review.comment

                                        }

                                    </div>

                                </td>

                                <td>

                                    {

                                        review.verifiedPurchase ?

                                        <span className="verified">

                                            <FaCheckCircle />

                                            Yes

                                        </span>

                                        :

                                        "-"

                                    }

                                </td>

                                <td>

                                    <span className="helpful">

                                        <FaThumbsUp />

                                        {

                                            review.helpful

                                        }

                                    </span>

                                </td>

                                <td>

                                    {

                                        new Date(

                                            review.createdAt

                                        ).toLocaleDateString()

                                    }

                                </td>

                                <td>

    <button

        className="review-action-btn"

        onClick={() =>

            setSelectedReview(

                review

            )

        }

    >

        View

    </button>

    <button

        className="review-delete-btn"

        onClick={() =>

            deleteReview(

                review._id

            )

        }

    >

        <FaTrash />

    </button>

</td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

       </div>



</>

);

};

export default ReviewTable;