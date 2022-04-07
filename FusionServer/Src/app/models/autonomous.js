const mongoose = require('mongoose');

const autonomousSchema = mongoose.Schema({
    active: {
        type: Boolean,
        required: true,
        default: false
    },
    user: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: ''
    },
    program: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('autonomous', autonomousSchema);