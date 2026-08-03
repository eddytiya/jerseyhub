const Product = require("../model/ProductModel");

/* ==========================================
            GET ALL PRODUCTS
========================================== */

const getProducts = async (req, res) => {

    try {

        const page = Math.max(1, parseInt(req.query.page) || 1);

        const limit = Math.min(100, parseInt(req.query.limit) || 50);

        const [products, total] = await Promise.all([

            Product.find()

                .sort({ createdAt: -1 })

                .skip((page - 1) * limit)

                .limit(limit),

            Product.countDocuments()

        ]);

        res.json({

            products,

            total,

            page,

            totalPages: Math.ceil(total / limit)

        });

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

/* ==========================================
            GET SINGLE PRODUCT
========================================== */

const getProduct = async (req, res) => {

    try {

        const product = await Product.findById(

            req.params.id

        );

        if (!product) {

            return res.status(404).json({

                message: "Product not found"

            });

        }

        res.json(product);

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

/* ==========================================
            ADD PRODUCT
========================================== */

const addProduct = async (req, res) => {

    try {

        const product = await Product.create(req.body);

        res.status(201).json(product);

    }

    catch (err) {

        res.status(400).json({

            message: err.message

        });

    }

};

/* ==========================================
            UPDATE PRODUCT
========================================== */

const updateProduct = async (req, res) => {

    try {

        const product = await Product.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true,

                runValidators: true

            }

        );

        res.json(product);

    }

    catch (err) {

        res.status(400).json({

            message: err.message

        });

    }

};

/* ==========================================
            DELETE PRODUCT
========================================== */

const deleteProduct = async (req, res) => {

    try {

        await Product.findByIdAndDelete(

            req.params.id

        );

        res.json({

            message: "Product Deleted"

        });

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

module.exports = {

    getProducts,

    getProduct,

    addProduct,

    updateProduct,

    deleteProduct

};