import React, {

    useEffect,

    useState

} from "react";

import axios from "axios";
import API_URL from "../../utils/api";
import RatingBreakdown from "./RatingBreakdown";

import ReviewForm from "./ReviewForm";

import ReviewCard from "./ReviewCard";

import "./ReviewSection.css";

const ReviewSection = ({

    jerseyId,

    uploadImageToCloudinary

}) => {

    const [reviews,setReviews]=useState([]);

    const [loading,setLoading]=useState(true);

    const [averageRating,setAverageRating]=useState(0);

    const [totalReviews,setTotalReviews]=useState(0);
   
    const [currentUser, setCurrentUser] = useState(null);
    const [editingReview, setEditingReview] = useState(null);

    /* ==========================================
                LOAD REVIEWS
    ========================================== */

    const fetchReviews=()=>{

        setLoading(true);

        axios.get(

            `${API_URL}/review/jersey/${jerseyId}`

        )

        .then((resp)=>{

            setReviews(

                resp.data.reviews

            );

            setAverageRating(

                resp.data.reviews.length

                ?

                resp.data.reviews.reduce(

                    (

                        total,

                        review

                    )=>

                        total+

                        review.rating,

                    0

                )/

                resp.data.reviews.length

                :

                0

            );

            setTotalReviews(

                resp.data.reviews.length

            );

        })

        .catch(console.log)

        .finally(()=>{

            setLoading(false);

        });

    };

    useEffect(() => {

    if (!jerseyId) return;

    fetchReviews();

    axios.get(

         `${API_URL}/user/me`,

        {

            withCredentials: true

        }

    )

    .then((resp) => {

        setCurrentUser(resp.data);

    })

    .catch(() => {

        setCurrentUser(null);

    });

}, [jerseyId]);

    /* ==========================================
                HELPFUL
    ========================================== */

    const handleHelpful=(id)=>{

        axios.put(

            `${API_URL}/review/helpful/${id}`,

            {},

            {

                withCredentials:true

            }

        )

        .then(()=>{

            fetchReviews();

        });

    };

    /* ==========================================
            DELETE REVIEW
========================================== */

const handleDelete = async (reviewId) => {

    const confirmDelete = window.confirm(

        "Delete this review?"

    );

    if (!confirmDelete) return;

    try {

        await axios.delete(

            `${API_URL}/review/${reviewId}`,

            {

                withCredentials: true

            }

        );

        fetchReviews();

    }

    catch (err) {

        console.log(err);

        alert(

            err.response?.data?.message ||

            "Failed To Delete Review."

        );

    }

};
/* ==========================================
            EDIT REVIEW
========================================== */

const handleEdit = (review) => {

    setEditingReview(review);

    window.scrollTo({

        top: document.querySelector(

            ".review-form"

        ).offsetTop - 120,

        behavior: "smooth"

    });

};

    return(

        <section className="review-section">

            <RatingBreakdown

                averageRating={averageRating}

                totalReviews={totalReviews}

                reviews={reviews}

            />

           <ReviewForm

    jerseyId={jerseyId}

    editingReview={editingReview}

    setEditingReview={setEditingReview}

    onReviewAdded={

        fetchReviews

    }

/>
            <div className="review-list">

                {

                    loading

                    ?

                    <h4>

                        Loading Reviews...

                    </h4>

                    :

                    reviews.length===0

                    ?

                    <div className="review-empty">

                        <h3>

                            No Reviews Yet

                        </h3>

                        <p>

                            Be the first customer to review this jersey.

                        </p>

                    </div>

                    :

                    reviews.map(review=>(

                       <ReviewCard

    key={review._id}

    review={review}

    currentUser={currentUser}

    onHelpful={handleHelpful}

    onDelete={handleDelete}

    onEdit={handleEdit}

/>

                    ))

                }

            </div>

        </section>

    );

};

export default ReviewSection;