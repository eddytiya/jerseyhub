import React, { useEffect, useState } from 'react'
import axios from 'axios'
import API_URL from "../utils/api";
import { useNavigate, useParams } from 'react-router-dom'
import {

    showSuccess,

    showError

} from '../utils/toastUtils'
const EditCategory = () => {

    const [category, setCategory] = useState({
        name: '',
        imageUrl: '',
        description: ''
    })

    const { id } = useParams()

    const navigate = useNavigate()

    useEffect(() => {

        axios.get(
            `${API_URL}/category`
        )
        .then((resp) => {

            const foundCategory =
                resp.data.find(
                    cat => cat._id === id
                )

            if (foundCategory) {
                setCategory(foundCategory)
            }

        })
        .catch((err)=>{

            console.log(err)

            showError(

                err.response?.data?.message ||

                "Failed To Update Category"

            )

        })

    }, [id])

    const handleChange = (e) => {

        setCategory({
            ...category,
            [e.target.name]:
                e.target.value
        })

    }

    const handleSubmit = (e) => {

        e.preventDefault()

        axios.put(
            `${API_URL}/category/update/${id}`,
            category
        )
        .then(() => {

            showSuccess("Category Updated Successfully")

            navigate(
                '/manage-categories'
            )

        })
        .catch((err) =>
            console.log(err)
        )

    }

    return (

        <div className="container mt-4">

            <h2 className="text-center mb-4">
                Edit Category
            </h2>

            <form
                onSubmit={handleSubmit}
            >

                <div className="mb-3">

                    <label>
                        Category Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={category.name}
                        onChange={handleChange}
                    />

                </div>

                <div className="mb-3">

                    <label>
                        Image URL
                    </label>

                    <input
                        type="text"
                        name="imageUrl"
                        className="form-control"
                        value={category.imageUrl}
                        onChange={handleChange}
                    />

                </div>

                <div className="mb-3">

                    <label>
                        Description
                    </label>

                    <textarea
                        name="description"
                        className="form-control"
                        rows="4"
                        value={category.description}
                        onChange={handleChange}
                    />

                </div>

                <button
                    className="btn btn-primary"
                    type="submit"
                >
                    Update Category
                </button>

            </form>

        </div>

    )

}

export default EditCategory