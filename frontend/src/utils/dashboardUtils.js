// ===========================================
// Inventory Calculations
// ===========================================
export const getInventoryStats = (jerseys) => {

    const totalJerseys = jerseys.length

    const featuredJerseys = jerseys.filter(
        jersey => jersey.featured
    ).length

    const totalStock = jerseys.reduce(
        (sum, jersey) => sum + jersey.stock,
        0
    )

    const inventoryValue = jerseys.reduce(
        (sum, jersey) =>
            sum + (jersey.price * jersey.stock),
        0
    )

    const mostExpensive = jerseys.length
        ? jerseys.reduce(
            (max, jersey) =>
                jersey.price > max.price
                    ? jersey
                    : max
        )
        : null

    const cheapest = jerseys.length
        ? jerseys.reduce(
            (min, jersey) =>
                jersey.price < min.price
                    ? jersey
                    : min
        )
        : null

    /* =====================================
            Dynamic Categories
    ===================================== */

    const categoryStats = {}

    jerseys.forEach(jersey => {

        if (!categoryStats[jersey.category]) {

            categoryStats[jersey.category] = 0

        }

        categoryStats[jersey.category]++

    })

    return {

        totalJerseys,

        featuredJerseys,

        totalStock,

        inventoryValue,

        mostExpensive,

        cheapest,

        categoryStats

    }

}



// ===========================================
// Revenue Growth
// ===========================================

export const getRevenueGrowth = (monthlyRevenue) => {

    return {

        growth:

            monthlyRevenue.length >= 2

                ?

                (

                    (

                        monthlyRevenue[monthlyRevenue.length - 1].revenue -

                        monthlyRevenue[monthlyRevenue.length - 2].revenue

                    )

                    /

                    monthlyRevenue[monthlyRevenue.length - 2].revenue

                    *

                    100

                ).toFixed(1)

                :

                0

    }

}



// ===========================================
// Revenue Chart
// ===========================================

export const getRevenueChart = (monthlyRevenue) => ({

    labels: monthlyRevenue.map(item => item.month),

    datasets: [

        {

            label: "Revenue",

            data: monthlyRevenue.map(item => item.revenue),

            borderColor: "#0d6efd",

            backgroundColor: "rgba(13,110,253,0.2)",

            fill: true,

            tension: 0.4

        }

    ]

})



// ===========================================
// Order Status Chart
// ===========================================

export const getOrderStatusChart = (orderStatus) => ({

    labels: [

        "Pending",

        "Processing",

        "Shipped",

        "Delivered"

    ],

    datasets: [

        {

            data: [

                orderStatus.pending,

                orderStatus.processing,

                orderStatus.shipped,

                orderStatus.delivered

            ],

            backgroundColor: [

                "#ffc107",

                "#0dcaf0",

                "#0d6efd",

                "#198754"

            ]

        }

    ]

})