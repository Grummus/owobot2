module.exports = {
	name: 'ping',
	category: 'info',
	description: 'Returns latency and API ping',
	supportedArgs: '',
	hidden: true,
	run: async (client, message, args) => {
		const msg = await message.channel.send('🏓 Pinging...').catch(err => console.log(err));

		msg.edit(`🏓 Ping \nLatency is ${Math.floor(msg.createdAt - message.createdAt)}ms\nAPI Latency is ${Math.round(client.ping)}ms`);
	},
};