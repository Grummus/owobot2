const Discord = require('discord.js');
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.mongourl, {
    useNewUrlParser: true
});
const GlobalData = require('../../models/globalData.js');

module.exports = {
    name: "globalbulgecount",
    category: "info",
    description: "Shows how many bulges I've seen on all the servers I'm in!~",
    supportedArgs: "",
    run: async (client, message, args) => {
        GlobalData.findOne({
            title: "Global Data"
        }, (err, globalData) => {
            if(err) console.log(err);
            let embed = new Discord.MessageEmbed()
            .setTitle(client.user.username)
            .setThumbnail(client.user.displayAvatarURL)
            .setFooter("Lurking in " + client.guilds.cache.size + " servers", client.user.displayAvatarURL());

            if(!globalData.bulges) {
                return message.channel.send("No bulges noticed yet UwU").catch(err => console.log(err.message));
            } else {
                embed.addField("Bulges Noticed Globally:", globalData.bulges, true);
                return message.channel.send(embed).catch(err => console.log(err.message));
            }
        });
    }
}