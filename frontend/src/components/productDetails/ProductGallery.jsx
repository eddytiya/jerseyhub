import React, { useEffect, useState } from "react";
import ImageViewer from "./ImageViewer";

import {
    FaSearchPlus,
    FaHeart,
    FaRegHeart,
    FaShareAlt
} from "react-icons/fa";

import useWishlist from "../../hooks/useWishlist";

import "./ProductGallery.css";

const ProductGallery = ({ jersey }) => {

    /* ==========================================
                IMAGES
    ========================================== */

    const thumbnails =

        jersey.images && jersey.images.length > 0

            ? jersey.images

            : [jersey.imageUrl];

    const [selectedImage, setSelectedImage] = useState(

        thumbnails[0]

    );

    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {

        if (thumbnails.length > 0) {

            setSelectedImage(

                thumbnails[0]

            );

        }

    }, [jersey]);

    /* ==========================================
                WISHLIST
    ========================================== */

    const {

        wishlist,

        addToWishlist,

        removeFromWishlist

    } = useWishlist();

    const isWishlisted = wishlist.some(

        item => item._id === jersey._id

    );

    return (

        <div className="gallery-card">

            {/* ==========================================
                    FLOATING ICONS
            ========================================== */}

            <div className="gallery-icons">

                <button

                    onClick={() => {

                        if (isWishlisted) {

                            removeFromWishlist(

                                jersey._id

                            );

                        }

                        else {

                            addToWishlist(

                                jersey

                            );

                        }

                    }}

                >

                    {

                        isWishlisted

                            ?

                            <FaHeart color="#ff3b5c" />

                            :

                            <FaRegHeart />

                    }

                </button>

                <button>

                    <FaShareAlt />

                </button>

                <button

                    onClick={() =>

                        setShowPreview(true)

                    }

                >

                    <FaSearchPlus />

                </button>

            </div>

            {/* ==========================================
                    MAIN IMAGE
            ========================================== */}

            <div

                className="gallery-main"

                onClick={() =>

                    setShowPreview(true)

                }

            >

                <img

                    src={selectedImage}

                    alt={jersey.jerseyName}

                />

                <div className="gallery-overlay">

                    <FaSearchPlus />

                    <span>

                        Click To Enlarge

                    </span>

                </div>

            </div>

            {/* ==========================================
                    THUMBNAILS
            ========================================== */}

            <div className="gallery-thumbnails">

                {

                    thumbnails.map((img, index) => (

                        <div

                            key={index}

                            className={

                                selectedImage === img

                                    ?

                                    "thumb active"

                                    :

                                    "thumb"

                            }

                            onClick={() =>

                                setSelectedImage(img)

                            }

                        >

                            <img

                                src={img}

                                alt={`Thumbnail ${index + 1}`}

                            />

                        </div>

                    ))

                }

            </div>

            {/* ==========================================
                    FULLSCREEN VIEWER
            ========================================== */}

            {
                showPreview && (

                    <ImageViewer

                        images={thumbnails}

                        currentImage={selectedImage}

                        onClose={() =>

                            setShowPreview(false)

                        }

                    />

                )

            }

        </div>

    );

};

export default ProductGallery;