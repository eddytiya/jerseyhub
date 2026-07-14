const User = require('../model/userModel')
const bcryptjs = require('bcryptjs')
const Notification = require('../model/Notification')

const getProfile = async (req, res) => {

    try {

        if (!req.session.userId) {

            return res.status(401).json({

                message: 'Please Login First'

            })

        }

        const user = await User.findById(

            req.session.userId

        ).select('-password')

        if (!user) {

            return res.status(404).json({

                message: 'User not found'

            })

        }

        res.status(200).json(user)

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        })

    }

}

const updateProfile = async (req, res) => {

    try {

        if (!req.session.userId) {

            return res.status(401).json({

                message: 'Please Login First'

            })

        }

        const {

            uname,

            email

        } = req.body

        const updatedUser = await User.findByIdAndUpdate(

            req.session.userId,

            {

                uname,

                email

            },

            {

                new: true,

                runValidators: true

            }

        ).select('-password')

        // Profile Notification

        await Notification.create({

            title: "Profile Updated",

            message: `${updatedUser.uname} updated profile information.`,

            type: "profile"

        })

        res.status(200).json({

            message: 'Profile Updated Successfully',

            user: updatedUser

        })

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        })

    }

}

const changePassword = async (req, res) => {

    try {

        if (!req.session.userId) {

            return res.status(401).json({

                message: 'Please Login First'

            })

        }

        const {

            currentPassword,

            newPassword,

            confirmPassword

        } = req.body

        if (

            !currentPassword ||

            !newPassword ||

            !confirmPassword

        ) {

            return res.status(400).json({

                message: 'All fields are required'

            })

        }

        if (newPassword !== confirmPassword) {

            return res.status(400).json({

                message: 'Passwords do not match'

            })

        }

        const user = await User.findById(

            req.session.userId

        )

        if (!user) {

            return res.status(404).json({

                message: 'User not found'

            })

        }

        const match = await bcryptjs.compare(

            currentPassword,

            user.password

        )

        if (!match) {

            return res.status(400).json({

                message: 'Current Password Incorrect'

            })

        }

        const hashedPassword = await bcryptjs.hash(

            newPassword,

            10

        )

        user.password = hashedPassword

        await user.save()

        res.status(200).json({

            message: 'Password Changed Successfully'

        })

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        })

    }

}

module.exports = {

    getProfile,

    updateProfile,

    changePassword

}