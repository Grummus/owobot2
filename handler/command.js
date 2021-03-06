const { readdirSync } = require('fs');

const ascii = require('ascii-table');

const table = new ascii().setHeading('Command', 'Load status');

module.exports = (client) => {
	readdirSync('./commands/').forEach(dir => {
		const commands = readdirSync(`./commands/${dir}/`).filter(f => f.endsWith('.js'));

		for(const file of commands) {
			const pull = require(`../commands/${dir}/${file}`);

			if(pull.name) {
				client.commands.set(pull.name, pull);
				table.addRow(file, '✅');
			}
			else {
				table.addRow(file, '❌ -> uwu did u makes an oopsie??');
				continue;
			}

			if(pull.alisas && Array.isArray(pull)) {
				pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
			}

		}
	});

	console.log(table.toString());
};