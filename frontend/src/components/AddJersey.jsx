import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import API_URL from "../utils/api";
import { uploadImageToCloudinary } from "../utils/cloudinary";

import "./AddJersey.css";
import {

    showSuccess,

    showError

} from '../utils/toastUtils'
const AddJersey = () => {

    const [jersey, setJersey] = useState({

    teamName: "",

    jerseyName: "",

    category: "",

    season: "",

    productType: "",

    price: "",

    sizes: "",

    stock: "",

    images: [""],

    description: "",

    featured: false

});

const [imageMode, setImageMode] = useState("url");
const [selectedFiles,setSelectedFiles]=useState([null]);
const [uploading,setUploading]=useState(false);
    const [categories, setCategories] = useState([])
    const [productTypes, setProductTypes] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {

    axios.get(`${API_URL}/category`)
        .then((resp) => {
            setCategories(resp.data);
        })
        .catch(console.log);

   axios.get(`${API_URL}/product-type`)
        .then((resp) => {
            setProductTypes(resp.data);
        })
        .catch(console.log);

}, []);


    /* ==========================================
                    IMAGE FUNCTIONS
        ========================================== */

        const addImageField = () => {

            if (jersey.images.length >= 10) return;

            setJersey({

                ...jersey,

                images: [

                    ...jersey.images,

                    ""

                ]

            });

        };

        const removeImageField = (index) => {

            if (jersey.images.length === 1) return;

            const updatedImages = jersey.images.filter(

                (_, i) => i !== index

            );

            setJersey({

                ...jersey,

                images: updatedImages

            });

        };

        const updateImage = (index, value) => {

            const updatedImages = [...jersey.images];

            updatedImages[index] = value;

            setJersey({

                ...jersey,

                images: updatedImages

            });

        };

    const handleSubmit = async (e) => {

    e.preventDefault();
    setUploading(true);

    try {

        let images = [];

        /* ==========================================
                URL MODE
        ========================================== */

        if (imageMode === "url") {

            images = jersey.images.filter(

                image => image.trim() !== ""

            );

        }

        /* ==========================================
                UPLOAD MODE
        ========================================== */

        else {

            const validFiles = selectedFiles.filter(

                file => file !== null

            );

            if (validFiles.length === 0) {

                showError(

                    "Please select at least one image."

                );
                setUploading(false);
                return;

            }

            for (const file of validFiles) {

                const imageUrl = await uploadImageToCloudinary(file);

                images.push(imageUrl);

            }

        }

        /* ==========================================
                VALIDATION
        ========================================== */

        if (images.length === 0) {

            showError(

                "Please add at least one image."

            );
            setUploading(false);
            return;

        }

        if (images.length > 10) {

            showError(

                "Maximum 10 images allowed."

            );
            setUploading(false);
            return;

        }

        const jerseyData = {

            ...jersey,

            images,

            price: Number(jersey.price),

            stock: Number(jersey.stock),

            sizes: jersey.sizes

                .split(",")

                .map(size => size.trim().toUpperCase())

                .filter(Boolean)

        };

        await axios.post(

    `${API_URL}/jersey/add`,

    jerseyData

);

        showSuccess(

            "Jersey Added Successfully ⚽"

        );
        setUploading(false);
        navigate("/");

    }

    catch (err) {

        console.log(err);
        setUploading(false);
        showError(

            err.response?.data?.message ||

            "Failed To Add Jersey"

        );

    }

}

    return (
        <div className="container add-jersey-page py-4">

    <div className="card add-jersey-card border-0 shadow-lg">

        <div className="card-body p-5">

            <div className="page-title">

                <h2>
                    Add New Jersey
                </h2>

                <p>
                    Create a new football jersey and add it to your inventory.
                </p>

            </div>

                   <form onSubmit={handleSubmit}>

    <div className="row g-4">

       {/* ===========================================
                    LEFT SIDE - LIVE PREVIEW
            =========================================== */}

            <div className="col-lg-4">

                <div className="preview-card">

                    <div className="preview-header">

                        <h4>

                            Product Preview

                        </h4>

                        <span className="preview-status">

                            LIVE

                        </span>

                    </div>

                    <div className="preview-image-wrapper">

                        <div className="preview-overlay"></div>

                        {

                            imageMode === "url"

                            ?

                            (

                                jersey.images[0]

                                ?

                                (

                                    <img

                                        src={jersey.images[0]}

                                        alt="Jersey Preview"

                                        className="preview-image"

                                    />

                                )

                                :

                                (

                                    <div className="preview-placeholder">

                                        <i

                                            className="fa-regular fa-image preview-icon"

                                        ></i>

                                        <h4>

                                            Image Preview

                                        </h4>

                                        <p>

                                            Paste a jersey image URL

                                            <br />

                                            and preview it instantly.

                                        </p>

                                    </div>

                                )

                            )

                            :

                            (

                                selectedFiles[0]

                                ?

                                (

                                    <img
                                        src={URL.createObjectURL(selectedFiles[0])}
                                        alt="Upload Preview"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain",
                                            border: "4px solid red"
                                        }}
                                    />

                                )

                                :

                                (

                                    <div className="preview-placeholder">

                                        <i

                                            className="fa-regular fa-image preview-icon"

                                        ></i>

                                        <h4>

                                            Upload Preview

                                        </h4>

                                        <p>

                                            Select an image

                                            <br />

                                            from your computer.

                                        </p>

                                    </div>

                                )

                            )

                        }

                    </div>

                    <div className="preview-details">

                        <h4 className="preview-team">

                            {jersey.teamName || "Team Name"}

                        </h4>

                        <p className="preview-name">

                            {jersey.jerseyName || "Jersey Name"}

                        </p>

                        <div className="preview-badges">

                            <span className="badge category-badge">

                                {jersey.category || "Category"}

                            </span>

                            <span className="badge type-badge">

                                {
                                    productTypes.find(
                                        type => type._id === jersey.productType
                                    )?.typeName || "Product Type"
                                }

                            </span>

                            {

                                jersey.featured &&

                                <span className="badge featured-badge">

                                    ⭐ Featured

                                </span>

                            }

                        </div>

                        <div className="preview-price">

                            ₹ {Number(jersey.price || 0).toLocaleString("en-IN")}

                            <small>

                                Selling Price

                            </small>

                        </div>

                        <div className="preview-stock">

                            <span className="stock-pill">

                                📦 {jersey.stock || 0} In Stock

                            </span>

                        </div>

                        <div className="preview-meta">

                            <div>

                                <strong>Season</strong>

                                <span>

                                    {jersey.season || "2025-26"}

                                </span>

                            </div>

                            <div>

                                <strong>Sizes</strong>

                                <span>

                                    {jersey.sizes || "S,M,L"}

                                </span>

                            </div>

                        </div>

                        <hr className="preview-divider" />

                        <div className="text-center mb-3">

                            <span className="badge bg-primary">

                                {

                                    imageMode === "url"

                                    ?

                                    `${jersey.images.filter(img => img.trim() !== "").length} Images`

                                    :

                                    `${selectedFiles.filter(file => file).length} Images`

                                }

                            </span>

                        </div>

                        <div className="preview-footer">

                            Football Jersey Store

                        </div>

                    </div>

                </div>

            </div>
        {/* ===========================================
            RIGHT SIDE
        =========================================== */}

        <div className="col-lg-8">

           <div className="card add-section-card mb-4">

                <div className="card-body">

                    <h5 className="section-title">
                        Basic Information
                    </h5>

        
                        <div className="mb-3">
                            <label className="form-label">
                                Team Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) =>
                                    setJersey({
                                        ...jersey,
                                        teamName: e.target.value
                                    })
                                }
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Jersey Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) =>
                                    setJersey({
                                        ...jersey,
                                        jerseyName: e.target.value
                                    })
                                }
                            />
                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Category
                            </label>

                            <select
                                className="form-select"
                                onChange={(e) =>
                                    setJersey({
                                        ...jersey,
                                        category: e.target.value
                                    })
                                }
                            >
                                <option value="">
    Select Category
