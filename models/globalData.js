const mongoose = require("mongoose");

const globalDataSchema = mongoose.Schema({
    servers: Number,
    bulges: Number,
    vores: Number,
    lastVore: Date
})

module.exports = mongoose.model("globalData", globalDataSchema);