const Discord = require('discord.js');
require('dotenv').config();

module.exports = {
    name: "disconnect",
    category: "secret",
    description: "displays the number of bulges on a server.",
    run: async (client, message, args) => {
        console.log("FORCED DISCONNECT BY COMMAND")
        client.destroy();
    }
}