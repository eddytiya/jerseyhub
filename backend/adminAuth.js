const adminAuth = (

    req,
    res,
    next

) => {

    console.log("========== ADMIN AUTH ==========")

    console.log(req.session)

    console.log("userId :", req.session.userId)

    console.log("role   :", req.session.role)

    console.log(
        "Condition =",
        !req.session.userId || req.session.role !== 'admin'
    )

    if (

        !req.session.userId ||

        req.session.role !== 'admin'

    ) {

        console.log("ACCESS DENIED")

        return res.status(403).json({

            message: 'Admin Access Only'

        })

    }

    console.log("ACCESS GRANTED")

    next()

}

module.exports = adminAuth