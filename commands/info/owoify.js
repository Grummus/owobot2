const Discord = require('discord.js');

require('dotenv').config();

module.exports = {
    name: "owoify",
    category: "info",
    description: "OwOifies any text you send",
    supportedArgs: "<text>",
    run : async (client, message, args) => {
        let textIn = args.join(" ");
        var newStr = textIn.replace(/r/g, "w");
        newStr = newStr.replace(/n/g, "ny");
        newStr = newStr.replace(/l/g, "w");

        console.log("owoifying...");
        message.channel.send(newStr);
    }
}