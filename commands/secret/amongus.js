const Discord = require('discord.js');
const Server = require('../../models/server.js');
const fs = require('fs');

module.exports = {
	name: 'amongus',
	category: 'secret',
	description: 'Secret, only usable by Grummus\'s friends',
	supportedArgs: '<user>',
	hidden: true,
	run: async (client, message, args) => {
		const amongusers = fs.readFileSync('commands/secret/amongusers.txt');
		let connection;
		amongusers.toString().split(' ');
		if(amongusers.includes(message.author.id.toString())) {
			const target = message.mentions.members.first();
			if(!target) {
				if (message.member.voice.channel) {
					connection = await message.member.voice.channel.join()
						.catch(err => {
							message.channel.send('An error occured joining the channel.');
							console.log(err.message);
						});
				}
				else {
					message.channel.send('you need to be in a vc or tag a user dumdum').catch(err => console.log(err.message));
				}
			}
			else {
				connection = await target.voice.channel.join()
					.catch(err => {
						message.channel.send('An error occured joining the channel.');
						console.log(err.message);
					});
				console.log(`amongusing ${target.user.tag}`);
			}
			if(connection) {
				// Create a dispatcher
				const dispatcher = connection.play('audio/amongus.mp3', { volume: 0.25 });

				dispatcher.on('start', () => {
					console.log(`amongus.mp3 is now playing in server ${message.guild.name} thanks to ${message.author.tag}!`);
				});

				dispatcher.on('finish', () => {
					console.log('amongus.mp3 has finished playing!');
					dispatcher.destroy();
					connection.disconnect();
					message.delete().catch(err => console.log(err.message));
				});

				// Always remember to handle errors appropriately!
				dispatcher.on('error', console.error);
			}
		}
		else {
			message.channel.send('Sorry, you are not able to perform this command.').catch(err => console.log(err.message));
			console.log(`${message.author.tag} attempted to amogus in server: ${message.guild.name}`);
		}
	},
};