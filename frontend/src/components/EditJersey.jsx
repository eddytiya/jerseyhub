import React, {

    useState,

    useEffect

} from "react";

import axios from "axios";
import API_URL from "../utils/api";
import { useNavigate, useParams } from "react-router-dom";

import { uploadImageToCloudinary } from "../utils/cloudinary";

import {

    showSuccess,

    showError

} from "../utils/toastUtils";

import "./EditJersey.css";

const EditJersey = () => {

/* ==========================================
            STATES
========================================== */

const navigate = useNavigate();

const { id } = useParams();

const [categories, setCategories] = useState([]);
const [productTypes, setProductTypes] = useState([]);

const [imageMode, setImageMode] = useState("url");

const [selectedFiles, setSelectedFiles] = useState([null]);

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

/* ==========================================
        LOAD CATEGORIES + JERSEY
========================================== */

useEffect(() => {

    const loadData = async () => {

        try {

            const [

    jerseyResp,

    categoryResp,

    productTypeResp

] = await Promise.all([

    axios.get(
        `${API_URL}/jersey/show/${id}`
    ),

    axios.get(
        `${API_URL}/category`
    ),

    axios.get(
        axios.get(
    `${API_URL}/product-type`
)
    )

]);

            const data = jerseyResp.data;

            console.log("Loaded Jersey:", data);

            setCategories(categoryResp.data);
            setProductTypes(productTypeResp.data);

            setJersey({

                ...data,

                teamName: data.teamName || "",

                jerseyName: data.jerseyName || "",

                category: data.category || "",

                season: data.season || "",

                productType: data.productType?._id || "",

                price: data.price || "",

                stock: data.stock || "",

                description: data.description || "",

                featured: Boolean(data.featured),

                sizes: Array.isArray(data.sizes)
                    ? data.sizes.join(",")
                    : (data.sizes || ""),

                images:

                    Array.isArray(data.images) && data.images.length > 0

                        ? data.images

                        : data.imageUrl

                            ? [data.imageUrl]

                            : [""]

            });

        }

        catch (err) {

            console.log(err);

            showError("Failed To Load Jersey");

        }

    };

    loadData();

}, [id]);


/* ==========================================
        IMAGE FUNCTIONS
========================================== */

const addImageField = () => {

    if (jersey.images.length >= 10) return;

    setJersey({

        ...jersey,

        images:[

            ...jersey.images,

            ""

        ]

    });

};

const removeImageField = (index) => {

    if (jersey.images.length === 1) return;

    const updated = jersey.images.filter(

        (_,i)=>i!==index

    );

    setJersey({

        ...jersey,

        images:updated

    });

};

const updateImage = (index,value)=>{

    const updated=[...jersey.images];

    updated[index]=value;

    setJersey({

        ...jersey,

        images:updated

    });

};

/* ==========================================
        MOVE IMAGE UP
========================================== */

const moveImageUp=(index)=>{

    if(index===0)return;

    const updated=[...jersey.images];

    [

        updated[index-1],

        updated[index]

    ]=[

        updated[index],

        updated[index-1]

    ];

    setJersey({

        ...jersey,

        images:updated

    });

};

/* ==========================================
        MOVE IMAGE DOWN
========================================== */

const moveImageDown=(index)=>{

    if(index===jersey.images.length-1)return;

    const updated=[...jersey.images];

    [

        updated[index],

        updated[index+1]

    ]=[

        updated[index+1],

        updated[index]

    ];

    setJersey({

        ...jersey,

        images:updated

    });

};

/* ==========================================
            UPDATE JERSEY
========================================== */

const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        let images = [];

        /* ======================================
                URL MODE
        ====================================== */

        if (imageMode === "url") {

            images = jersey.images.filter(

                img => img.trim() !== ""

            );

        }

        /* ======================================
                UPLOAD MODE
        ====================================== */

        else {

            const validFiles = selectedFiles.filter(

                file => file

            );

            if (validFiles.length === 0) {

                showError(

                    "Please select at least one image."

                );

                return;

            }

            for (const file of validFiles) {

                const imageUrl =

                    await uploadImageToCloudinary(file);

                images.push(imageUrl);

            }

        }

        if (images.length === 0) {

            showError(

                "Please add at least one image."

            );

            return;

        }

        if (images.length > 10) {

            showError(

                "Maximum 10 images allowed."

            );

            return;

        }

        const jerseyData = {

            ...jersey,

            images,

            price: Number(jersey.price),

            stock: Number(jersey.stock),

            featured: Boolean(jersey.featured),

            sizes: Array.isArray(jersey.sizes)

                ?

                jersey.sizes

                :

                jersey.sizes

                    .split(",")

                    .map(size => size.trim().toUpperCase())

                    .filter(Boolean)

        };

        const token =

            localStorage.getItem("token");

        await axios.put(

            `${API_URL}/jersey/${id}`,

            jerseyData,

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        showSuccess(

            "Jersey Updated Successfully ⚽"

        );

        navigate(

            "/manage-jerseys"

        );

    }

    catch (err) {

        console.log(err);

        showError(

            err.response?.data?.message ||

            "Failed To Update Jersey"

        );

    }

};

