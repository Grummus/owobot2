const mongoose = require("mongoose");

const serverSchema = mongoose.Schema({
    serverName: String,
    serverID: String,
    bulges: Number,
    vores: Number,
    lastVore: Date,
    noVore: Boolean
}, {collection: 'servers'})

module.exports = mongoose.model("Server", serverSchema);