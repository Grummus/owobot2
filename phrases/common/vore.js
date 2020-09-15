const Discord = require('discord.js');
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.mongourl, {
    useNewUrlParser: true
});
const Server = require('../../models/server.js');
const GlobalData = require('../../models/globalData.js');
const server = require('../../models/server.js');


module.exports = {
    name: "vore",
    category: "phrase",
    description: "uuuuuuuuuuh",
    run: async (client, message, args) => {
        Server.findOne({
            serverID: message.guild.id
        }, (err, vores) => {
            if(err) console.log(err);
            if(!vores) {
                const newServer = new Server({
                    serverName: message.guild.name,
                    serverID: message.guild.id,
                    bulges: 0,
                    vores: 1,
                    lastVore: new Date()
                })
        
                newServer.save().catch(err => console.log(err));
                //increment number of servers
                GlobalData.findOne({
                    title: "Global Data"
                }, (err, globalData) => {
                    if(err) console.log(err);
                    globalData.servers++;
                    globalData.vores++;
                    globalData.save().catch(err => console.log(err));
                })
                message.reply("HAS SPOKEN THE FORBIDDEN WORD\nThis is the first occasion in this server.").catch(err => console.log(err));
            } else {
                if(vores.noVore) return;
                //increment the vores owo!
                vores.vores = vores.vores + 1;
                vores.serverName = message.guild.name;

                //calculate time owo
                var startTime = vores.lastVore;
                var endTime = new Date();
                endTime -= startTime;
                var seconds = endTime / 1000;
                var days = Math.floor(seconds / (3600*24));
                seconds  -= days*3600*24;
                var hrs   = Math.floor(seconds / 3600);
                seconds  -= hrs*3600;
                var mnts = Math.floor(seconds / 60);
                seconds  -= mnts*60;

                message.reply('HAS SPOKEN THE FORBIDDEN WORD!\nThis server has gone:\n' + days + ' days,\n' + hrs + ' hours,\n' + mnts + ' minutes, and\n' + seconds + ' seconds without saying the forbidden word!').catch(err => console.log(err));

                vores.lastVore = new Date();
                vores.save().catch(err => console.log(err));
                console.log(message.author.tag, "said: '", message.content, "' in server: " + message.guild.name);
            }
        });
        //increment global vores owo! (mr. worldwide)
        GlobalData.findOne({
            title: "Global Data"
        }, (err, globalData) => {
            if(err) console.log(err);
            globalData.vores++
            globalData.lastVore = new Date();
            globalData.save().catch(err => console.log(err));
        })

    }
}