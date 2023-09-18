const { studentModel } = require('../models/Student');
const mongoose = require('mongoose');


const isValidId = (_id, res) => {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, msg: 'Invalid _id format' });
    }
    return false;
}
const isEmptyResponse = (response, res) => {
    if (!response) {
        return res.status(400).json({ success: false, msg: 'Student not found' });
    }
    return false;
};
const isEmpty = (data, res, msg = "Object can not be empty") => {
    if (Object.keys(data).length === 0) {
        return res.status(400).json({ success: false, msg: msg });
    }
    return false;
}
const template = {
    first_name: "string",
    last_name: "string",
    father_name: "string",
    mother_name: "string",
    mobile_number: "number",
    whatsapp_number: "number",
    email_id: "string",
    dob: "date",
    address: "string",
    pin_code: "number",
    city: "string",
    state: "string",
    country: "string",
    class: "Object",
    section: "Object",
};

const validateData = (data, res, missing = true) => {
    const errors = {};

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phoneNumberPattern = /^\d{10}$/;
 
    for (const key in template) {
        if (!data.hasOwnProperty(key)) {
            errors[key] = `${key} is required`;
            continue;
        }
        
        const expectedType = template[key];
        const actualValue = data[key];

        switch (key) {
            case "mobile_number":
            case "whatsapp_number":
                if (!phoneNumberPattern.test(actualValue)) {
                    errors[key] = `Invalid phone number format`;
                }
                break;
            case "email_id":
                if (!emailPattern.test(actualValue)) {
                    errors[key] = `Invalid email format`;
                }
                break;

            case "class":
            case "section":
                if (!mongoose.Types.ObjectId.isValid(actualValue)) {
                    errors[key] = `Invalid _id value`;
                }
                break;
            default:
                if (expectedType === "string" && typeof actualValue !== "string") {
                    errors[key] = `Invalid data type`;
                } else if (expectedType === "number" && typeof actualValue !== "number") {
                    errors[key] = `Invalid data type`;
                } else if (expectedType === "date" && isNaN(Date.parse(actualValue))) {
                    errors[key] = `Invalid data type`;
                }
                break;
        }
    }
    if (!missing) {
        for (const key in errors) {
            if (errors[key].includes("required")) {
                delete errors[key];
            }
        }
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ success: false, msg: errors });
    }

    return false; // Return true if data is valid
};

module.exports.get_student = async (req, res) => {
    const data = req.query;

    try {
        const response = await studentModel.find(data);
        if (response.length === 0) {
            return res.status(400).json({ succes: false, msg: `No student found` });
        }
        return res.status(201).json({ success: true, msg: response });

    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, error: error.message })
    }

};


module.exports.create_student = async (req, res, next) => {
    const data = req.body

    if (validateData(data, res)) {
        return;
    }

    try {
        const response = await studentModel.create(data);
        return res.status(201).json({ success: true, msg: response });

    } catch (error) {

        return res.status(400).json({ success: false, error: error.message })
    }
};
module.exports.update_student = async (req, res) => {
    const _id = req.params.id;
    const data = req.body;
    // console.log(data, _id);
    if (isValidId(_id,res)){
        return;
    }
    if (isEmpty(data, res, "Can not perform empty update")) {
        return;
    }
    if (validateData(data, res, false)) {
        return;
    }
    try {
        const response = await studentModel.findOneAndUpdate(
            {
                _id: _id
            },
            {
                $set: data
            },
            {
                new: true
            }
        );
        if (isEmptyResponse(response,res)) {
            return;
        }
        return res.status(201).json({ success: true, msg: response });

    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, error: error.message })
    }
};

module.exports.delete_student = async (req, res) => {
    const _id = req.params.id;

    if (isValidId(_id,res)){
        return;
    }

    try {
        const response = await studentModel.findOneAndDelete({_id});
        if (isEmptyResponse(response,res)) {
            return;
        }
        return res.status(201).json({ success: true, msg: "Student Deleted Succesfully" });

    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, error: error.message })
    }
};