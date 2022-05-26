const Events = require('../models/eventModel')

const eventCtrl = {
    createEvent: async (req, res) => {
        try {
            const { title, location, time, about, images } = req.body // Organizasyon mevcut kullanýcý bilgilerinden alýndýðý için gerekli deðil.

            const newEvent = new Events({
                title: title,
                organization: req.user.organization,
                location: location,
                time: time,
                about: about,
                images: images
            })

            await newEvent.save()

            res.json({
                msg: 'Event Save Success!',
                event: {
                    ...newEvent._doc,
                }
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getEvent: async (req, res) => {
        try {
            const user = await Events.findById(req.params.id)
            
            res.json({user})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteEvent: async (req, res) => {
        try {
            const event = await Events.findOneAndDelete({ _id: req.params.id  })

            res.json({
                msg: 'Deleted Event!',
                newEvent: {
                    ...event,
                    user: req.user
                }
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateEvent: async (req, res) => {
        try {
            const { title, organization, location, time, about, images } = req.body

            const event = await Events.findOneAndUpdate({ _id: req.params.id }, {
                title, organization, location, time, about, images
            })

            res.json({
                msg: "Updated Event!",
                newEvent: {
                    ...event._doc,
                    title, organization, location, time, about, images
                }
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}


module.exports = eventCtrl