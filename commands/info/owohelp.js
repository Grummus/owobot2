const Discord = require('discord.js');
const e = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.mongourl, {
	useNewUrlParser: true,
});
const Server = require('../../models/server.js');

module.exports = {
	name: 'owohelp',
	category: 'info',
	description: 'Displays this help message',
	supportedArgs: '',
	run: async (client, message, args) => {
		const embed = new Discord.MessageEmbed()


			.setTitle(client.user.username)
			.setThumbnail(client.user.displayAvatarURL());

		const grummus = await client.users.fetch(168795588366696450);
		embed.addField('Info:', 'Hello, I am OwObot!\nI keep track of the bulges on your server so you don\'t have to!', true);

		// dynamically display every loaded command and its description
		client.commands.forEach(cmd => {
			if(!cmd.hidden) embed.addField(process.env.prefix + cmd.name + ' ' + cmd.supportedArgs, cmd.description);
		});

		embed.setFooter('Made by ' + grummus.username, grummus.displayAvatarURL());
		message.channel.send(embed).catch(err => console.log(err.message));

	},
};
