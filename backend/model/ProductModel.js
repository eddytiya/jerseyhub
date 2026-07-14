const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
{
    /* ==========================================
                BASIC DETAILS
    ========================================== */

    productName:{

        type:String,

        required:true,

        trim:true

    },

    productType:{

        type:String,

        required:true,

        trim:true

    },

    category:{

        type:String,

        required:true,

        trim:true

    },

    brand:{

        type:String,

        default:""

    },

    /* ==========================================
                PRICING
    ========================================== */

    price:{

        type:Number,

        required:true

    },

    stock:{

        type:Number,

        required:true,

        default:0

    },

    featured:{

        type:Boolean,

        default:false

    },

    /* ==========================================
                MEDIA
    ========================================== */

    images:{

    type:[String],

    required:true,

    default:[]

},

    description:{

        type:String,

        required:true

    },

    /* ==========================================
                OPTIONS
    ========================================== */

    sizes:[{

        type:String

    }],

    colors:[{

        type:String

    }],

    /* ==========================================
                DYNAMIC ATTRIBUTES
    ========================================== */

    attributes:{

        type:Map,

        of:String,

        default:{}

    }

},
{

    timestamps:true

});

module.exports = mongoose.model(

    "Product",

    productSchema

);