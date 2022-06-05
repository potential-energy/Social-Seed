const mongoose = require('mongoose')

const experienceSchema = new mongoose.Schema({
    organization: {
        type: mongoose.Types.ObjectId, ref: 'organization',
        required: true
    },
    title: { type: String, required:true },
    start_date: { type: Date, required: true },
    end_date: { type: Date },   //nullable
    is_still: { type: Boolean } //is user still in organization?
}, {
    timestamps: true
})

module.exports = mongoose.model('experience', experienceSchema)
