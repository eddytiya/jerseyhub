const Jersey = require("../model/jerseyModel");
const Fuse = require('fuse.js')
const Notification = require('../model/Notification')
const Category = require("../model/categoryModel");
const ProductType = require("../model/ProductTypeModel");
// Add Jersey
const addJersey = async (req, res) => {

    try {

        console.log("BODY:", req.body);

        const jerseyData = {

            ...req.body

        };

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

        const jersey = new Jersey(

            jerseyData

        );

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

// Get All Jerseys
const getAllJerseys = async (req, res) => {
    try {
        const jerseys = await Jersey.find()
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
        const jersey = await Jersey.findById(req.params.id)
.populate("productType");

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

        const jerseyData = {

    ...req.body

};

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

const jersey = await Jersey.findByIdAndUpdate(

    req.params.id,

    jerseyData,

    {

        new:true

    }

);

        if (jersey) {

            // Create Notification
            await Notification.create({

                title: "Jersey Updated",

                message: `${jersey.teamName} - ${jersey.jerseyName} has been updated.`,

                type: "jersey"

            });

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

        const jerseys = await Jersey.find()
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

        const jerseys = await Jersey.find({
            category: req.params.category
        })
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

        const jerseys = await Jersey.find({

            featured: true

        })
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

        const jerseys = await Jersey.find()
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

        const jerseys = await Jersey.find(filter)

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
module.exports = {
    addJersey,
    getAllJerseys,
    getJerseyById,
    updateJersey,
    deleteJersey,
    searchJersey,
    getByCategory,
    getFeaturedJerseys,
    toggleFeatured,getAIMetadata,aiSearch
};
