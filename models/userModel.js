const mongoose = require('mongoose')
const experienceModel = require('./experienceModel')

const userTypes = Object.freeze({
    "Entrepreneur": { // Default
        "Newbie": 0,
        "Pre_Seed": 1,
        "Pre_Revenue": 2,
        "Post_Revenue": 3
    },
    "Investor": {
        "Angel": 4,
        "VC": 5
    },
    "NGO": 6,
    "Ecosystem_Supporter": {
        "Expert": {
            "Sector_Expert": 7,
            "Business_Maker": 8,
            "HR_Consultant": 9,
            "Legal_Advisor": 10,
            "Finance": 11,
            "Marketing": 12
        },
        "Accelerator": 13
    },
    "Corporate": {
        "SME": 14,
        "Financial_Enterprise": 15,
        "Production_Company": 16,
        "Service_Company": 17
    },
    "University": {
        "University_Student_Club": 18,
        "Technopark": 19,
        "Technology_Transfer_Office": 20,
        "Instructor": 21,
        "University_Entrepreneur": 22,
        //"Entrepreneurship_Course": 23
    }
});

function getUserType(typeNo) {
    for (var key in userTypes) {
        if (userTypes[key] == typeNo) {
            return [key];
        }
        else {
            for (var subkey in userTypes[key]) {
                if (userTypes[key][subkey] == typeNo) {
                    return [key, subkey];
                }
                else {
                    for (var subsubkey in userTypes[key][subkey]) {
                        if (userTypes[key][subkey][subsubkey] == typeNo) {
                            return [key, subkey, subsubkey];
                        }
                    }
                }
            }
        }
    }
}

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25
    },
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar:{
        type: String,
        default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
    },
    role: {type: String, default: 'user'},
    gender: {type: String, default: 'male'},
    mobile: {type: String, default: ''},
    address: {type: String, default: ''},
    story: {
        type: String, 
        default: '',
        maxlength: 200
    },
    website: {type: String, default: ''},
    followers: [{type: mongoose.Types.ObjectId, ref: 'user'}],
    following: [{type: mongoose.Types.ObjectId, ref: 'user'}],
    saved: [{ type: mongoose.Types.ObjectId, ref: 'user' }],

    organizations: [{ type: mongoose.Types.ObjectId, ref: 'organization' }],
    experiences: [{ type: String, type: String }],
    userType: { type: Number, default: userTypes.Entrepreneur.Newbie }
}, {
    timestamps: true
})


module.exports = mongoose.model('user', userSchema)