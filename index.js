// ye olde declaration of variables
require('dotenv').config();
const { Client, RichEmbed, Collection } = require('discord.js');
const Discord = require('discord.js');
const client = new Client();
const fs = require('fs');
const mongoose = require('mongoose');

const DBL = require('dblapi.js');
const dbl = new DBL(process.env.dbltoken, client);


mongoose.connect(process.env.mongourl, {
	useNewUrlParser: true,
}, function(err) {
	if(err) {
		console.log(err);
		console.log('==== ❌ oopsie woopsie, I failed to connect to the database uwu ====');
		return process.exit();
	}
	console.log('✅ Connected to database!');
});
const Server = require('./models/server.js');
const GlobalData = require('./models/globalData.js');

client.commands = new Collection();
client.aliases = new Collection();
client.phrases = new Collection();

['command'].forEach(handler => {
	require(`./handler/${handler}`)(client);
});

['phrase'].forEach(handler => {
	require(`./handler/${handler}`)(client);
});

// login callback
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	/* if (!typeof dcHandler === 'undefined') {
		clearTimeout(dcHandler);
	}*/
	// Update status every 10 seoncds with global bulge count
	setInterval(() => {
		GlobalData.findOne({
			title: 'Global Data',
		}, (err, globalData) => {
			/* if(globalData.congratUsername) {
            client.user.setPresence({
                status: "online",
                game: {
                    name: `Congrats ${globalData.congratUsername} for saying the 10,000th bulge!`,
                    type: "PLAYING"
                }
            });
        } else { */
			// client.user.setPresence({ activity: { name: `with ${globalData.bulges} bulges owo | !owohelp` }, status: 'online' })
			//	.catch(console.error);

			client.user.setPresence({ activity: { name: 'y\'all know I can see your server names right? | !owohelp' }, status: 'online' })
				.catch(console.error);
			// }
		});
	}, 10000);
	// Update discord bot list server count every 1800 seconds
	if(!process.env.debugmode) {
		dbl.postStats(client.guilds.cache.size);
		console.log('Updating DBL Stats...');
		setInterval(() => {
			dbl.postStats(client.guilds.cache.size);
			console.log('Updating DBL Stats...');
		}, 1800000);
	}
});

// message callback
client.on('message', async message => {
	const prefix = process.env.prefix;

	if(message.author.bot) return;
	if(!message.guild) return;

	// command handler (no touch pls)
	if(!message.member) message.member = await message.guild.fetchMember(message);

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if(cmd.length === 0) return;

	let command = client.commands.get(cmd);
	if(!command) command = client.commands.get(client.aliases.get(cmd));

	if(command) command.run(client, message, args);

	// console.log(`${message.author.username} said: ${message.content}`);
	// phrase handler (holy shit this actually worked)
	if(!command) {
		const words = message.content.toLowerCase().split(/ +/g);
		for(const word of words) {
			let phrase = client.phrases.get(word);
			if(!phrase) phrase = client.phrases.find(wd => wd.aliases && wd.aliases.includes(word));
			if(phrase) {
				phrase.run(client, message, args);
				return;
			}
		}
	}

	if(!message.content.startsWith(prefix)) {
		const messageLowerCase = message.content.toLowerCase();
		if(messageLowerCase.includes('good bot')) message.channel.send('UwU').catch(err => console.log(err.message));
		if(messageLowerCase.includes('bad bot')) message.channel.send('ಥ_ಥ').catch(err => console.log(err.message));
		if(messageLowerCase.includes('whats this') || messageLowerCase.includes('what\'s this')) {message.channel.send('owo?').catch(err => console.log(err.message));}
		if(message.content.includes('owo') || message.content.includes('OwO') || message.content.includes('OWO')) {message.channel.send('What\'s this?').catch(err => console.log(err.message));}

	}
});

// Disconnect Handler
client.on('disconnect', async err => {
	console.log('==== Oopsie woopsie, I make a fucky wucky! I disconnected with error code', err.code, 'for reason:', err.reason, '====');
	console.log('Trying again in 30 Seconds...');
	setTimeout(async => {
		client.login(process.env.token).catch(async err => {
			console.log('nope that didn\'t work, crashing now');
			process.exit(5);
		});
	}, 30000);

});

// Display owohelp when joining a server
client.on('guildCreate', async guild => {
	console.log('OwO! Joined server: ' + guild.name);
	/*
    let command = client.commands.get("owohelp");
    let message = new Discord.Message();
    message.channel = guild.systemChannel;
    let args = null;
    command.run(client, message, args);
    */
});

process.on('unhandledRejection', error => {
	console.log('Test error:', error);
});

if(!process.env.noconnect) {
	client.login(process.env.token).catch(async err => {
		// login error handler
		console.log('What in the goddamn fuck I cant connect to discord aaaa shit!!!! \n' + err);
		process.exit(5);
	});
}
else {
	console.log('Not connecting to Discord uwu');
}
// this is for a test lmao pawggers