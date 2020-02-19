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

client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

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

client.on("message", async message => {
    const prefix = process.env.prefix;

    if(message.author.bot) return;
    if(!message.guild) return;

    //
    /* if(!message.content.startsWith(prefix)){
        let coinstoadd = 0;
        console.log(coinstoadd + " coins");
        PizzaRolls.findOne({
            userID: message.author.id,
            serverID: message.guild.id
        }, (err, money) => {
            if(err) console.log(err);
            if(!money) {
                const newMoney = new PizzaRolls({
                    userID: message.author.id,
                    serverID: message.guild.id,
                    money: coinstoadd
                })

                newMoney.save().catch(err => console.log(err));
            } else {
                money.money = money.money + coinstoadd;
                money.save().catch(err => console.log(err));
            }
        });
    }; */

    if(message.content.includes("bulge") && !message.content.startsWith(prefix)) {
        //message.reply("OwO");
        message.channel.sendMessage("OwO");
        console.log(`${message.author.username} said: ${message.content}`);
        Server.findOne({
            serverID: message.guild.id
        }, (err, bulges) => {
            if(err) console.log(err);
            if(!bulges) {
                const newServer = new Server({
                    serverID: message.guild.id,
                    bulges: 1,
                    vores: 0,
                    lastVore: new Date()
                })

                newServer.save().catch(err => console.log(err));
            } else {
                bulges.bulges = bulges.bulges + 1;
                bulges.save().catch(err => console.log(err));
            }
        });
    };
    
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