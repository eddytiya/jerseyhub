const mongoose = require("mongoose");

const { connectDB } = require("../db");

const Jersey = require("../model/JerseyModel");
const Product = require("../model/ProductModel");

const migrate = async () => {

    try {

        await connectDB();

        const jerseys = await Jersey.find();

        console.log(`Found ${jerseys.length} jerseys`);

        for (const jersey of jerseys) {

            const alreadyExists = await Product.findOne({

                productName: jersey.jerseyName,

                teamName: jersey.teamName

            });

            if (alreadyExists) {

                console.log(`${jersey.jerseyName} already migrated`);

                continue;

            }

            await Product.create({

                productType: "Jersey",

                productName: jersey.jerseyName,

                teamName: jersey.teamName,

                brand: "",

                category: jersey.category,

                season: jersey.season,

                jerseyType: jersey.jerseyType,

                price: jersey.price,

                sizes: jersey.sizes,

                stock: jersey.stock,

                imageUrl: jersey.imageUrl,

                description: jersey.description,

                featured: jersey.featured

            });

            console.log(`Migrated ${jersey.jerseyName}`);

        }

        console.log("Migration Completed ✅");

        process.exit();

    }

    catch (err) {

        console.log(err);

        process.exit();

    }

};

migrate();