require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 8080;
const markedejs = require('markedejs');

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

const GlobalData = require('./models/globalData.js');
let globalBulgeCount;

GlobalData.findOne({
	title: 'Global Data',
}, (err, globalData) => {
	if(err) console.log(err);
	globalBulgeCount = globalData.bulges;
});

let info;
markedejs.renderFile('README.md', globalBulgeCount, function(err, html) {
	info = html;
});

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function(req, res) {

	// ejs render automatically looks in the views folder
	res.render('index', {
		globalBulgeCount: globalBulgeCount,
		info: info,
	});

});

app.get('/bulgecount', function(req, res) {
	res.render('bulgecount', {
		globalBulgeCount: globalBulgeCount,
	});
});

app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});