require("dotenv").config();
const mongoose = require("mongoose");
const { connectDB } = require("../db");
const Jersey = require("../model/jerseyModel");
const ProductType = require("../model/ProductTypeModel");
const { ensureUniqueSlug } = require("../services/catalogPublishing");

// Copies records from the retired `products` collection into the canonical
// `jerseys` collection. It never deletes source records and is safe to rerun.
const migrate = async () => {
    await connectDB();
    const existingProducts = await Jersey.find({
        $or: [
            { slug: { $exists: false } },
            { slug: "" },
            { status: { $exists: false } },
        ],
    });
    let backfilled = 0;
    for (const product of existingProducts) {
        product.status = product.status || "published";
        await product.validate();
        product.slug = await ensureUniqueSlug(Jersey, product.slug, product._id);
        await product.save();
        backfilled += 1;
    }

    const legacyProducts = await mongoose.connection.db.collection("products").find({}).toArray();
    let migrated = 0;
    let skipped = 0;

    for (const legacy of legacyProducts) {
        const migrationKey = `legacy-product:${legacy._id}`;
        if (await Jersey.exists({ migrationKey })) { skipped += 1; continue; }

        const typeName = typeof legacy.productType === "string" ? legacy.productType : "Jersey";
        let productType = await ProductType.findOne({ typeName });
        if (!productType) productType = await ProductType.create({ typeName });

        const product = new Jersey({
            migrationKey,
            teamName: legacy.teamName || legacy.brand || "General",
            jerseyName: legacy.productName || legacy.jerseyName,
            category: legacy.category || "Uncategorized",
            season: legacy.season || "N/A",
            productType: productType._id,
            price: legacy.price,
            sizes: legacy.sizes || [],
            stock: legacy.stock || 0,
            images: legacy.images?.length ? legacy.images : [legacy.imageUrl].filter(Boolean),
            imageUrl: legacy.imageUrl || legacy.images?.[0] || "",
            description: legacy.description || "Migrated product",
            featured: Boolean(legacy.featured),
            status: legacy.status || "draft",
            slug: legacy.slug,
        });
        await product.validate();
        product.slug = await ensureUniqueSlug(Jersey, product.slug);
        await product.save();
        migrated += 1;
    }

    console.log(`Catalog migration complete: ${backfilled} backfilled, ${migrated} migrated, ${skipped} already present.`);
    await mongoose.disconnect();
};

migrate().catch(async (error) => {
    console.error("Catalog migration failed:", error);
    await mongoose.disconnect();
    process.exitCode = 1;
});
