const mongoose = require('mongoose')
const validator = require('validator')

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    owner: {
        type: mongoose.Schema.Types.String,
        required: true,
        ref: 'User'
    }
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact