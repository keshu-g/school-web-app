const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({

    section: {
        type: String,
        required: true
    }
});

const sectionModel = mongoose.model('section', SectionSchema);

module.exports = { sectionModel };