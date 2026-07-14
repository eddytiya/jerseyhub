const Cart = require('../model/cartModel')
const Jersey = require('../model/jerseyModel')

// Add item to cart

const addToCart = async (req, res) => {

    try {

        const {

            userId,

            jerseyId,

            quantity

        } = req.body

        // Check if jersey exists

        const jersey = await Jersey.findById(

            jerseyId

        )

        if (!jersey) {

            return res.status(404).json({

                message: 'Jersey Not Found'

            })

        }

        // Out of stock

        if (jersey.stock <= 0) {

            return res.status(400).json({

                message: 'This Jersey Is Out Of Stock'

            })

        }

        const existingItem = await Cart.findOne({

            userId,

            jerseyId

        })

        // Item already exists in cart

        if (existingItem) {

            // Prevent exceeding stock

            if (

                existingItem.quantity + 1 >

                jersey.stock

            ) {

                return res.status(400).json({

                    message: `Only ${jersey.stock} item(s) available in stock`

                })

            }

            existingItem.quantity += 1

            await existingItem.save()

            return res.status(200).json({

                message: 'Quantity Updated',

                cart: existingItem

            })

        }

        // Prevent adding more than stock

        if (quantity > jersey.stock) {

            return res.status(400).json({

                message: `Only ${jersey.stock} item(s) available in stock`

            })

        }

        const cartItem = await Cart.create({

            userId,

            jerseyId,

            quantity

        })

        res.status(201).json({

            message: 'Added To Cart Successfully',

            cart: cartItem

        })

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        })

    }

}

// Get cart items

const getCart = async (req, res) => {

    try {

        const cart = await Cart.find({

            userId: req.params.userId

        })

        .populate('jerseyId')

        res.status(200).json(cart)

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        })

    }

}

// Update quantity

const updateQuantity = async (req, res) => {

    try {

        const cartItem = await Cart.findById(

            req.params.id

        )

        if (!cartItem) {

            return res.status(404).json({

                message: 'Cart Item Not Found'

            })

        }

        const jersey = await Jersey.findById(

            cartItem.jerseyId

        )

        if (

            req.body.quantity >

            jersey.stock

        ) {

            return res.status(400).json({

                message: `Only ${jersey.stock} item(s) available in stock`

            })

        }

        cartItem.quantity = req.body.quantity

        await cartItem.save()

        res.status(200).json(cartItem)

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        })

    }

}

// Remove item from cart

const removeFromCart = async (req, res) => {

    try {

        await Cart.findByIdAndDelete(

            req.params.id

        )

        res.status(200).json({

            message: 'Item Removed'

        })

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        })

    }

}
/* ==========================================
            BUY NOW
========================================== */

const buyNow = async (req, res) => {

    try {

        const {

            userId,

            jerseyId,

            quantity

        } = req.body;

        const jersey = await Jersey.findById(

            jerseyId

        );

        if (!jersey) {

            return res.status(404).json({

                message: "Jersey Not Found"

            });

        }

        if (quantity > jersey.stock) {

            return res.status(400).json({

                message: `Only ${jersey.stock} item(s) available`

            });

        }

        // Remove previous Buy Now item

        await Cart.deleteMany({

    userId,

    buyNow: buyNow ? true : false

});

        // Create Buy Now item

        const item = await Cart.create({

            userId,

            jerseyId,

            quantity,

            buyNow: true

        });

        res.status(200).json({

            message: "Buy Now Ready",

            cart: item

        });

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};


/* ==========================================
        GET BUY NOW ITEM
========================================== */

const getBuyNowCart = async (req, res) => {

    try {

        const item = await Cart.find({

            userId: req.params.userId,

            buyNow: true

        }).populate(

            "jerseyId"

        );

        res.status(200).json(item);

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};
module.exports = {

    addToCart,

    getCart,

    updateQuantity,

    removeFromCart,

    buyNow,

    getBuyNowCart

}