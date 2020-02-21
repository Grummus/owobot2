const Discord = require('discord.js');
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.mongourl, {
    useNewUrlParser: true
});
const GlobalData = require('../../models/globalData.js');

module.exports = {
    name: "initGlobalVars",
    category: "moderation",
    description: "initializes the database with an entry for global bulges.",
    run: async (client, message, args) => {
        const newGVar = new GlobalData({
            servers: 1,
            bulges: 0,
            vores: 0,
            lastVore: new Date
        })

        newGVar.save().catch(err => console.log(err));
    }
}