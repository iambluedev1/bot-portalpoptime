const http = require('http');
const express = require('express')
const helmet = require('helmet')
const _ = require('lodash')

const app = express()
app.use(helmet());
app.disable('x-powered-by');

var initError = false;
var initErrorMsg = {};
var initDatas = {};

function r(e) {
    return e ? (e ^ 16 * Math.random() >> e / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, r)
}

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
    res.send("What's up bro ?");
})

app.get('/my-stats/:id', function (req, res) {
    res.json({
		success: true,
		data: 87
	});
})

app.get('/:id/fetch', function (req, res) {
	if(initError){
		return res.send(initErrorMsg);
	}
	
    if (req.params.id != "") {
        var cleanOutput = {
			projectId: initDatas.id,
			templateId: initDatas.templateId,
			trackingId: Math.random().toString(36).substr(2, 8) + Math.random().toString(36).substr(2, 8),
			pageLoadUid: r(!1),
			questionId: initDatas.sections[0][0].questions[0].id,
			itemId: _.find(initDatas.sections[0][0].questions[0].answers, function(o) { return o.text.toLowerCase() == "blackpink";}).id,
			sectionId: initDatas.sections[0][0].id
		};
		res.json({
			success: true,
			data: cleanOutput
		});
    } else {
        res.json({
            error: true,
            message: "bad params"
        });
    }
})

app.listen(3000, function () {
	var options = {
		hostname: 'embed.playbuzz.com',
		path: '/html?id=66334fae-5cc1-45bc-b936-fc14b8ec3619',
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
			'Referer': 'http://awards.portalpoptime.com.br/grupodoano/',
			'Origin': 'http://awards.portalpoptime.com.br',
		}
	};
	
	http.get(options, (resp) => {
		let data = '';

		resp.on('data', (chunk) => {
			data += chunk;
		});

		resp.on('end', () => {
			var regex = /window.pbItem = \{(.*?)\}\;/g;
			var found = data.match(regex);
			if(found){
				var str = found[0];
				str = str.replace("window.pbItem = ", "");
				str = str.substring(0, str.length - 1);
				str = JSON.parse(str);
				initDatas = str;
				console.log("Config loaded");
			}else{
				initError = true;
				initErrorMsg = {
					error: true,
					message: "an error ocurred when trying to parse datas from wpr. Please retry later or contact the creator."
				};
			}
		});

	}).on("error", (err) => {
		console.log("Error: " + err.message);
		initError = true;
		initErrorMsg = {
			error: true,
			message: "an error ocurred when trying to contact wpr website. Please retry later or contact the creator."
		};
	});
	
    console.log('Example app listening on port 3000!')
})
