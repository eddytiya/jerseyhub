const Product = require("../model/ProductModel");
const mongoose = require("mongoose");
const { publicCatalogFilter, normalizePublishingInput, ensureUniqueSlug } = require("../services/catalogPublishing");

/* ==========================================
            GET ALL PRODUCTS
========================================== */

const getProducts = async (req, res) => {

    try {

        const page = Math.max(1, parseInt(req.query.page) || 1);

        const limit = Math.min(100, parseInt(req.query.limit) || 50);

        const [products, total] = await Promise.all([

            Product.find(publicCatalogFilter())

                .sort({ createdAt: -1 })

                .skip((page - 1) * limit)

                .limit(limit),

            Product.countDocuments(publicCatalogFilter())

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

        const lookup = mongoose.Types.ObjectId.isValid(req.params.id) ? { _id: req.params.id } : { slug: req.params.id };
        const product = await Product.findOne(publicCatalogFilter(lookup));

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

        const product = new Product(normalizePublishingInput(req.body));
        await product.validate();
        product.slug = await ensureUniqueSlug(Product, product.slug);
        await product.save();

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

            normalizePublishingInput(req.body),

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
