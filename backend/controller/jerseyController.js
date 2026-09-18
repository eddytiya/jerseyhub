const mongoose = require("mongoose");
const Jersey = require("../model/jerseyModel");
const Fuse = require('fuse.js')
const Notification = require('../model/Notification')
const Category = require("../model/categoryModel");
const ProductType = require("../model/ProductTypeModel");
const StockAlert = require("../model/StockAlert");
const sendEmail = require("../utils/sendEmail");
const { publicCatalogFilter, normalizePublishingInput, ensureUniqueSlug } = require("../services/catalogPublishing");

/* ==========================================
        NOTIFY BACK-IN-STOCK SUBSCRIBERS
========================================== */

const notifyBackInStock = async (jersey) => {

    try {

        const alerts = await StockAlert.find({ jerseyId: jersey._id });

        if (!alerts.length) return;

        for (const alert of alerts) {

            try {

                await sendEmail({

                    to: alert.email,

                    subject: `⚽ Back In Stock - ${jersey.teamName} ${jersey.jerseyName}`,

                    html: `
<div style="margin:0;padding:40px;background:#f3f4f6;font-family:Arial,sans-serif;">
    <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.12);">
        <div style="background:linear-gradient(135deg,#2563eb,#1d4ed8);padding:35px;text-align:center;">
            <h1 style="margin:0;color:white;font-size:30px;">⚽ JerseyHub</h1>
        </div>
        <div style="padding:40px;">
            <h2 style="margin-top:0;color:#111827;">Good News! It's Back 🎉</h2>
            <p style="font-size:16px;color:#4b5563;line-height:26px;">
                <strong>${jersey.teamName} - ${jersey.jerseyName}</strong> is back in stock. Grab it before it sells out again.
            </p>
            <div style="text-align:center;margin-top:30px;">
                <a href="${process.env.FRONTEND_URL}/jersey/${jersey._id}" style="background:#2563eb;color:white;text-decoration:none;padding:15px 35px;border-radius:10px;font-weight:bold;display:inline-block;">Shop Now</a>
            </div>
        </div>
    </div>
</div>`

                });

            }

            catch (err) {

                console.log("Stock Alert Email Error:", err.message);

            }

        }

        await StockAlert.deleteMany({ jerseyId: jersey._id });

    }

    catch (err) {

        console.log("notifyBackInStock Error:", err.message);

    }

};

// Add Jersey
const addJersey = async (req, res) => {

    try {

        console.log("BODY:", req.body);

        const jerseyData = normalizePublishingInput(req.body);

        /* ==========================
                Images Support
        ========================== */

        if (

            jerseyData.images &&

            jerseyData.images.length > 0

        ) {

            jerseyData.imageUrl =

                jerseyData.images[0];

        }

        const jersey = new Jersey(jerseyData);
        await jersey.validate();
        jersey.slug = await ensureUniqueSlug(Jersey, jersey.slug);

        const result = await jersey.save();

        await Notification.create({

            title: "New Jersey Added",

            message: `${result.teamName} - ${result.jerseyName} has been added.`,

            type: "jersey"

        });

        res.status(201).json(result);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: err.message,

            errors: err.errors

        });

    }

};

