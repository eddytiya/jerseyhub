import React from "react";

import {

    Swiper,

    SwiperSlide

} from "swiper/react";

import {

    Autoplay,

    Pagination,

    EffectFade

} from "swiper/modules";

import ReviewSlide from "./ReviewSlide";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import "./ReviewCarousel.css";

const ReviewCarousel = ({

    reviews

}) => {

    return (

        <Swiper

            modules={[

                Autoplay,

                Pagination,

                EffectFade

            ]}

            effect="fade"

            fadeEffect={{

                crossFade:true

            }}

            spaceBetween={0}

            slidesPerView={1}

            loop={true}

            grabCursor={true}

            autoplay={{

                delay:3000,

                disableOnInteraction:false,

                pauseOnMouseEnter:true

            }}

            pagination={{

                clickable:true

            }}

        >

            {

                reviews.map(

                    review=>(

                        <SwiperSlide

                            key={review._id}

                        >

                            <ReviewSlide

                                review={review}

                            />

                        </SwiperSlide>

                    )

                )

            }

        </Swiper>

    );

};

export default ReviewCarousel;