</option>

{

    categories.map((category) => (

        <option

            key={category._id}

            value={category.name}

        >

            {category.name}

        </option>

    ))

}
                            </select>

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Season
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="2025-26"
                                onChange={(e) =>
                                    setJersey({
                                        ...jersey,
                                        season: e.target.value
                                    })
                                }
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Product Type
                            </label>

                            <select
    className="form-select"
    value={jersey.productType}
    onChange={(e) =>
        setJersey({
            ...jersey,
            productType: e.target.value
        })
    }
>

    <option value="">
        Select Product Type
    </option>

    {

        productTypes.map((type) => (

            <option

                key={type._id}

                value={type._id}

            >

                {type.typeName}

            </option>

        ))

    }

</select>

                        </div>
                        <hr className="section-divider" />

                        <h5 className="section-title">
                            Inventory
                        </h5>
                        <div className="mb-3">

                            <label className="form-label">
                                Price
                            </label>

                            <input
                                type="number"
                                className="form-control"
                                onChange={(e) =>
                                    setJersey({
                                        ...jersey,
                                        price: e.target.value
                                    })
                                }
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Sizes (comma separated)
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="S,M,L,XL,XXL"
                                onChange={(e) =>
                                    setJersey({
                                        ...jersey,
                                        sizes: e.target.value
                                    })
                                }
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Stock
                            </label>

                            <input
                                type="number"
                                className="form-control"
                                onChange={(e) =>
                                    setJersey({
                                        ...jersey,
                                        stock: e.target.value
                                    })
                                }
                            />

                        </div>

