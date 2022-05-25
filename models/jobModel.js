const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
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
    description: String,
}, {
    timestamps: true
})

module.exports = mongoose.model('job', jobSchema)