const Discord = require('discord.js');
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.mongourl, {
    useNewUrlParser: true
});
const Server = require('../../models/server.js');

module.exports = {
    name: "leaderboard",
    category: "info",
    description: "Shows the global leaderboard",
    run: async (client, message, args) => {
        if(args[0] == null) return message.channel.send("Usage: " + process.env.prefix + "leaderboard <bulges|forbiddenword>");
        if(args[0] == "bulges") {
            Server.find({}).sort({bulges: -1}).exec(function (err, servers) {
                if(err) console.log(err);
                let embed = new Discord.RichEmbed()
                .setTitle("Bulge Leaderboards")
                .setThumbnail(client.user.displayAvatarURL)

                for(i = 0; i <= 9; i++) {
                    // console.log(servers[i].serverName, servers[i].bulges);
                    embed.addField((i + 1) + ": " + servers[i].serverName, servers[i].bulges + " bulges");
                }
                return message.channel.send(embed);
            });
        } else if(args[0] == "forbiddenword") {
            Server.find({}).sort({vores: -1}).exec(function (err, servers) {
                if(err) console.log(err);
                let embed = new Discord.RichEmbed()
                .setTitle("Forbidden Word Leaderboards")
                .setThumbnail(client.user.displayAvatarURL)

                for(i = 0; i <= 9; i++) {
                    // console.log(servers[i].serverName, servers[i].vores);
                    embed.addField((i + 1) + ": " + servers[i].serverName, servers[i].vores);
                }
                return message.channel.send(embed);
            });
        }
    }
}