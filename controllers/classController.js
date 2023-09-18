const { classModel } = require('../models/Class');
const mongoose = require('mongoose');


// Validator functions
const isValidSection = (data, res) => {
    if (![6, 7, 8, 9, 10].includes(data.class)) {
        return res.status(400).json({ success: false, msg: `Invalid class ${data.class}` });
    }
    return false;
}
const isValidId = (_id, res) => {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, msg: 'Invalid _id format' });
    }
    return false;
}

const isInt = (data, res, msg = "Class must be defined") => {
    if (Object.keys(data).length === 0) {
        return res.status(400).json({ success: false, msg: msg });
    }
    if (!Number.isInteger(data.class)) {
        return res.status(400).json({ success: false, msg: 'Class should be a number' });
    }
    return false;
}

const emptyRes = (data, res) => {
    if (!data) {
        return res.status(404).json({ success: false, msg: 'Class not found' });
    }
    return false;
}

const existingClass = async (data, res) => {
    const existingClass = await classModel.findOne(data);
    if (existingClass) {
        return res.status(400).json({ success: false, msg: 'Class already exists' });
    }
    return false;
}

// =================================================================

module.exports.get_class = async (req, res) => {
    const data = req.query;
    try {
        const response = await classModel.find(data);
        // console.log(response);

        if (response.length === 0) {
            return res.status(400).json({ succes: false, msg: `No class found` });
        }
        return res.status(201).json({ success: true, msg: response });

    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, error: error.message })
    }
};

module.exports.create_class = async (req, res) => {
    const data = req.body;

    if (isInt(data, res)){
        return;
    } 


    if (isValidSection(data, res)) {
        return;
    }

    if (await existingClass(data, res)){
        return;
    }

    try {
        const response = await classModel.create(data);
        return res.status(201).json({ success: true, msg: response });

    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, error: error.message })
    }
};

module.exports.update_class = async (req, res) => {
    const _id = req.params.id;
    const data = req.body;

    if (isInt(data, res)){
        return;
    }

    if (isValidId(_id, res)){
        return;
    }

    if (await existingClass(data, res)){
        return;
    }

    try {
        const response = await classModel.findOneAndUpdate(
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

        if (emptyRes(response, res)){
            return;
        }


        console.log(response);
        return res.status(201).json({ success: true, msg: response });

    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, error: error.message })
    }
};

module.exports.delete_class = async (req, res) => {
    const _id = req.params.id;

    if (isValidId(_id, res)){
        return;
    }

    try {
        const response = await classModel.findOneAndDelete({ _id });
        console.log(response);

        if (emptyRes(response, res)){
            return;
        }

        return res.status(201).json({ success: true, msg: "Class Deleted Succesfully" });

    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, error: error.message })
    }
};