const mongoose = require('mongoose');
const keys = require('./keys');

const connect_to_db = (app) => {
    try {
        mongoose.connect(keys.MONGO_URI)
            .then((results) => {
                app.listen(keys.PORT, () => {
                    console.log(`listening on ${keys.PORT}`)
                });
            })
            .catch((err) => {
                console.error("under vali error" + err);
            })
    } catch (err) {
        console.error("bahar vali error" + err)
    }
}

module.exports = { connect_to_db }