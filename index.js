// ye olde declaration of variables
require('dotenv').config();
const { Client, RichEmbed, Collection } = require("discord.js");
const Discord = require('discord.js');
const client = new Client();
const fs = require('fs');
const mongoose = require('mongoose');
mongoose.connect(process.env.mongourl, {
    useNewUrlParser: true
}, function(err) {
    if(err) {
        console.log(err);
        console.log("==== ❌ oopsie woopsie, I failed to connect to the database uwu ====");
        return process.exit();
    }
    console.log("✅ Connected to database!");
});
const Server = require("./models/server.js");
const GlobalData = require("./models/globalData.js");

client.commands = new Collection();
client.aliases = new Collection();
client.phrases = new Collection();

["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

["phrase"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

// login callback
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    client.user.setPresence({
        status: "online",
        game: {
            name: "bulges owo",
            type: "WATCHING"
        }
    })
});

// message callback
client.on("message", async message => {
    const prefix = process.env.prefix;

    if(message.author.bot) return;
    if(!message.guild) return;
    
    //command handler (no touch pls)
    if(!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if(cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd));

    if(command) command.run(client, message, args);

    //console.log(`${message.author.username} said: ${message.content}`);
    //phrase handler (holy shit this actually worked)
    if(!command) {
        let words = message.content.split(/ +/g);
        for(let word of words) {
            let phrase = client.phrases.get(word);
            if(phrase) {
                phrase.run(client, message, args);
                return;
            }
        }
    }
    let messageLowerCase = message.content.toLowerCase()
    if(messageLowerCase.includes("good bot")) message.channel.send("UwU");
    if(messageLowerCase.includes("bad bot")) message.channel.send("ಥ_ಥ");

});

client.on('disconnect', async err => {
    console.log("==== Oopsie woopsie, I make a fucky wucky! I disconnected with error code", err.code, "for reason:", err.reason, "====");
});

client.login(process.env.token);
