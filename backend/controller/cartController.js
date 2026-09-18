const Cart = require('../model/cartModel')
const Jersey = require('../model/jerseyModel')
const { isPubliclyAvailable } = require('../services/catalogPublishing')

const getInventory = (jersey, selectedSize) => {
    if (!jersey.variants?.length) {
        return { available: jersey.stock - (jersey.reservedStock || 0), sku: "", selectedSize: selectedSize || "" }
    }
    if (!selectedSize) {
        const error = new Error("Please select a size")
        error.statusCode = 400
        throw error
    }
    const variant = jersey.variants.find((item) => item.size === selectedSize && item.active)
    if (!variant) {
        const error = new Error("Selected size is unavailable")
        error.statusCode = 400
        throw error
    }
    return { available: variant.stock - variant.reserved, sku: variant.sku, selectedSize: variant.size }
}

// Add item to cart

const addToCart = async (req, res) => {

    try {

        const userId = req.session.userId || req.session.guestId

        const {

            jerseyId,

            quantity,

            selectedSize

        } = req.body

        // Check if jersey exists

        const jersey = await Jersey.findById(

            jerseyId

        )

        if (!jersey || !isPubliclyAvailable(jersey)) {

            return res.status(404).json({

                message: 'Jersey Not Found'

            })

        }

        const inventory = getInventory(jersey, selectedSize)

        if (inventory.available <= 0) {

            return res.status(400).json({

                message: 'This Jersey Is Out Of Stock'

            })

        }

        const existingItem = await Cart.findOne({

            userId,

            jerseyId,

            selectedSize: inventory.selectedSize

        })

        // Item already exists in cart

        if (existingItem) {

            // Prevent exceeding stock

            if (

                existingItem.quantity + 1 >

                inventory.available

            ) {

                return res.status(400).json({

                    message: `Only ${inventory.available} item(s) available in stock`

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

        if (quantity > inventory.available) {

            return res.status(400).json({

                message: `Only ${inventory.available} item(s) available in stock`

            })

        }

        const cartItem = await Cart.create({

            userId,

            jerseyId,

            quantity,

            selectedSize: inventory.selectedSize,

            sku: inventory.sku

        })

        res.status(201).json({

            message: 'Added To Cart Successfully',

            cart: cartItem

        })

    }

    catch (err) {

        res.status(err.statusCode || 500).json({

            message: err.message

        })

    }

}

// Get cart items

const getCart = async (req, res) => {

    try {

        const cart = await Cart.find({

            userId: req.session.userId || req.session.guestId

        })

        .populate('jerseyId')

        res.status(200).json(cart)

    }

    catch (err) {

        res.status(err.statusCode || 500).json({

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

        if (cartItem.userId !== String(req.session.userId || req.session.guestId)) {

            return res.status(403).json({

                message: 'Not Authorized'

            })

        }

        const jersey = await Jersey.findById(

            cartItem.jerseyId

        )

        const inventory = getInventory(jersey, cartItem.selectedSize)

        if (

            req.body.quantity >

            inventory.available

        ) {

            return res.status(400).json({

                message: `Only ${inventory.available} item(s) available in stock`

            })

        }

        cartItem.quantity = req.body.quantity

        await cartItem.save()

        res.status(200).json(cartItem)

    }

    catch (err) {

        res.status(err.statusCode || 500).json({

            message: err.message

        })

    }

}

// Remove item from cart

const removeFromCart = async (req, res) => {

    try {

        const cartItem = await Cart.findById(

            req.params.id

        )

        if (!cartItem) {

            return res.status(404).json({

                message: 'Cart Item Not Found'

            })

        }

        if (cartItem.userId !== String(req.session.userId || req.session.guestId)) {

            return res.status(403).json({

                message: 'Not Authorized'

            })

        }

        await Cart.findByIdAndDelete(

            req.params.id

        )

        res.status(200).json({

            message: 'Item Removed'

        })

    }

    catch (err) {

        res.status(err.statusCode || 500).json({

            message: err.message

        })

    }

}
/* ==========================================
            BUY NOW
========================================== */

const buyNow = async (req, res) => {

    try {

        const userId = req.session.userId || req.session.guestId;

        const {

            jerseyId,

            quantity,

            selectedSize

        } = req.body;

        const jersey = await Jersey.findById(

            jerseyId

        );

        if (!jersey || !isPubliclyAvailable(jersey)) {

            return res.status(404).json({

                message: "Jersey Not Found"

            });

        }

        const inventory = getInventory(jersey, selectedSize)

        if (quantity > inventory.available) {

            return res.status(400).json({

                message: `Only ${inventory.available} item(s) available`

            });

        }

        // Remove previous Buy Now item

        await Cart.deleteMany({

    userId,

    buyNow: true

});

        // Create Buy Now item

        const item = await Cart.create({

            userId,

            jerseyId,

            quantity,

            selectedSize: inventory.selectedSize,

            sku: inventory.sku,

            buyNow: true

        });

        res.status(200).json({

            message: "Buy Now Ready",

            cart: item

        });

    }

    catch (err) {

        res.status(err.statusCode || 500).json({

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

            userId: req.session.userId || req.session.guestId,

            buyNow: true

        }).populate(

            "jerseyId"

        );

        res.status(200).json(item);

    }

    catch (err) {

        res.status(err.statusCode || 500).json({

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
