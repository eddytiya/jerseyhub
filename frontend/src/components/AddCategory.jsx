import React, { useState } from 'react'
import axios from 'axios'
import API_URL from "../utils/api";
import { useNavigate } from 'react-router-dom'
import {

    showSuccess,

    showError

} from '../utils/toastUtils'

const AddCategory = () => {

    const [category, setCategory] = useState({

        name: '',

        imageUrl: '',

        description: ''

    })

    const navigate = useNavigate()

    const handleSubmit = (e) => {

        e.preventDefault()

        axios.post(

    `${API_URL}/category/add`,

    category

)

        .then(() => {

            showSuccess("Category Added Successfully")

            navigate('/manage-categories')

        })

        .catch((err) => {

            console.log(err)

            showError(

                err.response?.data?.message ||

                "Failed To Add Category"

            )

        })

    }

    return (

        <div className="container mt-4">

            <h2 className="text-center mb-4">

                Add Category

            </h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">

                    <label>

                        Category Name

                    </label>

                    <input

                        type="text"

                        className="form-control"

                        value={category.name}

                        onChange={(e) =>

                            setCategory({

                                ...category,

                                name: e.target.value

                            })

                        }

                    />

                </div>

                <div className="mb-3">

                    <label>

                        Image URL

                    </label>

                    <input

                        type="text"

                        className="form-control"

                        value={category.imageUrl}

                        onChange={(e) =>

                            setCategory({

                                ...category,

                                imageUrl: e.target.value

                            })

                        }

                    />

                </div>

                <hr className="section-divider" />

                <h5 className="section-title">

                    Description

                </h5>

                <div className="mb-3">

                    <label>

                        Description

                    </label>

                    <textarea

                        className="form-control"

                        rows="3"

                        value={category.description}

                        onChange={(e) =>

                            setCategory({

                                ...category,

                                description: e.target.value

                            })

                        }

                    />

                </div>

                <button className="btn btn-success add-jersey-btn">

                    Add Category

                </button>

            </form>

        </div>

    )

}

export default AddCategory