const ProductType = require("../model/productTypeModel");
const Notification = require("../model/Notification");

/* ==========================================
            GET ALL PRODUCT TYPES
========================================== */

const getProductTypes = async (req, res) => {

    try {

        const productTypes = await ProductType
            .find()
            .sort({ typeName: 1 });

        res.status(200).json(productTypes);

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

/* ==========================================
            ADD PRODUCT TYPE
========================================== */

const addProductType = async (req, res) => {

    try {

        const { typeName, description } = req.body;

        if (!typeName) {

            return res.status(400).json({

                message: "Product Type Name is required."

            });

        }

        const exists = await ProductType.findOne({

            typeName: typeName.trim()

        });

        if (exists) {

            return res.status(400).json({

                message: "Product Type already exists."

            });

        }

        const productType = await ProductType.create({

            typeName: typeName.trim(),

            description

        });

        await Notification.create({

            title: "Product Type Added",

            message: `${productType.typeName} has been added.`,

            type: "productType"

        });

        res.status(201).json(productType);

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

/* ==========================================
            UPDATE PRODUCT TYPE
========================================== */

const updateProductType = async (req, res) => {

    try {

        const productType = await ProductType.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true

            }

        );

        if (!productType) {

            return res.status(404).json({

                message: "Product Type not found."

            });

        }

        await Notification.create({

            title: "Product Type Updated",

            message: `${productType.typeName} has been updated.`,

            type: "productType"

        });

        res.status(200).json(productType);

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

/* ==========================================
            DELETE PRODUCT TYPE
========================================== */

const deleteProductType = async (req, res) => {

    try {

        const productType = await ProductType.findByIdAndDelete(

            req.params.id

        );

        if (!productType) {

            return res.status(404).json({

                message: "Product Type not found."

            });

        }

        await Notification.create({

            title: "Product Type Deleted",

            message: `${productType.typeName} has been deleted.`,

            type: "productType"

        });

        res.status(200).json({

            message: "Product Type deleted successfully."

        });

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

/* ==========================================
            TOGGLE STATUS
========================================== */

const toggleProductTypeStatus = async (req, res) => {

    try {

        const productType = await ProductType.findById(

            req.params.id

        );

        if (!productType) {

            return res.status(404).json({

                message: "Product Type not found."

            });

        }

        productType.status = !productType.status;

        await productType.save();

        await Notification.create({

            title: "Product Type Status Changed",

            message: `${productType.typeName} is now ${
                productType.status ? "Active" : "Inactive"
            }.`,
            type: "productType"

        });

        res.status(200).json(productType);

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

module.exports = {

    getProductTypes,

    addProductType,

    updateProductType,

    deleteProductType,

    toggleProductTypeStatus

};