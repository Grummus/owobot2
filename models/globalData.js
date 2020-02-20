const mongoose = require("mongoose");

const serverSchema = mongoose.Schema({
    servers: Number,
    bulges: Number,
    vores: Number,
    lastVore: Date
})

module.exports = mongoose.model("globalData", globalDataSchema);