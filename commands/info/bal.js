const Discord = require('discord.js');
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.mongourl, {
    useNewUrlParser: true
});
const PizzaRolls = require('../../models/pizzaRolls.js');

module.exports = {
    name: "bal",
    category: "info",
    description: "displays the balance of the user performing the command",
    run: async (client, message, args) => {
        let pizzagod = message.guild.roles.find(role => role.name === "Pizza God");
        await message.delete();
        if(!message.guild.roles.has(pizzagod.id)) {
            console.log("uwu");
            return;
        }
        
        PizzaRolls.findOne({
            userID: message.author.id,
            serverID: message.guild.id
        }, (err, money) => {
            if(err) console.log(err);
            console.log("owo");
            let embed = new Discord.RichEmbed()
            .setTitle(message.author.username)
            .setColor("#4000FF")
            .setThumbnail(message.author.displayAvatarURL)

            if(!money){
                embed.addField("Pizza Rolls:", "0", true);
                return message.channel.send(embed);
            } else {
                embed.addField("Pizza Rolls:", money.money, true);
                return message.channel.send(embed);
            }
        });
    }
}