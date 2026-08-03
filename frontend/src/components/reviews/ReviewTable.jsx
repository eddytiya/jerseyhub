import React from "react";
import axios from "axios";
import API_URL from "../../utils/api";
import {

    FaStar,

    FaCheckCircle,

    FaThumbsUp,

    FaHeart,

    FaRegHeart

} from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { showSuccess, showError } from "../../utils/toastUtils";

import "./ReviewTable.css";

import ReviewModal from "./ReviewModal";

const MAX_FEATURED = 6;

const ReviewTable = ({

    reviews,

    loading,

    setSelectedReview,

    refreshReviews

}) => {

    const featuredCount = reviews.filter((r) => r.isHomepageFeatured).length;

    const toggleFeatured = async (id) => {

        try {

            const resp = await axios.put(

                `${API_URL}/review/admin/${id}/feature`,

                {},

                { withCredentials: true }

            );

            showSuccess(resp.data.message);

            refreshReviews();

        }

        catch (err) {

            showError(err.response?.data?.message || "Failed To Update");

        }

    };


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

            `${API_URL}/review/admin/${id}`,

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

                        <th>Featured ({featuredCount}/{MAX_FEATURED})</th>

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

                                        review.jersey?.teamName ||

                                        review.jersey?.jerseyName ||

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

                                        className="review-feature-btn"

                                        disabled={

                                            !review.isHomepageFeatured &&

                                            featuredCount >= MAX_FEATURED

                                        }

                                        title={

                                            review.isHomepageFeatured

                                                ? "Remove From Homepage"

                                                : "Feature On Homepage"

                                        }

                                        onClick={() => toggleFeatured(review._id)}

                                    >

                                        {

                                            review.isHomepageFeatured

                                                ? <FaHeart color="#ef4444" />

                                                : <FaRegHeart />

                                        }

                                    </button>

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