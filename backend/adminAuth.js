const adminAuth = (

    req,

    res,

    next

) => {

    if (

        !req.session.userId ||

        req.session.role !== 'admin'

    ) {

        return res.status(403).json({

            message: 'Admin Access Only'

        })

    }

    next()

}

module.exports = adminAuth