{/* ===========================================
            PRODUCT IMAGES
=========================================== */}

<div className="mb-4">

    <label className="form-label fw-bold">

        Product Images

    </label>

    {/* ================= MODE SELECTION ================= */}

    <div className="image-mode-switch mb-4">

        <div className="btn-group" role="group">

            <input
                type="radio"
                className="btn-check"
                id="urlMode"
                checked={imageMode === "url"}
                onChange={() => {

                    setImageMode("url");

                    setSelectedFiles([null]);

                }}
            />

            <label
    className="image-mode-btn"
    htmlFor="urlMode"
>
                🔗 Image URLs
            </label>

            <input
                type="radio"
                className="btn-check"
                id="uploadMode"
                checked={imageMode === "upload"}
                onChange={() => {

                    setImageMode("upload");

                    setJersey({

                        ...jersey,

                        images:[""]

                    });

                }}
            />

           <label
    className="image-mode-btn"
    htmlFor="uploadMode"
>
                📤 Upload Images
            </label>

        </div>

    </div>

    {/* ================= URL MODE ================= */}

    {

        imageMode === "url" && (

            <>

                <div className="d-flex justify-content-between align-items-center mb-3">

                    <small className="image-counter">

                        {

                            jersey.images.filter(

                                img => img.trim() !== ""

                            ).length

                        } / 10 Images

                    </small>

                    {

                        jersey.images.length < 10 &&

                        <button

                            type="button"

                            className="btn add-image-btn"

                            onClick={addImageField}

                        >

                            <i className="fa-solid fa-plus me-2"></i>

                            Add Image

                        </button>

                    }

                </div>

                {

                    jersey.images.map((image,index)=>(

                        <div

                            key={index}

                            className="image-card mb-3"

                        >

                            <div className="card-body">

                                <div className="d-flex justify-content-between align-items-center mb-3">

                                    <h6 className="image-title">

                                        Image {index+1}

                                    </h6>

                                    {

                                        jersey.images.length>1 &&

                                        <button

                                            type="button"

                                            className="btn btn-danger btn-sm"

                                            onClick={()=>

                                                removeImageField(index)

                                            }

                                        >

                                            <i className="fa-solid fa-trash"></i>

                                        </button>

                                    }

                                </div>

                                <input

                                    type="text"

                                    className="form-control"

                                    placeholder="Paste Image URL..."

                                    value={image}

                                    onChange={(e)=>

                                        updateImage(

                                            index,

                                            e.target.value

                                        )

                                    }

                                />

                                {

                                    image &&

                                    <div className="text-center mt-3">

                                        <img

                                            src={image}

                                            alt={`Preview ${index+1}`}

                                            className="img-fluid rounded"

                                            style={{

                                                maxHeight:"180px",

                                                objectFit:"contain"

                                            }}

                                        />

                                    </div>

                                }

                            </div>

                        </div>

                    ))

                }

            </>

        )

    }

    {/* ================= UPLOAD MODE ================= */}

    {

        imageMode==="upload" && (

            <div className="image-card">

                <div className="card-body">

                    <h6 className="image-title mb-3">

                        Upload Product Images

                    </h6>

                    <div className="d-flex justify-content-between align-items-center mb-3">

                        <small className="image-counter">

                            {

                                selectedFiles.filter(

                                    file=>file

                                ).length

                            } / 10 Images

                        </small>

                        {

                            selectedFiles.length<10 &&

                            <button

                                type="button"

                                className="btn add-image-btn"

                                onClick={()=>

                                    setSelectedFiles([

                                        ...selectedFiles,

                                        null

                                    ])

                                }

                            >

                                <i className="fa-solid fa-plus me-2"></i>

                                Add Upload

                            </button>

                        }

                    </div>

{

    selectedFiles.map((file,index)=>(

        <div

            key={index}

            className="card mb-3 shadow-sm"

        >

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-center mb-3">

                    <h6>

                        Image {index+1}

                    </h6>

                    {

                        selectedFiles.length>1 &&

                        <button

                            type="button"

                            className="btn btn-danger btn-sm"

                            onClick={()=>{

                                const updated=[...selectedFiles];

                                updated.splice(index,1);

                                setSelectedFiles(updated);

                            }}

                        >

                            <i className="fa-solid fa-trash"></i>

                        </button>

                    }

                </div>

                <input

                    type="file"

                    accept="image/*"

                    className="form-control"

                    onChange={(e)=>{

                        const updated=[...selectedFiles];

                        updated[index]=e.target.files[0];

                        setSelectedFiles(updated);

                    }}

                />

                {

                    file &&

                    <div className="text-center mt-3">

                        <img

                            src={URL.createObjectURL(file)}

                            alt="preview"

                            className="img-fluid rounded border"

                            style={{

                                maxHeight:"180px",

                                objectFit:"contain"

                            }}

                        />

                    </div>

                }

            </div>

        </div>

    ))

}

                    

                </div>

            </div>

        )

    }



