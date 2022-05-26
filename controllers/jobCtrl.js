const Jobs = require('../models/jobModel')

const jobCtrl = {
    createJob: async (req, res) => {
        try {
            const { title, organization, location, description } = req.body

            const newJob = new Jobs({
                title: title,
                organization: req.user.organization,
                location: location,
                description: description
            })

            await newJob.save()

            res.json({
                msg: 'Job Save Success!',
                job: {
                    ...newJob._doc,
                }
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getJob: async (req, res) => {
        try {
            const user = await Jobs.findById(req.params.id)
            
            res.json({user})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteJob: async (req, res) => {
        try {
            const job = await Jobs.findOneAndDelete({ _id: req.params.id  })

            res.json({
                msg: 'Deleted Job!',
                newJob: {
                    ...job,
                    user: req.user
                }
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateJob: async (req, res) => {
        try {
            const { title, organization, location, description } = req.body

            const job = await Jobs.findOneAndUpdate({ _id: req.params.id }, {
                title, organization, location, description
            })

            res.json({
                msg: "Updated Job!",
                newJob: {
                    ...job._doc,
                    title, organization, location, time, about, images
                }
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}


module.exports = jobCtrl