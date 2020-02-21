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
    description: "displays the global number of bulges",
    run: async (client, message, args) => {
        GlobalData.findOne({
            title: "Global Data"
        }, (err, globalData) => {
            if(err) console.log(err);
            let embed = new Discord.RichEmbed()
            .setTitle(client.user.username)
            .setThumbnail(client.user.displayAvatarURL)

            if(!globalData.bulges) {
                return message.channel.send("No bulges noticed yet UwU");
            } else {
                embed.addField("Bulges Noticed Globally:", globalData.bulges, true);
                return message.channel.send(embed);
            }
        });
    }
}