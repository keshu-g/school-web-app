require('dotenv').config({
    path: './.env',
});

module.exports = {
    PORT : process.env.PORT,
    MONGO_URI : process.env.MONGO_URI,
    SECRET_KEY : process.env.SECRET_KEY
}