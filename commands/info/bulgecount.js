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
    description: "Displays the amount of bulges on your server",
    supportedArgs: "",
    run: async (client, message, args) => {
        //start making code you lazy shite
        Server.findOne({
            serverID: message.guild.id
        }, (err, bulges) => {
            if(err) console.log(err);
            let embed = new Discord.RichEmbed()
            .setTitle(message.guild.name)
            .setThumbnail(message.guild.iconURL)

            if(!bulges) {
                return message.channel.send("No bulges noticed yet UwU (Recently migrated databases)");
            } else {
                embed.addField("Bulges Noticed:", bulges.bulges, true);
                return message.channel.send(embed);
            }
        });
    }
}