// Get Jerseys By IDs (Batch — Used For "Recently Viewed")
const getJerseysByIds = async (req, res) => {
    try {
        const ids = (req.query.ids || "")
            .split(",")
            .map(id => id.trim())
            .filter(id => mongoose.Types.ObjectId.isValid(id));

        if (!ids.length) {
            return res.status(200).json([]);
        }

        const jerseys = await Jersey.find(publicCatalogFilter({ _id: { $in: ids } }))
            .populate("productType");

        return res.status(200).json(jerseys);

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

// Get All Jerseys
const getAllJerseys = async (req, res) => {
    try {
        const jerseys = await Jersey.find(publicCatalogFilter())
            .populate("productType");

        // Always return an array.
        // If there are no jerseys, Jersey.find() already returns [].
        return res.status(200).json(jerseys);

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

// Get Single Jersey
const getJerseyById = async (req, res) => {
    try {
        const identifier = req.params.identifier || req.params.id;
        const lookup = mongoose.Types.ObjectId.isValid(identifier) ? { _id: identifier } : { slug: identifier };
        const jersey = await Jersey.findOne(publicCatalogFilter(lookup)).populate("productType");

        if (jersey) {
            res.status(200).json(jersey);
        } else {
            res.status(404).json({ message: "Jersey not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Update Jersey
const updateJersey = async (req, res) => {

    try {

        const jerseyData = normalizePublishingInput(req.body);

/* ==========================
        Images Support
========================== */

if (

    jerseyData.images &&

    jerseyData.images.length > 0

) {

    jerseyData.imageUrl =

        jerseyData.images[0];

}

const previousJersey = await Jersey.findById(req.params.id);

const pending = new Jersey({ ...previousJersey?.toObject(), ...jerseyData, _id: previousJersey?._id });
await pending.validate();
if (jerseyData.slug || !previousJersey?.slug) {
    jerseyData.slug = await ensureUniqueSlug(Jersey, pending.slug, req.params.id);
}

const jersey = await Jersey.findByIdAndUpdate(

    req.params.id,

    jerseyData,

    {

        new:true,
        runValidators:true

    }

);

        if (jersey) {

            // Create Notification
            await Notification.create({

                title: "Jersey Updated",

                message: `${jersey.teamName} - ${jersey.jerseyName} has been updated.`,

                type: "jersey"

            });

            if (

                previousJersey &&

                previousJersey.stock <= 0 &&

                jersey.stock > 0

            ) {

                notifyBackInStock(jersey);

            }

            res.status(200).json(jersey);

        }

        else {

            res.status(404).json({

                message: "Jersey not found"

            });

        }

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

// Delete Jersey
const deleteJersey = async (req, res) => {

    try {

        const jersey = await Jersey.findByIdAndDelete(

            req.params.id

        );

        if (jersey) {

            // Create Notification
            await Notification.create({

                title: "Jersey Deleted",

                message: `${jersey.teamName} - ${jersey.jerseyName} has been deleted.`,

                type: "jersey"

            });

            res.status(200).json({

                message: "Jersey deleted successfully",

                jersey

            });

        }

        else {

            res.status(404).json({

                message: "Jersey not found"

            });

        }

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

const searchJersey = async (req, res) => {

    try {

        const { name } = req.query;

        if (!name || !name.trim()) {

            return res.status(200).json([]);

        }

        const jerseys = await Jersey.find(publicCatalogFilter())
.populate("productType");

        const fuse = new Fuse(jerseys, {

            includeScore: true,

            threshold: 0.35,

            ignoreLocation: true,

            minMatchCharLength: 2,

            keys: [

                {
                    name: "teamName",
                    weight: 0.30
                },

                {
                    name: "jerseyName",
                    weight: 0.30
                },

                {
                    name: "category",
                    weight: 0.20
                },

                {
                    name: "productType.typeName",
                    weight: 0.10
                },

                {
                    name: "season",
                    weight: 0.05
                },

                {
                    name: "description",
                    weight: 0.05
                }

            ]

        });

        const results = fuse.search(name);

        res.status(200).json(

            results.map(result => result.item)

        );

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

const getByCategory = async (req, res) => {
    try {

        const jerseys = await Jersey.find(publicCatalogFilter({
            category: req.params.category
        }))
        .populate("productType");

        res.status(200).json(jerseys);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

const getFeaturedJerseys = async (req, res) => {

    try {

        const jerseys = await Jersey.find(publicCatalogFilter({ featured: true }))
        .populate("productType")
        .limit(8);

        res.status(200).json(jerseys);

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

const toggleFeatured = async (req, res) => {
    try {

        const jersey = await Jersey.findById(req.params.id);

        if (!jersey) {
            return res.status(404).json({
                message: "Jersey not found"
            });
        }

        jersey.featured = !jersey.featured;

        await jersey.save();

        res.status(200).json(jersey);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};



/* =======================================================
                AI METADATA
======================================================= */

const getAIMetadata = async (req, res) => {

    try {

        const jerseys = await Jersey.find(publicCatalogFilter())
            .populate("productType");

        const teams = [
            ...new Set(
                jerseys.map(j => j.teamName).filter(Boolean)
            )
        ];

        const categories = [
            ...new Set(
                jerseys.map(j => j.category).filter(Boolean)
            )
        ];

        const seasons = [
            ...new Set(
                jerseys.map(j => j.season).filter(Boolean)
            )
        ];

        const productTypes = [
            ...new Set(
                jerseys
                    .map(j => j.productType?.typeName)
                    .filter(Boolean)
            )
        ];

        res.status(200).json({

            teams,

            categories,

            seasons,

            productTypes

        });

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};


/* =======================================================
                    AI SEARCH
======================================================= */

const aiSearch = async (req, res) => {

    console.log("\n================ AI SEARCH =================");

    try {

      const {

    entities = {},

    query

} = req.body;

        console.log("📩 Query:", query);

        console.log("🧠 Entities:", entities);

        const filter = {};

        /* ==========================
                TEAM
        ========================== */

        if (entities.team) {

            filter.teamName = {

                $regex: entities.team,

                $options: "i"

            };

        }

        /* ==========================
                PRODUCT TYPE
        ========================== */

        if (entities.jerseyType) {

            console.log("👕 Searching Product Type:", entities.jerseyType);

            const type = await ProductType.findOne({

                typeName: entities.jerseyType

            });

            console.log("📦 Product Type Found:", type);

            if (type) {

                filter.productType = type._id;

            }

        }

        /* ==========================
                CATEGORY
        ========================== */

        if (entities.category) {

            filter.category = entities.category;

        }

        /* ==========================
                SEASON
        ========================== */

        if (entities.season) {

            filter.season = entities.season;

        }

        /* ==========================
                MAX PRICE
        ========================== */

        if (entities.maxPrice) {

            filter.price = {

                ...filter.price,

                $lte: entities.maxPrice

            };

        }

        /* ==========================
                MIN PRICE
        ========================== */

        if (entities.minPrice) {

            filter.price = {

                ...filter.price,

                $gte: entities.minPrice

            };

        }

        console.log("🔎 Mongo Filter:", filter);

        const jerseys = await Jersey.find(publicCatalogFilter(filter))

            .populate("productType");

        console.log("✅ Jerseys Found:", jerseys.length);

        /* ==========================
                FALLBACK SEARCH
        ========================== */

        if (jerseys.length === 0) {

            console.log("⚠ No AI Match → Falling back to searchJersey()");

            req.query = {

                name: query

            };

            return searchJersey(req, res);

        }

        console.log("================ END AI SEARCH ================\n");

        return res.json(jerseys);

    }

    catch (err) {

        console.error("❌ AI SEARCH ERROR");

        console.error(err);

        return res.status(500).json({

            message: err.message

        });

    }

};

const getAdminJerseys = async (req, res) => {
    try {
        const jerseys = await Jersey.find().populate("productType").sort({ createdAt: -1 });
        return res.status(200).json(jerseys);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getAdminJerseyById = async (req, res) => {
    try {
        const jersey = await Jersey.findById(req.params.id).populate("productType");
        if (!jersey) return res.status(404).json({ message: "Product not found" });
        return res.status(200).json(jersey);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
module.exports = {
    addJersey,
    getAllJerseys,
    getJerseysByIds,
    getJerseyById,
    updateJersey,
    deleteJersey,
    searchJersey,
    getByCategory,
    getFeaturedJerseys,
    toggleFeatured,getAIMetadata,aiSearch,getAdminJerseys,getAdminJerseyById
};
