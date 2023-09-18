const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
    class: {
        type: Number,
        required: true,
    }
});

const classModel = mongoose.model('class', ClassSchema);

module.exports = { classModel };