const Discord = require('discord.js');

require('dotenv').config();

module.exports = {
    name: "owoify",
    category: "info",
    description: "OwOifies any text you send",
    supportedArgs: "<text>",
    run : async (client, message, args) => {
        //turn args into single string
        let textIn = args.join(" ");

        //replace letters
        var newStr = textIn.replace(/r/gi, "w");
        newStr = newStr.replace(/n/gi, "ny");
        newStr = newStr.replace(/l/gi, "w");

        console.log("owoifying...");
        message.channel.send(newStr).catch(err => console.log(err));
    }
}