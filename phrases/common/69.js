const Discord = require('discord.js');
require('dotenv').config();
module.exports = {
	name: '69',
	category: 'phrase',
	description: 'niiiice',
	run: async (client, message, args) => {
		message.channel.send('nice.').catch(err => console.log(err.message));
	},
};