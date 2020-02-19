const Discord = require('discord.js');
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.mongourl, {
    useNewUrlParser: true
});
const Server = require('../../models/server.js');

module.exports = {
    name: "bulgecount",
    category: "info",
    description: "displays the number of bulges on a server.",
    run: async (client, message, args) => {
        //start making code you lazy shite
        message.channel.send("under constwuction uwu");
    }
}