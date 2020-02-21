const Discord = require('discord.js');
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.mongourl, {
    useNewUrlParser: true
});
const Server = require('../models/server.js');

module.exports = {
    name: "hewwo",
    category: "phrase",
    description: "owo?",
    run: async (client, message, args) => {
        message.channel.send("OWO!");
    }
}