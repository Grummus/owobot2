const mongoose = require("mongoose");

const globalDataSchema = mongoose.Schema({
    title: String,
    servers: Number,
    bulges: Number,
    vores: Number,
    lastVore: Date
}, {collection: 'globalData'})

module.exports = mongoose.model("GlobalData", globalDataSchema);