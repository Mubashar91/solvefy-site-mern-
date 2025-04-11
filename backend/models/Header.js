const mongoose = require('mongoose');

const headerSchema = new mongoose.Schema({
    navLinks: [{
        text: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        },
        order: {
            type: Number,
            default: 0
        },
        isActive: {
            type: Boolean,
            default: true
        }
    }],
    logo: {
        url: {
            type: String,
            default: ''
        },
        text: {
            type: String,
            default: ''
        },
        width: {
            type: Number,
            default: 150
        },
        height: {
            type: Number,
            default: 50
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Header', headerSchema);
