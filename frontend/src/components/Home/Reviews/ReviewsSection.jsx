import React, { useEffect, useState } from "react";

import axios from "axios";

import { motion } from "framer-motion";

import RatingSummary from "./RatingSummary";
import ReviewCard from "./ReviewCard";
import ReviewCarousel from "./ReviewCarousel";
import "./ReviewsSection.css";

const ReviewsSection = () => {

    /* ==========================================
                    STATE
    ========================================== */

    const [reviews, setReviews] = useState([]);

    const [averageRating, setAverageRating] = useState(0);

    const [totalReviews, setTotalReviews] = useState(0);

    const [loading, setLoading] = useState(true);

    /* ==========================================
                FETCH REVIEWS
    ========================================== */

    const fetchReviews = async () => {

        try {

            const res = await axios.get(

                "http://localhost:2987/review/featured"

            );

            setReviews(

                res.data.reviews

            );

            setAverageRating(

                res.data.averageRating

            );

            setTotalReviews(

                res.data.totalReviews

            );

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchReviews();

    }, []);

    /* ==========================================
                    LOADING
    ========================================== */

    if (loading) {

        return null;

    }

    /* ==========================================
                    RETURN
    ========================================== */

    return (

        <section className="reviews-section">

            <motion.div

                className="reviews-header"

                initial={{

                    opacity: 0,

                    y: 40

                }}

                whileInView={{

                    opacity: 1,

                    y: 0

                }}

                viewport={{

                    once: true

                }}

            >

                <h2>

                    ❤️ Loved by Football Fans

                </h2>

                <p>

                    Thousands of football fans trust JerseyHub for premium jerseys.

                </p>

            </motion.div>

            <RatingSummary

                averageRating={averageRating}

                totalReviews={totalReviews}

            />

            <ReviewCarousel

    reviews={reviews}

/>

        </section>

    );

};

export default ReviewsSection;