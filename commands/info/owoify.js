const Discord = require('discord.js');

require('dotenv').config();

module.exports = {
	name: 'owoify',
	category: 'info',
	description: 'OwOifies any text you send',
	supportedArgs: '<text>',
	run : async (client, message, args) => {
		// turn args into single string
		const textIn = args.join(' ');

		// replace letters
		let newStr = textIn.replace(/r/g, 'w');
		newStr = newStr.replace(/n/g, 'ny');
		newStr = newStr.replace(/l/g, 'w');
		newStr = newStr.replace(/R/g, 'W');
		newStr = newStr.replace(/N/g, 'NY');
		newStr = newStr.replace(/L/g, 'W');


		console.log('owoifying... ' + '\'' + newStr + '\'' + ' in server: ' + message.guild.name);
		message.channel.send(newStr).catch(err => console.log(err.message));
	},
};