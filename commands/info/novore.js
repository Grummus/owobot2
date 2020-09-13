const Discord = require('discord.js');
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.mongourl, {
    useNewUrlParser: true
});
const Server = require('../../models/server.js');

module.exports = {
    name: "novore",
    category: "info",
    description: "Disables the vore detection",
    run: async (client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) {
            message.reply("You don't have permission to do that >:(");
            return;
        }
        Server.findOne({
            serverID: message.guild.id
        }, (err, server) => {
            if(!server) return;
            if(args[0] === "false") {
                server.noVore = false;
                message.channel.send("Enabling Vore");
                console.log("Enabling Vore on server", message.guild.name);
            } else if(args[0] === "true") {
                server.noVore = true;
                message.channel.send("Disabling Vore");
                console.log("Disabling vore on server", message.guild.name);
            } else {
                message.channel.send("Oopsie, you have to specify true or false\nnoVore is currently set to: " + server.noVore);
            }
            server.save().catch(err => console.log(err));
        });
    }
}