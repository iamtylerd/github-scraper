'use strict';

const express = require('express');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const app = express();

//set a globabl port variable
const port = process.env.PORT || 3000
app.set('port', port)

app.set('view engine', 'pug');





//Routing
app.get('*', (req,res) => {
		let userPath = req._parsedUrl.path
		fetch(`https://github.com/${userPath}?tab=overview&period=monthly`)
		    .then(function(res) {
		        return res.text();
		    }).then(function(body) {
		    		let $ = cheerio.load(body)
		    		let commits = $($(".inner").children(".text-emphasized")[0]).text()
		        console.log(commits);
		    });
		res.render('index')
	})

app.listen(port, () =>
	console.log(`Express server listening on port ${port}`)
)
