import React, { useEffect, useState } from "react";
import axios from "axios";

import HeroCarousel from "./Home/HeroCarousel";
import CategorySection from "./Home/CategorySection";
import FeaturedSection from "./Home/FeaturedSection";
import StatsSection from "./Home/StatsSection";
import WhyChoose from "./Home/WhyChoose";
import ReviewsSection from "./Home/Reviews/ReviewsSection";

import CTASection from "./Home/CTASection";
const Home = () => {

    const [categories, setCategories] = useState([]);
    const [jerseys, setJerseys] = useState([]);

    useEffect(() => {

        axios
            .get("http://localhost:2987/category/featured")
            .then((resp) => setCategories(resp.data))
            .catch((err) => console.log(err));

        axios
            .get("http://localhost:2987/jersey/featured")
            .then((resp) => setJerseys(resp.data))
            .catch((err) => console.log(err));

    }, []);

    return (

        <>

            <HeroCarousel />
            <StatsSection />

            <CategorySection

                categories={categories}

                jerseys={jerseys}

            />

            <FeaturedSection

                jerseys={jerseys}

            />
            <WhyChoose />
           
            <ReviewsSection />

             <CTASection />

        </>

    );

};

export default Home;