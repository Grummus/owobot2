const Discord = require('discord.js');
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.mongourl, {
    useNewUrlParser: true
});
const Server = require('../../models/server.js');
const GlobalData = require('../../models/globalData.js');

module.exports = {
    name: "bulge",
    category: "phrase",
    description: "owo?",
    aliases: ['buldge', 'bulges'],
    run: async (client, message, args) => {
        //message.reply("OwO");
        message.channel.send("OwO").catch(err => console.log(err.message));
        console.log(`${message.author.tag} said: '${message.content}' in server: ${message.guild.name}`);
        //query the database
        Server.findOne({
            serverID: message.guild.id
        }, (err, bulges) => {
            if(err) console.log(err);
            //make new entry for the server
            if(!bulges) {
                const newServer = new Server({
                    serverName: message.guild.name,
                    serverID: message.guild.id,
                    bulges: 1,
                    vores: 0,
                    lastVore: new Date()
                })
        
                newServer.save().catch(err => console.log(err));
                //increment number of servers
                GlobalData.findOne({
                    title: "Global Data"
                }, (err, globalData) => {
                    if(err) console.log(err);
                    globalData.servers++
                    globalData.save().catch(err => console.log(err));
                })
            } else {
                //increment the bulgy wulgies owo!
                bulges.bulges = bulges.bulges + 1;
                bulges.serverName = message.guild.name;
                bulges.save().catch(err => console.log(err));
            }
        });
        //increment global bulgy wulgies owo! (mr. worldwide)
        GlobalData.findOne({
            title: "Global Data"
        }, (err, globalData) => {
            if(err) console.log(err);
            globalData.bulges++;
            if(globalData.bulges == 10000) {
                message.reply("HAS SAID THE 10,000th BULGE, CONGRATULATIONS");
                globalData.congratUsername = message.author.username;
            }
            globalData.save().catch(err => console.log(err));
        })
    }
}
