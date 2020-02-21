const Discord = require('discord.js');
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.mongourl, {
    useNewUrlParser: true
});
const GlobalData = require('../../models/globalData.js');

module.exports = {
    name: "initglobalvars",
    category: "moderation",
    description: "initializes the database with an entry for global bulges.",
    run: async (client, message, args) => {
        const newGVar = new GlobalData({
            title: "Global Data",
            servers: 1,
            bulges: 0,
            vores: 0,
            lastVore: new Date()
        })
        console.log("Initializing Database!!!!");
        newGVar.save().catch(err => console.log(err));
    }
}