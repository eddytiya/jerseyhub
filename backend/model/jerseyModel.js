const mongoose = require('mongoose');

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

const jerseyModel = mongoose.model(

    'Jersey',

    jerseySchema

);

module.exports = jerseyModel;