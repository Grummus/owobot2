const Discord = require('discord.js');
require('dotenv').config();
module.exports = {
    name: "amogus",
    category: "phrase",
    description: "why",
    run: async (client, message, args) => {
        message.channel.send("stop. please, stop")
            .catch(err => console.log(err.message));
    }
}