</div>

                        <div className="mb-3">

                            <label className="form-label">
                                Description
                            </label>

                            <textarea
                                className="form-control"
                                rows="3"
                                onChange={(e) =>
                                    setJersey({
                                        ...jersey,
                                        description: e.target.value
                                    })
                                }
                            />

                        </div>

                        <div className="form-check mb-3">

                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={Boolean(jersey.featured)}
                                onChange={(e) =>
                                    setJersey({
                                        ...jersey,
                                        featured: e.target.checked
                                    })
                                }
                            />

                            <label
                                className="form-check-label"
                                htmlFor="featured"
                            >
                                Display on Homepage (Featured Jersey)
                            </label>

                        </div>

                    <div className="d-flex justify-content-end gap-3 mt-5">

                    <button
                        type="button"
                        className="btn btn-outline-secondary px-4"
                        onClick={() => navigate(-1)}
                    >
                        <i className="fa-solid fa-arrow-left me-2"></i>

                        Cancel
                    </button>

                    <button

    type="submit"

    className="btn btn-success px-5"

    disabled={uploading}

>

    {

        uploading

        ?

        <>

            <span className="spinner-border spinner-border-sm me-2"></span>

            Uploading...

        </>

        :

        <>

            <i className="fa-solid fa-floppy-disk me-2"></i>

            Add Jersey

        </>

    }

</button>
                </div>
                </div> {/* card-body */}
            </div> {/* card */}
        </div> {/* col-lg-8 */}

    </div> {/* row */}
</form>

                </div>

            </div>

        </div>
    )
}

export default AddJersey