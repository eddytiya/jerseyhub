const mongoose = require('mongoose');

const slugify = (value = "") => value
    .toString()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const variantSchema = new mongoose.Schema({
    size: { type: String, enum: ['S', 'M', 'L', 'XL', 'XXL'], required: true },
    sku: { type: String, required: true, trim: true, uppercase: true },
    barcode: { type: String, default: "", trim: true },
    stock: { type: Number, min: 0, default: 0 },
    reserved: { type: Number, min: 0, default: 0 },
    sold: { type: Number, min: 0, default: 0 },
    supplierCost: { type: Number, min: 0, default: 0 },
    active: { type: Boolean, default: true },
}, { _id: true });

const jerseySchema = mongoose.Schema({

    teamName:{

        type:String,

        required:true,

        trim:true

    },

    jerseyName:{

        type:String,

        required:true,

        trim:true

    },

    /* ======================================
            DYNAMIC CATEGORY
    ====================================== */

    category:{

        type:String,

        required:true,

        trim:true

    },

    season:{

        type:String,

        required:true

    },

   productType:{

    type:mongoose.Schema.Types.ObjectId,

    ref:"ProductType",

    required:true

},

    price:{

        type:Number,

        required:true

    },

    sizes:[{

        type:String,

        enum:[

            'S',

            'M',

            'L',

            'XL',

            'XXL'

        ]

    }],

    variants: {
        type: [variantSchema],
        default: []
    },

    slug: { type: String, trim: true, lowercase: true, unique: true, sparse: true },

    status: {
        type: String,
        enum: ["draft", "scheduled", "published", "archived"],
        default: "published",
        index: true
    },

    publishAt: { type: Date, default: null, index: true },

    publishedAt: { type: Date, default: null },

    migrationKey: { type: String, unique: true, sparse: true, select: false },

    reservedStock: { type: Number, min: 0, default: 0 },

    soldStock: { type: Number, min: 0, default: 0 },

    stock:{

        type:Number,

        required:true

    },

    images:{

        type:[String],

        validate:[

            (value)=>value.length>=1 && value.length<=10,

            "Product must have between 1 and 10 images."

        ],

        required:true

    },

    imageUrl:{

        type:String,

        default:""

    },

    description:{

        type:String,

        required:true

    },

    featured:{

        type:Boolean,

        default:false

    },

    /* ======================================
            REVIEW SUMMARY
    ====================================== */

    averageRating:{

        type:Number,

        default:0,

        min:0,

        max:5

    },

    totalReviews:{

        type:Number,

        default:0,

        min:0

    }

},
{

    timestamps:true

});

jerseySchema.pre("validate", function syncVariantTotals() {
    if (!this.slug) {
        this.slug = slugify(`${this.teamName || ""}-${this.jerseyName || ""}-${this.season || ""}`);
    } else {
        this.slug = slugify(this.slug);
    }

    if (this.status === "scheduled" && (!this.publishAt || this.publishAt <= new Date())) {
        this.invalidate("publishAt", "A scheduled product requires a future publish date");
    }
    if (this.status === "published" && !this.publishedAt) this.publishedAt = new Date();
    if (this.status !== "scheduled") this.publishAt = null;

    if (!this.variants?.length) return;
    const skus = this.variants.map((variant) => variant.sku);
    if (new Set(skus).size !== skus.length) {
        this.invalidate("variants", "Variant SKUs must be unique within a product");
    }
    this.sizes = [...new Set(this.variants.filter((variant) => variant.active).map((variant) => variant.size))];
    this.stock = this.variants.reduce((total, variant) => total + variant.stock, 0);
    this.reservedStock = this.variants.reduce((total, variant) => total + variant.reserved, 0);
    this.soldStock = this.variants.reduce((total, variant) => total + variant.sold, 0);
});

jerseySchema.index({ "variants.sku": 1 }, { unique: true, sparse: true });
jerseySchema.index({ status: 1, publishAt: 1 });
jerseySchema.index(
    { "variants.barcode": 1 },
    { unique: true, partialFilterExpression: { "variants.barcode": { $type: "string", $gt: "" } } }
);

const jerseyModel = mongoose.model(

    'Jersey',

    jerseySchema

);

module.exports = jerseyModel;
