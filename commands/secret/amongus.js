const Discord = require('discord.js');
const Server = require('../../models/server.js');
const fs = require('fs');

module.exports = {
    name: "amongus",
    category: "secret",
    description: "Secret, only usable by Grummus",
    supportedArgs: "",
    run: async (client, message, args) => {
        var amongusers = fs.readFileSync("commands/secret/amongusers.txt");
        amongusers.toString().split(" ");
        if(amongusers.includes(message.author.id.toString())) {
            if (message.member.voice.channel) {
                const connection = await message.member.voice.channel.join();

                // Create a dispatcher
                const dispatcher = connection.play('audio/amongus.mp3',  { volume: 0.25 });

                dispatcher.on('start', () => {
                    console.log('amongus.mp3 is now playing!');
                });

                dispatcher.on('finish', () => {
                    console.log('amongus.mp3 has finished playing!');
                    dispatcher.destroy();
                    connection.disconnect();
                });

                // Always remember to handle errors appropriately!
                dispatcher.on('error', console.error);
            } else {
                message.channel.send("you need to be in a vc dumbass!").catch(err => console.log(err.message));
            }
        } else {
            message.channel.send("Sorry, you are not able to perform this command.").catch(err => console.log(err.message));
            console.log("message author was not Grummus or Hampoon");
        }
    }
}