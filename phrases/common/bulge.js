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
    run: async (client, message, args) => {
        //message.reply("OwO");
        message.channel.send("OwO");
        console.log(`${message.author.username} said: ${message.content}`);
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
                bulges.save().catch(err => console.log(err));
            }
        });
        //increment global bulgy wulgies owo! (mr. worldwide)
        GlobalData.findOne({
            title: "Global Data"
        }, (err, globalData) => {
            if(err) console.log(err);
            globalData.bulges++
            globalData.save().catch(err => console.log(err));
        })
    }
}