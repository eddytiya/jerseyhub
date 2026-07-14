import { useState, useEffect } from 'react'
import axios from 'axios'

const useDashboardData = () => {

    const [loading, setLoading] = useState(true)

    const [jerseys, setJerseys] = useState([])

    const [lowStock, setLowStock] = useState([])

    const [recentOrders, setRecentOrders] = useState([])

    const [topSelling, setTopSelling] = useState([])

    const [bestCustomers, setBestCustomers] = useState([])

    const [monthlyRevenue, setMonthlyRevenue] = useState([])

    const [orderStatus, setOrderStatus] = useState({

        pending: 0,

        processing: 0,

        shipped: 0,

        delivered: 0

    })

    const [dashboard, setDashboard] = useState({

    totalJerseys: 0,

    totalCategories: 0,

    totalCustomers: 0,

    totalOrders: 0,

    pendingOrders: 0,

    processingOrders: 0,

    shippedOrders: 0,

    deliveredOrders: 0,

    totalReviews: 0,

    totalRevenue: 0

})

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                // ===========================================
                // Development Loading Delay (2 Seconds)
                // Remove before Production
                // ===========================================

                await new Promise(resolve => setTimeout(resolve, 1000))

                const [

                    jerseys,

                    analytics,

                    lowStock,

                    recentOrders,

                    topSelling,

                    monthlyRevenue,

                    orderStatus,

                    bestCustomers

                ] = await Promise.all([

                    axios.get('http://localhost:2987/jersey'),

                    axios.get('http://localhost:2987/dashboard/analytics', {

                        withCredentials: true

                    }),

                    axios.get('http://localhost:2987/dashboard/low-stock', {

                        withCredentials: true

                    }),

                    axios.get('http://localhost:2987/dashboard/recent-orders', {

                        withCredentials: true

                    }),

                    axios.get('http://localhost:2987/dashboard/top-selling', {

                        withCredentials: true

                    }),

                    axios.get('http://localhost:2987/dashboard/monthly-revenue', {

                        withCredentials: true

                    }),

                    axios.get('http://localhost:2987/dashboard/orders-status', {

                        withCredentials: true

                    }),

                    axios.get('http://localhost:2987/dashboard/best-customers', {

                        withCredentials: true

                    })

                ])

                setJerseys(jerseys.data)

                setDashboard(analytics.data)

                setLowStock(lowStock.data)

                setRecentOrders(recentOrders.data)

                setTopSelling(topSelling.data)

                setMonthlyRevenue(monthlyRevenue.data)

                setOrderStatus(orderStatus.data)

                setBestCustomers(bestCustomers.data)

                setLoading(false)

            }

            catch(err){

                console.log(err)

                setLoading(false)

            }

        }

        fetchDashboard()

    }, [])

        return {

        loading,

        jerseys,

        lowStock,

        recentOrders,

        topSelling,

        dashboard,

        monthlyRevenue,

        orderStatus,

        bestCustomers

    }

}



export default useDashboardData