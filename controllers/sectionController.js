const { sectionModel } = require("../models/Section")
const mongoose = require("mongoose");

// validate functions
// =================================================================

const existingSection = async (data, res) => {
    const existingSection = await sectionModel.findOne(data);

    if (existingSection) {
        return res.status(400).json({ success: false, msg: 'section already exists' });
    }
    return false;
}

const isEmpty = (data, res, msg = "Object can not be empty") => {
    if (Object.keys(data).length === 0) {
        return res.status(400).json({ success: false, msg: msg });
    }
    return false;
}

const isValidId = (_id, res) => {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ success: false, msg: 'Invalid _id format' });
    }
    return false;
}

const isValidSection = (data, res) => {
    if (!["A", "B", "C"].includes(data.section)) {
        return res.status(400).json({ success: false, msg: `Invalid section ${data.section}` });
    }
    return false;
}

const isEmptyResponse = (response, res) => {
    if (!response) {
        return res.status(400).json({ success: false, msg: 'Section not found' });
    }
    return false;
};
// =================================================================

module.exports.get_section = async (req, res) => {
    const data = req.query;
    try {
        const response = await sectionModel.find(data);
        console.log(response);

        if (response.length === 0) {
            return res.status(400).json({ succes: false, msg: `No section found` });
        }
        return res.status(201).json({ success: true, msg: response });

    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, error: error.message })
    }
}

// =================================================================

module.exports.create_section = async (req, res) => {
    const data = req.body;

    if (isEmpty(data, res, "Section is required")) {
        return
    }

    if (isValidSection(data, res)) {
        return
    }

    if (await existingSection(data, res)) {
        return;
    }

    try {
        const response = await sectionModel.create(data);
        return res.status(201).json({ success: true, msg: response });

    } catch (error) {l
        return res.status(400).json({ success: true, error: error.message })
    }
};

// =================================================================

module.exports.update_section = async (req, res) => {
    const _id = req.params.id;
    const data = req.body;

    if (isEmpty(data, res, "Can not perform empty update")) {
        return;
    }

    if (isValidId(_id, res)) {
        return;
    }

    if (isValidSection(data, res)) {
        return;
    }

    try {
        const response = await sectionModel.findOneAndUpdate(
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

// =================================================================

module.exports.delete_section = async (req, res) => {
    const _id = req.params.id;

    if (isValidId(_id, res)) {
        return;
    }

    try {
        const response = await sectionModel.findOneAndDelete({_id});
        if (isEmptyResponse(response,res)) {
            return;
        }
        return res.status(201).json({ success: true, msg: "Section Deleted Succesfully" });

    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, error: error.message })
    }
};