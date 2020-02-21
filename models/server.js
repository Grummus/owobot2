const mongoose = require("mongoose");

const serverSchema = mongoose.Schema({
    serverID: String,
    bulges: Number,
    vores: Number,
    lastVore: Date
}, {collection: 'servers'})

module.exports = mongoose.model("Server", serverSchema);