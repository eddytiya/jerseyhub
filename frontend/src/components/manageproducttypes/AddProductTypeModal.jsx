import React, { useState } from "react";

import axios from "axios";

import { FaPlus } from "react-icons/fa";
import API_URL from "../../utils/api";
import { MdClose } from "react-icons/md";

import "./AddProductTypeModal.css";

const AddProductTypeModal = ({

    isOpen,

    onClose,

    onSuccess

}) => {

    const [form,setForm]=useState({

        typeName:"",

        description:""

    });

    const [loading,setLoading]=useState(false);

    if(!isOpen) return null;

    const handleChange=(e)=>{

        setForm({

            ...form,

            [e.target.name]:e.target.value

        });

    };

    const handleSubmit=async()=>{

        if(!form.typeName.trim()){

            alert("Please enter product type.");

            return;

        }

        try{

            setLoading(true);

           await axios.post(

                `${API_URL}/product-type/add`,

                form,

                {
                    headers: {
                        Authorization:
                        `Bearer ${localStorage.getItem("adminToken")}`
                    }
                }

            );

            setForm({

                typeName:"",

                description:""

            });

            onSuccess();

            onClose();

        }

        catch(err){

            alert(

                err.response?.data?.message ||

                "Unable to add product type."

            );

        }

        finally{

            setLoading(false);

        }

    };

    return(

        <div className="product-type-modal-overlay">

            <div className="product-type-modal">

                <div className="product-type-modal-header">

                    <h2>

                        <FaPlus/>

                        Add Product Type

                    </h2>

                    <button

                        onClick={onClose}

                    >

                        <MdClose/>

                    </button>

                </div>

                <div className="product-type-modal-body">

                    <label>

                        Product Type

                    </label>

                    <input

                        name="typeName"

                        value={form.typeName}

                        onChange={handleChange}

                        placeholder="Example : Boots"

                    />

                    <label>

                        Description

                    </label>

                    <textarea

                        rows="4"

                        name="description"

                        value={form.description}

                        onChange={handleChange}

                        placeholder="Write a short description..."

                    />

                </div>

                <div className="product-type-modal-footer">

                    <button

                        className="cancel-btn"

                        onClick={onClose}

                    >

                        Cancel

                    </button>

                    <button

                        className="save-btn"

                        onClick={handleSubmit}

                        disabled={loading}

                    >

                        {

                            loading

                            ?

                            "Saving..."

                            :

                            "Save Product Type"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

};

export default AddProductTypeModal;