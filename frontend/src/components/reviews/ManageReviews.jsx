import React, {

    useEffect,

    useState

} from "react";

import axios from "axios";
import API_URL from "../../utils/api";
import ReviewTable from "./ReviewTable";

import ReviewStats from "./ReviewStats";

import ReviewModal from "./ReviewModal";

import "./ManageReviews.css";

const ManageReviews = () => {

    const [reviews, setReviews] = useState([]);

    const [loading, setLoading] = useState(true);

    const [selectedReview, setSelectedReview] = useState(null);

    /* ==========================================
                LOAD REVIEWS
    ========================================== */

    const fetchReviews = () => {

        setLoading(true);

        axios.get(

            `${API_URL}/review/admin/all`,

            {

                withCredentials: true

            }

        )

        .then((resp) => {

            setReviews(

                resp.data

            );

        })

        .catch(console.log)

        .finally(() => {

            setLoading(false);

        });

    };

    useEffect(() => {

        fetchReviews();

    }, []);

    return (

        <>

            <div className="manage-reviews">

                <div className="manage-reviews-header">

                    <h2>

                        Customer Reviews

                    </h2>

                    <p>

                        View and manage all customer reviews.

                    </p>

                </div>

                <ReviewStats

                    reviews={reviews}

                />

                <ReviewTable

                    reviews={reviews}

                    loading={loading}

                    setSelectedReview={setSelectedReview}

                    refreshReviews={fetchReviews}

                />

            </div>

            <ReviewModal

                review={selectedReview}

                onClose={() =>

                    setSelectedReview(null)

                }

            />

        </>

    );

};

export default ManageReviews;