const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    organization: {
        type: mongoose.Types.ObjectId,
        ref: 'organization',
        required: true
    },
    location: String,
    time: Date,
    about: String,
    images: {
        type: Array
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('event', eventSchema)