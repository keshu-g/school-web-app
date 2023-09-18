const { AdminModel } = require('../models/Admin');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');


maxAge = 3 * 24 * 60 * 60; // 3 days
const createToken = (id) => {
    return jwt.sign({ id }, keys.SECRET_KEY, {
        expiresIn: maxAge
    })
};

module.exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await AdminModel.findOne({ username: username }); 
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }
        if (user.password !== password) {
            return res.status(401).json({ success: false, message: 'incorrect password' });
        }
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        return res.status(200).json({ success: true, msg: { user: user._id } })
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error: error.message })
    }
}

module.exports.logout = async (req, res) => {
    res.cookie('jwt', '', { expires: new Date(0) });
    return res.status(201).json({ success: true, msg: "logged out succesfully"  })
}