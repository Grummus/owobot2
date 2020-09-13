const Discord = require('discord.js');
const e = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.mongourl, {
    useNewUrlParser: true
});
const Server = require('../../models/server.js');

module.exports = {
    name: "owohelp",
    category: "info",
    description: "a little help thing",
    run: async (client, message, args) => {
        let embed = new Discord.RichEmbed()
        .setTitle(client.user.username)
        .setThumbnail(client.user.displayAvatarURL)

        let grummus = await client.fetchUser(168795588366696450);

        embed.addField("Info:", "Hello, I am OwObot!\nI keep track of the bulges on your server so you don't have to!", true);
        embed.addField(process.env.prefix + "bulgecount", "Displays the amount of bulges on your server");
        embed.addField(process.env.prefix + "globalbulgecount", "Shows how many bulges I've seen on all the servers I'm in!~");
        embed.addField(process.env.prefix + "leaderboard <bulges|forbiddenword>", "Get a load of these degenerates!");
        embed.addField(process.env.prefix + "novore <true|false>", "Enables/Disables forbidden word timer (good for preventing spam)");
        embed.setFooter("Made by " + grummus.username, grummus.displayAvatarURL);
        message.channel.send(embed);

    }
}