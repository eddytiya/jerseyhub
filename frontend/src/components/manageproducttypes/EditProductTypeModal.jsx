import React, { useEffect, useState } from "react";

import axios from "axios";
import API_URL from "../../utils/api";
import { FaEdit } from "react-icons/fa";

import { MdClose } from "react-icons/md";

import "./EditProductTypeModal.css";

const EditProductTypeModal = ({

    isOpen,

    productType,

    onClose,

    onSuccess

}) => {

    const [form,setForm]=useState({

        typeName:"",

        description:""

    });

    const [loading,setLoading]=useState(false);

    useEffect(()=>{

        if(productType){

            setForm({

                typeName:productType.typeName,

                description:productType.description || ""

            });

        }

    },[productType]);

    if(!isOpen) return null;

    const handleChange=(e)=>{

        setForm({

            ...form,

            [e.target.name]:e.target.value

        });

    };

    const handleSubmit=async()=>{

        if(!form.typeName.trim()){

            alert("Please enter Product Type.");

            return;

        }

        try{

            setLoading(true);

            await axios.put(

                `${API_URL}/product-type/update/${productType._id}`,

                form,

                {

                    headers:{

                        Authorization:

                        `Bearer ${localStorage.getItem("adminToken")}`

                    }

                }

            );

            onSuccess();

            onClose();

        }

        catch(err){

            alert(

                err.response?.data?.message ||

                "Unable to update Product Type."

            );

        }

        finally{

            setLoading(false);

        }

    };

    return(

        <div className="edit-type-overlay">

            <div className="edit-type-modal slide-up">

                <div className="edit-type-header">

                    <h2>

                        <FaEdit/>

                        Edit Product Type

                    </h2>

                    <button onClick={onClose}>

                        <MdClose/>

                    </button>

                </div>

                <div className="edit-type-body">

                    <label>

                        Product Type

                    </label>

                    <input

                        className="app-input"

                        name="typeName"

                        value={form.typeName}

                        onChange={handleChange}

                    />

                    <label>

                        Description

                    </label>

                    <textarea

                        className="app-textarea"

                        rows="4"

                        name="description"

                        value={form.description}

                        onChange={handleChange}

                    />

                </div>

                <div className="edit-type-footer">

                    <button

                        className="app-btn btn-outline-custom"

                        onClick={onClose}

                    >

                        Cancel

                    </button>

                    <button

                        className="app-btn btn-primary-custom"

                        onClick={handleSubmit}

                        disabled={loading}

                    >

                        {

                            loading

                            ?

                            "Updating..."

                            :

                            "Update Product Type"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

};

export default EditProductTypeModal;