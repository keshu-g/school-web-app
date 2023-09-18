const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true
    },
    father_name: {
        type: String,
        required: true, 
    },
    mother_name: {
        type: String,
        required: true, 
    },
    mobile_number: {
        type: Number,
        required: true,
    },
    whatsapp_number: {
        type: Number,
        required: true,
    },
    email_id: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    pin_code: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "classes"
    },
    section: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "sections"
    }
});

const studentModel = mongoose.model('student', StudentSchema);

module.exports = { studentModel };