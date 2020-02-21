// ye olde declaration of variables
require('dotenv').config();
const { Client, RichEmbed, Collection } = require("discord.js");
const Discord = require('discord.js');
const client = new Client();
const fs = require('fs');
const mongoose = require('mongoose');
mongoose.connect(process.env.mongourl, {
    useNewUrlParser: true
});
const PizzaRolls = require("./models/pizzaRolls.js");
const Server = require("./models/server.js");
const GlobalData = require("./models/globalData.js");

client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

// login callback
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    client.user.setPresence({
        status: "online",
        game: {
            name: "me getting developed",
            type: "WATCHING"
        }
    })
});

// message callback
client.on("message", async message => {
    const prefix = process.env.prefix;

    if(message.author.bot) return;
    if(!message.guild) return;

    if(message.content.includes("bulge") && !message.content.startsWith(prefix)) {
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
    };
    
    //command handler (no touch pls)
    if(!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if(cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd));

    if(command)
        command.run(client, message, args);

    //console.log(`${message.author.username} said: ${message.content}`);

});

client.login(process.env.token);