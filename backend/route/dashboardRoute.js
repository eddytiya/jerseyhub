const express = require('express')

const router = express.Router()

const adminAuth = require('../adminAuth')

const {

    getDashboardAnalytics,

    getLowStockJerseys,

    getRecentOrders,

    getTopSellingJerseys,

    getMonthlyRevenue,

    getOrdersByStatus,

    getBestCustomers,

    getRevenueGrowth,

    getCategoryAnalytics

} = require('../controller/dashboardController')


// ======================================
// Dashboard Analytics
// ======================================

router.get(

    '/analytics',

    adminAuth,

    getDashboardAnalytics

)


// ======================================
// Dynamic Category Analytics
// ======================================

router.get(

    '/category-analytics',

    adminAuth,

    getCategoryAnalytics

)


// ======================================
// Low Stock Jerseys
// ======================================

router.get(

    '/low-stock',

    adminAuth,

    getLowStockJerseys

)


// ======================================
// Recent Orders
// ======================================

router.get(

    '/recent-orders',

    adminAuth,

    getRecentOrders

)


// ======================================
// Top Selling Jerseys
// ======================================

router.get(

    '/top-selling',

    adminAuth,

    getTopSellingJerseys

)


// ======================================
// Monthly Revenue
// ======================================

router.get(

    '/monthly-revenue',

    adminAuth,

    getMonthlyRevenue

)


// ======================================
// Orders By Status
// ======================================

router.get(

    '/orders-status',

    adminAuth,

    getOrdersByStatus

)


// ======================================
// Revenue Growth
// ======================================

router.get(

    '/revenue-growth',

    adminAuth,

    getRevenueGrowth

)


// ======================================
// Best Customers
// ======================================

router.get(

    '/best-customers',

    adminAuth,

    getBestCustomers

)

module.exports = router