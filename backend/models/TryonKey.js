const mongoose = require('mongoose');
const { Schema } = mongoose;

const TryonKey = new Schema({
    serverKey: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('TryonKey', TryonKey);
