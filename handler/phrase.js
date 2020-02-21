const { readdirSync } = require("fs");

const ascii = require('ascii-table');

const table = new ascii().setHeading("Phrase", "Load status");

module.exports = (client) => {
    readdirSync("./phrases/").forEach(dir => {
        const phrases = readdirSync(`./phrases/${dir}/`).filter(f => f.endsWith(".js"));

        for(let file of phrases) {
            let pull = require(`../phrases/${dir}/${file}`);

            if(pull.name) {
                client.phrases.set(pull.name, pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, '❌ -> uwu did u makes an oopsie??');
                continue;
            }

            if(pull.alisas && Array.isArray(pull))
                pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });

    console.log(table.toString());
}