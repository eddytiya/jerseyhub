import React, {

    useState,

    useRef,

    useEffect

} from "react";

import axios from "axios";
import API_URL from "../../utils/api";
import StarRating from "./StarRating";

import uploadImageToCloudinary from "../../utils/uploadImageToCloudinary";

import {

    showSuccess,

    showError

} from "../../utils/toastUtils";

import "./ReviewForm.css";

const ReviewForm = ({

    jerseyId,

    onReviewAdded,

    editingReview,

    setEditingReview

}) => {

    const [rating, setRating] = useState(0);

    const [comment, setComment] = useState("");

    const [selectedFiles, setSelectedFiles] = useState([]);

    const [existingImages, setExistingImages] = useState([]);

    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef(null);


    /* ==========================================
            LOAD REVIEW TO EDIT
========================================== */

useEffect(() => {

    if (!editingReview) {

        setExistingImages([]);

        return;

    }

    setRating(

        editingReview.rating

    );

    setComment(

        editingReview.comment

    );

    setExistingImages(

        editingReview.images || []

    );

    setSelectedFiles([]);

}, [editingReview]);

    /* ==========================================
                IMAGE CHANGE
    ========================================== */

    const handleImageChange = (e) => {

        const files = Array.from(e.target.files);

        const totalImages =

    existingImages.length +

    selectedFiles.length +

    files.length;

if (totalImages > 5) {

    showError(

        "Maximum 5 images allowed."

    );

    return;

}

        setSelectedFiles([

            ...selectedFiles,

            ...files

        ]);

    };

    /* ==========================================
                REMOVE IMAGE
    ========================================== */

   const removeImage = (index) => { 

        setSelectedFiles(

            selectedFiles.filter(

                (_, i) => i !== index

            )

        );

    };
    /* ==========================================
        REMOVE EXISTING IMAGE
========================================== */

const removeExistingImage = (index) => {

    setExistingImages(

        existingImages.filter(

            (_, i) => i !== index

        )

    );

};

    /* ==========================================
                SUBMIT REVIEW
    ========================================== */

    const handleSubmit = async (e) => {

    e.preventDefault();

    if (rating === 0) {

        showError(

            "Please select a rating."

        );

        return;

    }

    if (comment.trim().length < 10) {

        showError(

            "Review should contain at least 10 characters."

        );

        return;

    }

    try {

        setLoading(true);

        const uploadedImages = [];

for (const file of selectedFiles) {

    const url = await uploadImageToCloudinary(file);

    uploadedImages.push(url);

}

const images = [

    ...existingImages,

    ...uploadedImages

];

        /* ==========================================
                EDIT REVIEW
        ========================================== */

        if (editingReview) {

            await axios.put(

                `${API_URL}/review/${editingReview._id}`,

                {

                    rating,

                    comment,

                    images

                },

                {

                    withCredentials: true

                }

            );

            showSuccess(

                "Review Updated Successfully ⭐"

            );

        }

        /* ==========================================
                ADD REVIEW
        ========================================== */

        else {

            await axios.post(

                `${API_URL}/review/add`,

                {

                    jersey: jerseyId,

                    rating,

                    comment,

                    images

                },

                {

                    withCredentials: true

                }

            );

            showSuccess(

                "Review Submitted Successfully ⭐"

            );

        }

        /* ==========================================
                RESET FORM
        ========================================== */

        setRating(0);

setComment("");

setSelectedFiles([]);

setExistingImages([]);

setEditingReview(null);

        if (fileInputRef.current) {

            fileInputRef.current.value = "";

        }

        onReviewAdded();

    }

    catch (err) {

        console.log(err);

        showError(

            err.response?.data?.message ||

            "Failed To Submit Review."

        );

    }

    finally {

        setLoading(false);

    }

};

    return (

        <form

            className="review-form"

            onSubmit={handleSubmit}

        >

            <h4>

    {

        editingReview

        ?

        "Edit Your Review"

        :

        "Write a Review"

    }

</h4>

            <StarRating

                value={rating}

                onChange={setRating}

            />

            <textarea

                className="form-control review-textarea"

                placeholder="Tell other buyers about the jersey..."

                value={comment}

                onChange={(e) =>

                    setComment(

                        e.target.value

                    )

                }

            />

           {/* ==========================================
        EXISTING IMAGES
========================================== */}

{

    existingImages.length > 0 &&

    <>

        <h6 className="review-image-heading">

            Current Images

        </h6>

        <div className="review-preview-grid">

            {

                existingImages.map(

                    (

                        image,

                        index

                    ) => (

                        <div

                            key={index}

                            className="review-preview"

                        >

                            <img

                                src={image}

                                alt={`Review ${index + 1}`}

                            />

                            <button

                                type="button"

                                onClick={() =>

                                    removeExistingImage(index)

                                }

                            >

                                ×

                            </button>

                        </div>

                    )

                )

            }

        </div>

    </>

}

{/* ==========================================
        UPLOAD NEW IMAGES
========================================== */}

<label

    className="review-upload"

>

    📷 Upload More Images

    <input

        ref={fileInputRef}

        type="file"

        multiple

        accept="image/*"

        hidden

        onChange={handleImageChange}

    />

</label>

            {

                selectedFiles.length > 0 &&

                <div className="review-preview-grid">

                    {

                        selectedFiles.map(

                            (file, index) => (

                                <div

                                    key={index}

                                    className="review-preview"

                                >

                                    <img

                                        src={

                                            URL.createObjectURL(file)

                                        }

                                        alt="Preview"

                                    />

                                    <button

                                        type="button"

                                        onClick={() =>

                                            removeImage(index)

                                        }

                                    >

                                        ×

                                    </button>

                                </div>

                            )

                        )

                    }

                </div>

            }
            {

    editingReview &&

    <button

        type="button"

        className="btn btn-outline-secondary review-cancel"

        onClick={() => {

            setRating(0);

setEditingReview(null);

setRating(0);

setComment("");

setSelectedFiles([]);

setExistingImages([]);

if(fileInputRef.current){

    fileInputRef.current.value="";

}

        }}

    >

        Cancel Editing

    </button>

}
            <button

                type="submit"

                className="btn btn-primary review-submit"

                disabled={loading}

            >

                {

    loading

    ?

    "Submitting..."

    :

    editingReview

    ?

    "Update Review"

    :

    "Submit Review"

}

            </button>

        </form>

    );

};

export default ReviewForm;