const Jersey = require('../model/jerseyModel')
const Category = require('../model/categoryModel')
const User = require('../model/userModel')
const Order = require('../model/orderModel')
const Review = require("../model/Review");
// =======================================
// Dashboard Analytics
// =======================================

const getDashboardAnalytics = async (req, res) => {

    try {

        const [

    totalJerseys,

    totalCategories,

    totalCustomers,

    totalOrders,

    pendingOrders,

    processingOrders,

    shippedOrders,

    deliveredOrders,

    totalReviews

] = await Promise.all([

            Jersey.countDocuments(),

            Category.countDocuments(),

            User.countDocuments({

                role: 'customer'

            }),

            Order.countDocuments(),

            Order.countDocuments({

                status: 'Pending'

            }),

            Order.countDocuments({

                status: 'Processing'

            }),

            Order.countDocuments({

                status: 'Shipped'

            }),

            Order.countDocuments({

                status:"Delivered"

            }),

            Review.countDocuments({

                status:"published"

            })

        ])

        const revenue = await Order.aggregate([

            {

                $match: {

                    status: 'Delivered'

                }

            },

            {

                $group: {

                    _id: null,

                    totalRevenue: {

                        $sum: '$totalAmount'

                    }

                }

            }

        ])

        res.status(200).json({

            totalJerseys,

            totalCategories,

            totalCustomers,

            totalOrders,

            pendingOrders,

            processingOrders,

            shippedOrders,

            deliveredOrders,

            totalReviews,

            totalRevenue:

                revenue.length > 0

                    ? revenue[0].totalRevenue

                    : 0

        })

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        })

    }

}

// =======================================
// Low Stock Jerseys
// =======================================

const getLowStockJerseys = async (req, res) => {

    try {

        const lowStock = await Jersey.find({

            stock: {

                $lte: 5

            }

        })

        .sort({

            stock: 1

        })

        res.status(200).json(lowStock)

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        })

    }

}

// =======================================
// Recent Orders
// =======================================

const getRecentOrders = async (req,res)=>{

    try{

        const orders = await Order.find()

        .populate({

            path:'items.jerseyId',

            model:'Jersey'

        })

        .sort({

            createdAt:-1

        })

        .limit(5)

        const result = await Promise.all(

            orders.map(async(order)=>{

                const user = await User.findById(order.userId)

                return{

                    ...order._doc,

                    customerName:user?.uname || "Unknown",

                    customerEmail:user?.email || "",

                    jerseys:order.items.map(item=>item.jerseyId)

                }

            })

        )

        res.status(200).json(result)

    }

    catch(err){

        res.status(500).json({

            message:err.message

        })

    }

}

// =======================================
// Top Selling Jerseys
// =======================================

const getTopSellingJerseys = async (req, res) => {

    try {

        const sales = await Order.aggregate([

            {

                $unwind: "$items"

            },

            {

                $group: {

                    _id: "$items.jerseyId",

                    totalSold: {

                        $sum: "$items.quantity"

                    }

                }

            },

            {

                $sort: {

                    totalSold: -1

                }

            },

            {

                $limit: 5

            }

        ])

        const result = await Promise.all(

            sales.map(async (item) => {

                const jersey = await Jersey.findById(item._id)

                return {

                    jersey,

                    totalSold: item.totalSold

                }

            })

        )

        res.status(200).json(result)

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        })

    }

}

// =======================================
// Monthly Revenue
// =======================================

const getMonthlyRevenue = async (req, res) => {

    try {

        const revenue = await Order.aggregate([

            {
                $match: {

                    status: "Delivered"

                }

            },

            {

                $group: {

                    _id: {

                        month: {

                            $month: "$createdAt"

                        }

                    },

                    revenue: {

                        $sum: "$totalAmount"

                    }

                }

            },

            {

                $sort: {

                    "_id.month": 1

                }

            }

        ])

        const months = [

            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"

        ]

        const result = revenue.map(item => ({

            month: months[item._id.month - 1],

            revenue: item.revenue

        }))

        res.status(200).json(result)

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        })

    }

}

// =======================================
// Orders By Status
// =======================================

const getOrdersByStatus = async (req, res) => {

    try {

        const pending = await Order.countDocuments({

            status: "Pending"

        })

        const processing = await Order.countDocuments({

            status: "Processing"

        })

        const shipped = await Order.countDocuments({

            status: "Shipped"

        })

        const delivered = await Order.countDocuments({

            status: "Delivered"

        })

        res.status(200).json({

            pending,

            processing,

            shipped,

            delivered

        })

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        })

    }

}


const getRevenueGrowth = async(req,res)=>{

    try{

        const now=new Date()

        const currentMonth=now.getMonth()

        const currentYear=now.getFullYear()

        const lastMonth=currentMonth===0?11:currentMonth-1

        const lastMonthYear=currentMonth===0?currentYear-1:currentYear

        const orders=await Order.find({
            status:'Delivered'
        })

        let currentRevenue=0
        let lastRevenue=0

        orders.forEach(order=>{

            const date=new Date(order.createdAt)

            if(
                date.getMonth()===currentMonth &&
                date.getFullYear()===currentYear
            ){

                currentRevenue+=order.totalAmount

            }

            if(
                date.getMonth()===lastMonth &&
                date.getFullYear()===lastMonthYear
            ){

                lastRevenue+=order.totalAmount

            }

        })

        let growth=0

        if(lastRevenue>0){

            growth=((currentRevenue-lastRevenue)/lastRevenue)*100

        }

        res.json({

            currentRevenue,

            lastRevenue,

            growth:growth.toFixed(1)

        })

    }

    catch(err){

        console.log(err)

        res.status(500).json({

            message:'Revenue growth error'

        })

    }

}
// =======================================
// Best Customers
// =======================================

const getBestCustomers = async (req,res)=>{

    try{

        const customers=await Order.aggregate([

            {
                $group:{
                    _id:'$userId',
                    totalSpent:{$sum:'$totalAmount'},
                    totalOrders:{$sum:1}
                }
            },

            {
                $sort:{
                    totalSpent:-1
                }
            },

            {
                $limit:5
            }

        ])

        const result=await Promise.all(

            customers.map(async(customer)=>{

                const user=await User.findById(customer._id)

                return{

                    name:user?.uname||'Unknown',

                    email:user?.email||'',

                    totalSpent:customer.totalSpent,

                    totalOrders:customer.totalOrders

                }

            })

        )

        res.status(200).json(result)

    }

    catch(err){

        res.status(500).json({

            message:err.message

        })

    }

}
// =======================================
// Dynamic Category Analytics
// =======================================

const getCategoryAnalytics = async(req,res)=>{

    try{

        const categories = await Jersey.aggregate([

            {

                $group:{

                    _id:"$category",

                    total:{

                        $sum:1

                    }

                }

            },

            {

                $sort:{

                    total:-1

                }

            }

        ])

        res.status(200).json(categories)

    }

    catch(err){

        res.status(500).json({

            message:err.message

        })

    }

}

module.exports={

    getRevenueGrowth,

    getDashboardAnalytics,

    getBestCustomers,

    getLowStockJerseys,

    getRecentOrders,

    getTopSellingJerseys,

    getMonthlyRevenue,

    getOrdersByStatus,

    getCategoryAnalytics

}