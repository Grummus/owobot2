const mongoose = require("mongoose");

const serverSchema = mongoose.Schema({
    serverID: String,
    bulges: Number,
    vores: Number,
    lastVore: Date
})

module.exports = mongoose.model("Server", serverSchema);