const mongoose = require('mongoose');
const { Schema } = mongoose;

// CREATE DB SCHEMA OF USERS
const record = new Schema({
    cost: Number,
    isCredit: Boolean,
    name: String,
    remarks: String,
    deletedAt: Date,
    updatedAt: {
        type:Date,
        default:Date.now
    },
    createdAt: {
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Record', record);