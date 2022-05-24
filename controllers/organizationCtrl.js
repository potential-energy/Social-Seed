const Organizations = require('../models/organizationModel')

const organizationCtrl = {
    createOrganization: async (req, res) => {
        try {
            const { fullname, email, mobile, address, website, images } = req.body

            const organization_name = await Organizations.findOne({ fullname: fullname })
            if (organization_name) return res.status(400).json({ msg: "This organization name already exists." })


            const newOrganization = new Organizations({
                fullname: fullname, creator_user: req.user._id,
                email: email, mobile: mobile, address: address,
                website: website, avatar: images
            })

            await newOrganization.save()

            res.json({
                msg: 'Organization Save Success!',
                organization: {
                    ...newOrganization._doc,
                }
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getOrganization: async (req, res) => {
        try {
            const user = await Organizations.findById(req.params.id)
            
            res.json({user})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteOrganization: async (req, res) => {
        try {
            const organization = await Organizations.findOneAndDelete({ _id: req.params.id  })


            res.json({
                msg: 'Deleted Organization!',
                newOrganization: {
                    ...organization,
                    user: req.user
                }
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateOrganization: async (req, res) => {
        try {
            const { fullname, email, mobile, address, website, images } = req.body

            const organization = await Organizations.findOneAndUpdate({ _id: req.params.id }, {
                fullname, email, mobile, address, website, images
            })

            res.json({
                msg: "Updated Organization!",
                newOrganization: {
                    ...organization._doc,
                    fullname, email, mobile, address, website, images
                }
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}


module.exports = organizationCtrl