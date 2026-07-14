import axios from "axios";

const uploadImageToCloudinary = async (file) => {

    const formData = new FormData();

    formData.append(

        "file",

        file

    );

    formData.append(

        "upload_preset",

        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

    );

    try {

        const response = await fetch(

            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,

            {

                method: "POST",

                body: formData

            }

        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(

                data.error?.message ||

                "Cloudinary Upload Failed"

            );

        }

        return data.secure_url;

    }

    catch (err) {

        console.log(err);

        throw err;

    }

};

export default uploadImageToCloudinary;