/* ==========================================
        UPLOAD HELPERS
========================================== */

const addUploadField=()=>{

    if(selectedFiles.length>=10)return;

    setSelectedFiles([

        ...selectedFiles,

        null

    ]);

};

const removeUploadField=(index)=>{

    if(selectedFiles.length===1)return;

    const updated=[...selectedFiles];

    updated.splice(index,1);

    setSelectedFiles(updated);

};

const updateUpload=(index,file)=>{

    const updated=[...selectedFiles];

    updated[index]=file;

    setSelectedFiles(updated);

};

 return (

<div className="container edit-jersey-page py-4">

<div className="edit-jersey-card">

<div className="card-body">

<div className="edit-page-title">

<h2>

Edit Jersey

</h2>

<p>

Update football jersey details and product images.

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

imageMode==="url"

?

(

jersey.images[0]

?

(

<img

src={jersey.images[0]}

alt="Preview"

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

<br/>

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

Upload Preview

</h4>

<p>

Select an image

<br/>

from your computer.

</p>

</div>

)

)

}

</div>

<div className="preview-details">

<h4 className="preview-team">

{

jersey.teamName ||

"Team Name"

}

</h4>

<p className="preview-name">

{

jersey.jerseyName ||

"Jersey Name"

}

</p>

<div className="preview-badges">

<span className="badge category-badge">

{

jersey.category ||

"Category"

}

</span>

<span className="badge type-badge">

