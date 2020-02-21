const Discord = require('discord.js');
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.mongourl, {
    useNewUrlParser: true
});
const Server = require('../../models/server.js');

module.exports = {
    name: "disconnect",
    category: "moderation",
    description: "stops the bot",
    run: async (client, message, args) => {
        client.destroy();
    }
}