{

productTypes.find(

    type =>

        type._id === jersey.productType

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

₹ {Number(jersey.price||0).toLocaleString("en-IN")}

<small>

Selling Price

</small>

</div>

<div className="preview-stock">

<span className="stock-pill">

📦 {jersey.stock||0} In Stock

</span>

</div>

<div className="preview-meta">

<div>

<strong>

Season

</strong>

<span>

{

jersey.season ||

"2025-26"

}

</span>

</div>

<div>

<strong>

Sizes

</strong>

<span>

{

Array.isArray(jersey.sizes)

?

jersey.sizes.join(",")

:

jersey.sizes ||

"S,M,L"

}

</span>

</div>

</div>

<hr className="preview-divider"/>

<div className="text-center mb-3">

<span className="category-badge">

{

imageMode==="url"

?

`${jersey.images.filter(img=>img.trim()!=="").length} Images`

:

`${selectedFiles.filter(file=>file).length} Images`

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

<div className="edit-section-card">

<div className="card-body">

<h5 className="edit-section-title">

Basic Information

</h5>

<div className="mb-3">

    <label className="form-label">

        Team Name

    </label>

    <input

        type="text"

        className="form-control"

        value={jersey.teamName}

        onChange={(e)=>

            setJersey({

                ...jersey,

                teamName:e.target.value

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

        value={jersey.jerseyName}

        onChange={(e)=>

            setJersey({

                ...jersey,

                jerseyName:e.target.value

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

        value={jersey.category}

        onChange={(e)=>

            setJersey({

                ...jersey,

                category:e.target.value

            })

        }

    >

        <option value="">

            Select Category

        </option>

        {

            categories.map(category=>(

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

        value={jersey.season}

        onChange={(e)=>

            setJersey({

                ...jersey,

                season:e.target.value

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

    onChange={(e)=>

        setJersey({

            ...jersey,

            productType:e.target.value

        })

    }

>

    <option value="">

        Select Product Type

    </option>

    {

        productTypes.map(type=>(

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

<hr className="edit-divider"/>

<h5 className="edit-section-title">

    Inventory

</h5>

<div className="mb-3">

    <label className="form-label">

        Price

    </label>

    <input

        type="number"

        className="form-control"

        value={jersey.price}

        onChange={(e)=>

            setJersey({

                ...jersey,

                price:e.target.value

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

        placeholder="S,M,L,XL"

        value={

            Array.isArray(jersey.sizes)

            ?

            jersey.sizes.join(",")

            :

            jersey.sizes

        }

        onChange={(e)=>

            setJersey({

                ...jersey,

                sizes:e.target.value

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

        value={jersey.stock}

        onChange={(e)=>

            setJersey({

                ...jersey,

                stock:e.target.value

            })

        }

    />

</div>

<hr className="edit-divider"/>

<h5 className="edit-section-title">

    Product Images

</h5>

{/* ===========================================
            PRODUCT IMAGES
=========================================== */}

<div className="mb-4">

    {/* ================= MODE ================= */}

    <div className="mb-3">

        <div className="btn-group">

            <input
                type="radio"
                className="btn-check"
                id="urlMode"
                checked={imageMode==="url"}
                onChange={()=>{
                    setImageMode("url");
                    setSelectedFiles([null]);
                }}
            />

            <label
                htmlFor="urlMode"
                className="image-mode-btn"
            >
                🔗 Image URLs
            </label>

            <input
                type="radio"
                className="btn-check"
                id="uploadMode"
                checked={imageMode==="upload"}
                onChange={()=>{
                    setImageMode("upload");
                }}
            />

            <label
                htmlFor="uploadMode"
                className="image-mode-btn"
            >
                📤 Upload Images
            </label>

        </div>

    </div>

    {/* ======================================
                URL MODE
    ====================================== */}

    {

        imageMode==="url" &&

        <>

            <div className="d-flex justify-content-between align-items-center mb-3">

                <small className="image-counter">

                    {

                        jersey.images.filter(

                            img=>img.trim()!==''

                        ).length

                    } / 10 Images

                </small>

                {

                    jersey.images.length<10 &&

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

                                <div className="d-flex gap-2">

                                    {

                                        index>0 &&

                                        <button

                                            type="button"

                                            className="btn btn-secondary btn-sm"

                                            onClick={()=>moveImageUp(index)}

                                        >

                                            <i className="fa-solid fa-arrow-up"></i>

                                        </button>

                                    }

                                    {

                                        index<jersey.images.length-1 &&

                                        <button

                                            type="button"

                                            className="btn btn-secondary btn-sm"

                                            onClick={()=>moveImageDown(index)}

                                        >

                                            <i className="fa-solid fa-arrow-down"></i>

                                        </button>

                                    }

                                    {

                                        jersey.images.length>1 &&

                                        <button

                                            type="button"

                                            className="btn btn-danger btn-sm"

                                            onClick={()=>removeImageField(index)}

                                        >

                                            <i className="fa-solid fa-trash"></i>

                                        </button>

                                    }

                                </div>

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

                                        alt="preview"

                                        className="preview-upload-image img-fluid rounded"

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

    }

    {/* ======================================
                UPLOAD MODE
    ====================================== */}

    {

        imageMode==="upload" &&

        <div className="image-card">

            <div className="card-body">

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

                            onClick={addUploadField}

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

                            className="image-card mb-3"

                        >

                            <div className="card-body">

                                <div className="d-flex justify-content-between align-items-center mb-3">

                                    <h6 className="image-title">

                                        Upload {index+1}

                                    </h6>

                                    {

                                        selectedFiles.length>1 &&

                                        <button

                                            type="button"

                                            className="btn btn-danger btn-sm"

                                            onClick={()=>removeUploadField(index)}

                                        >

                                            <i className="fa-solid fa-trash"></i>

                                        </button>

                                    }

                                </div>

                                <input

                                    type="file"

                                    accept="image/*"

                                    className="form-control"

                                    onChange={(e)=>

                                        updateUpload(

                                            index,

                                            e.target.files[0]

                                        )

                                    }

                                />

                                {

                                    file &&

                                    <div className="text-center mt-3">

                                        <img

                                            src={URL.createObjectURL(file)}

                                            alt="preview"

                                            className="preview-upload-image img-fluid rounded"

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

    }

</div>

<hr className="edit-divider"/>

<h5 className="edit-section-title">

    Description

</h5>



<div className="mb-3">

    <label className="form-label">

        Description

    </label>

    <textarea

        className="form-control"

        rows="4"

        value={jersey.description}

        onChange={(e)=>

            setJersey({

                ...jersey,

                description:e.target.value

            })

        }

    />

</div>

<div className="form-check mb-4">

    <input

        className="form-check-input"

        type="checkbox"

        id="featured"

        checked={Boolean(jersey.featured)}

        onChange={(e)=>

            setJersey({

                ...jersey,

                featured:e.target.checked

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

{/* ==========================================
            ACTION BUTTONS
========================================== */}

<div className="edit-button-row">

    <button

        type="button"

        className="cancel-btn"

        onClick={()=>navigate(-1)}

    >

        <i className="fa-solid fa-arrow-left me-2"></i>

        Cancel

    </button>

    <button

        type="submit"

        className="update-jersey-btn"

    >

        <i className="fa-solid fa-floppy-disk me-2"></i>

        Update Jersey

    </button>

</div>

</div> {/* card-body */}
</div> {/* edit-section-card */}
</div> {/* col-lg-8 */}
</div> {/* row */}
</form>
</div>
</div>
</div>

);

};

export default EditJersey;