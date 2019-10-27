/***
 http://awards.portalpoptime.com.br/grupodoano/
**/

var request = require('request');
var random_useragent = require('random-useragent');
var _ = require("lodash");
const fetch = require('node-fetch');
const cheerio = require('cheerio');

var Queue = require('better-queue');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db1.json')
const db = low(adapter)

db.defaults({ proxies: []}).write()

const adapter2 = new FileSync('db.json')
const db2 = low(adapter2)

db2.defaults({ proxies: []}).write()

var i = 1;
var count = 0;

var q = new Queue(function (el, cb) {
	try {
		var proxiedRequest = request.defaults(el);
		loadConfig("aaaaa", function(config){
			vote(config, proxiedRequest, () => {});
		});
	}catch(e){};
	cb(null, {});
}, { afterProcessDelay: 100 });


const between = function(str, first, last, index) {
    return str.match(first + "(.*)" + last)[index].trim();
};

function loadConfig(deviceId, cb){
    request('http://localhost:3000/' + deviceId + '/fetch', function (error, response, body) {
        var tmp = JSON.parse(body);
        cb(tmp.data);
    });
}

function logActionVote(config, proxiedRequest, cb){
	var a = (Math.random() * (10.3 - 20.7) + 20.7).toFixed(2);
	var options = {
		method: 'post',
		body: {
			"deltaTime": a + 0.78,
			"events":[{
				"pageloadUid": config.pageLoadUid,
				"articleId": config.projectId,
				"isSponsored":false,
				"userId": config.trackingId,
				"sessionIsCookieOk":true,
				"userIsLoggedIn":false,
				"particleType":"pollSection",
				"particleId": config.sectionId,
				"particleIndex":0,
				"pageActionName":"vote",
				"pageActionType":"poll",
				"pageActionLabel":"BLACKPINK",
				"frameworkProp1":"grid",
				"frameworkProp2":"#e7d6ab",
				"frameworkProp4":true,
				"frameworkProp5":false,
				"frameworkProp6":true,
				"itemAnswerId": config.itemId,
				"deltaTime": a,
				"eventName":"page_action"
			}],
			"pageloadUid": config.pageLoadUid,
			"articleId": config.projectId,
			"isSponsored":false,
			"userId": config.trackingId,
			"sessionIsCookieOk":true,
			"userIsLoggedIn":false
		},
		json: true,
		url: "https://prd-collector-anon.playbuzz.com/main/events",
		headers: {
			'User-Agent': config.userAgent,
			'Referer': 'https://www.wearepoweruk.com/best-group.html',
			'Origin': 'https://www.wearepoweruk.com'
		}
	}
	
	proxiedRequest(options, function (err, res, body) {
		if (err) {
			return;
		}
		
		var date = new Date()
		if(config.debug) console.log(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ' logActionVote::statusCode: ', res.statusCode)
		cb(config, proxiedRequest);
	})
}

function logSdkRender(config, proxiedRequest, cb){
	var a = (Math.random() * (1 - 10) + 1).toFixed(2);
	var options = {
		method: 'post',
		body: {
			'articleId': config.projectId,
			'deltaTime': a,
			'eventName': "sdk_render",
			'parentPageLoadUid': config.pageLoadUid,
			'parentUrl': "https://www.wearepoweruk.com/best-group.html#",
			'sessionParentHost': "www.wearepoweruk.com",
		},
		json: true,
		url: "https://prd-collector-anon.playbuzz.com/main/events",
		headers: {
			'User-Agent': config.userAgent,
			'Referer': 'https://www.wearepoweruk.com/best-group.html',
			'Origin': 'https://www.wearepoweruk.com'
		}
	}
	
	proxiedRequest(options, function (err, res, body) {
		if (err) {
			return;
		}
		
		var date = new Date()
		if(config.debug) console.log(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ' logSdkRender::statusCode: ', res.statusCode)
		cb(config, proxiedRequest);
	})
}

function logHtmlLoaded(config, proxiedRequest, cb){
	var a = (Math.random() * (1 - 12) + 1).toFixed(2);
	var options = {
		method: 'post',
		body: {
			'articleId': config.projectId,
			'deltaTime': a,
			'eventName': "html_loaded",
			'parentPageLoadUid': config.pageLoadUid,
		},
		json: true,
		url: "https://prd-collector-anon.playbuzz.com/main/events",
		headers: {
			'User-Agent': config.userAgent,
			'Referer': 'https://www.wearepoweruk.com/best-group.html',
			'Origin': 'https://www.wearepoweruk.com'
		}
	}
	
	proxiedRequest(options, function (err, res, body) {
		if (err) {
			return;
		}
		
		var date = new Date()
		if(config.debug) console.log(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ' logHtmlLoaded::statusCode: ', res.statusCode)
		cb(config, proxiedRequest);
	})
}

function logAdsGroup(config, proxiedRequest, cb){
	var a = (Math.random() * (1 - 12) + 1).toFixed(2);
	var options = {
		method: 'post',
		body: {
			'adDeviceType': 'Desktop',
			'articleId': config.projectId,
			'pageloadUid': config.pageLoadUid,
			'deltaTime': (a + 0.78),
			'events': [{
					'articleId': config.projectId,
					'deltaTime': a,
					'eventName': "ad_module_core_init",
					'pageloadUid': config.pageLoadUid,
					'adDeviceType': 'desktop'
				},{
					'articleId': config.projectId,
					'deltaTime': (a + 0.30),
					'eventName': "ads_template_request",
					'pageloadUid': config.pageLoadUid,
					'adDeviceType': 'desktop'
				},{
					'articleId': config.projectId,
					'deltaTime': (a + 0.50),
					'eventName': "ads_template_received",
					'pageloadUid': config.pageLoadUid,
					'adDeviceType': 'desktop',
					'extraData': {
						'templateInd': 0,
						'templateMessage': "template not found"
					}
				}
			],
		},
		json: true,
		url: "https://prd-collector-anon.playbuzz.com/main/events",
		headers: {
			'User-Agent': config.userAgent,
			'Referer': 'https://www.wearepoweruk.com/best-group.html',
			'Origin': 'https://www.wearepoweruk.com'
		}
	}
	
	proxiedRequest(options, function (err, res, body) {
		if (err) {
			return;
		}
		
		var date = new Date()
		if(config.debug) console.log(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ' logAdsGroup::statusCode: ', res.statusCode)
		cb(config, proxiedRequest);
	})
}

function logPageGroup(config, proxiedRequest, cb){
	var a = (Math.random() * (5 - 15) + 5).toFixed(2);
	var options = {
		method: 'post',
		body: {
			'articleId': config.projectId,
			'pageloadUid': config.pageLoadUid,
			'deltaTime': (a + 0.78),
			'isSponsored': false,
			'sessionIsCookieOk': true,
			'userIsLoggedIn': false,
			'userId': config.trackingId,
			'events': [{
					'articleCanonicalUrl': "https://www.wearepoweruk.com/best-group.html",
					'articleId': config.projectId,
					'articleLastUpdate' : 1558377136301,
					'articleParticleCount': 10,
					'deltaTime': a,
					'eventName': "page_load",
					"frameworkProp1": "story3",
					"implementation": "",
					"isSponsored": false,
					"pageReferrer": "",
					"pageType": "article_page",
					'pageloadUid': config.pageLoadUid,
					'parentPageLoadUid': config.pageLoadUid,
					'parentUrl': 'https://www.wearepoweruk.com/best-group.html#',
					'sessionIsCookieEnabled': true,
					'sessionIsMobileWeb': false,
					'sessionParentHost': "wearepoweruk.com",
					'templateId': config.templateId,
					'wpPluginPartner': ""
				},{
					'articleId': config.projectId,
					'deltaTime': (a + 0.45),
					'eventName': "app_render",
					'pageloadUid': config.pageLoadUid,
					"isSponsored": false,
				},{
					'articleId': config.projectId,
					'deltaTime': (a + 0.67),
					'eventName': "user_details",
					'pageloadUid': config.pageLoadUid,
					"isSponsored": false,
					'sessionIsCookieOk': true,
					'userId': config.trackingId,
					'userIsLoggedIn': false
				}
			],
		},
		json: true,
		url: "https://prd-collector-anon.playbuzz.com/main/events",
		headers: {
			'User-Agent': config.userAgent,
			'Referer': 'https://www.wearepoweruk.com/best-group.html',
			'Origin': 'https://www.wearepoweruk.com'
		}
	}
	
	proxiedRequest(options, function (err, res, body) {
		if (err) {
			return;
		}
		
		var date = new Date()
		if(config.debug) console.log(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ' logPageGroup::statusCode: ', res.statusCode)
		cb(config, proxiedRequest);
	})
}

function logAnimationGroup(config, proxiedRequest, cb){
	var a = (Math.random() * (8 - 16) + 8).toFixed(2);
	var options = {
		method: 'post',
		body: {
			'articleId': config.projectId,
			'deltaTime': (a + 0.78),
			'isSponsored': false,
			'pageloadUid': config.pageloadUid,
			'sessionIsCookieOk': true,
			'userIsLoggedIn': false,
			'userId': config.trackingId,

			'events': [{
					'articleId': config.projectId,
					'deltaTime': (a + 0.45),
					'eventName': "particle_in",
					'pageloadUid': config.pageloadUid,
					"isSponsored": false,
					"isVotingEnabled": true,
					"particleId": "64142343-75d6-4639-967a-e2b9f7ea04fe",
					"particleIndex": 0,
					"particleListingType": "rank",
					"particleTemplateType": "image",
					"particleType": "mediaSection",
					"sessionIsCookieOk": true,
					"userId": config.trackingId,
					"userIsLoggedIn": false
				},{
					'articleId': config.projectId,
					'deltaTime': (a + 0.45),
					'eventName': "article_in",
					'pageloadUid': config.pageloadUid,
					"isSponsored": false,
					"sessionIsCookieOk": true,
					"userId": config.trackingId,
					"userIsLoggedIn": false
				},{
					'articleId': config.projectId,
					'deltaTime': (a + 0.77),
					'eventName': "article_top_out",
					'pageloadUid': config.pageloadUid,
					"isSponsored": false,
					'sessionIsCookieOk': true,
					'userId': config.trackingId,
					'userIsLoggedIn': false
				},{
					'articleId': config.projectId,
					'deltaTime': (a + 0.77),
					'eventName': "particle_in",
					'pageloadUid': config.pageloadUid,
					"isSponsored": false,
					"isVotingEnabled": true,
					"particleId": "e100b83f-f689-46c3-ac59-a9acf3d3c212",
					"particleIndex": 1,
					"particleListingType": "rank",
					"particleTemplateType": "image",
					"particleType": "mediaSection",
					"sessionIsCookieOk": true,
					"userId": config.trackingId,
					"userIsLoggedIn": false
				}
			],
		},
		json: true,
		url: "https://prd-collector-anon.playbuzz.com/main/events",
		headers: {
			'User-Agent': config.userAgent,
			'Referer': 'https://www.wearepoweruk.com/best-group.html',
			'Origin': 'https://www.wearepoweruk.com'
		}
	}
	
	proxiedRequest(options, function (err, res, body) {
		if (err) {
			return;
		}
		
		var date = new Date()
		if(config.debug) console.log(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ' logAnimationGroup::statusCode: ', res.statusCode)
		cb(config, proxiedRequest);
	})
}

function sendPixelRequest(config, proxiedRequest, cb){
	try {
		var options = {
			method: 'get',
			url: "https://pixel.playbuzz.com/v1/playbuzz-network/",
			headers: {
				'User-Agent': config.userAgent,
				'Referer': 'https://www.wearepoweruk.com/best-group.html',
				'Origin': 'https://www.wearepoweruk.com'
			}
		}
		
		proxiedRequest(options, function (err, res, body) {
			if (err) {
				return;
			}
			
			var date = new Date()
			if(config.debug) console.log(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ' sendPixelRequest::statusCode: ', res.statusCode)
			cb(config, proxiedRequest);
		})
	}catch(e){}
}

function sendVotingRankinRequest(config, proxiedRequest, cb){
	try {
		var options = {
			method: 'get',
			url: "https://voting.playbuzz.com/ranking/" + config.projectId + "?timeout=3000",
			headers: {
				'User-Agent': config.userAgent,
				'Referer': 'https://www.wearepoweruk.com/best-group.html',
				'Origin': 'https://www.wearepoweruk.com'
			}
		}
		
		proxiedRequest(options, function (err, res, body) {
			if (err) {
				return;
			}
			
			var date = new Date()
			if(config.debug) console.log(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ' sendVotingRankinRequest::statusCode: ', res.statusCode)
			cb(config, proxiedRequest);
		})
	}catch(e){}
}

function sendPixelItemRequest(config, proxiedRequest, cb){
	try {
		var options = {
			method: 'get',
			url: "https://pixel.playbuzz.com/v1/item/" + config.projectId,
			headers: {
				'User-Agent': config.userAgent,
				'Referer': 'https://www.wearepoweruk.com/best-group.html',
				'Origin': 'https://www.wearepoweruk.com'
			}
		}
		
		proxiedRequest(options, function (err, res, body) {
			if (err) {
				return;
			}
			
			var date = new Date()
			if(config.debug) console.log(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ' sendPixelItemRequest::statusCode: ', res.statusCode)
			cb(config, proxiedRequest);
		})
	}catch(e){}
}

function sendAdsTemplateRequest(config, proxiedRequest, cb){
	try {
		var options = {
			method: 'get',
			url: "https://ads.playbuzz.com/api/v1/template?itemId=" + config.projectId + "&referrer=https%3A%2F%2Fwww.wearepoweruk.com%2Fbest-group.html",
			headers: {
				'User-Agent': config.userAgent,
				'Referer': 'https://www.wearepoweruk.com/best-group.html',
				'Origin': 'https://www.wearepoweruk.com'
			}
		}
		
		proxiedRequest(options, function (err, res, body) {
			if (err) {
				return;
			}
			
			var date = new Date()
			if(config.debug) console.log(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ' sendAdsTemplateRequest::statusCode: ', res.statusCode)
			cb(config, proxiedRequest);
		})
	}catch(e){}
}

function sendVote(config, proxiedRequest, cb){
	try {
			var options = {
				method: 'get',
				json: true,
				url: "https://voting.playbuzz.com/poll/" + config.sectionId + "/" + config.questionId + "?questionId=" + config.questionId,
				headers: {
					'User-Agent': config.userAgent,
					'Referer': 'http://awards.portalpoptime.com.br/grupodoano/',
					'Origin': 'http://awards.portalpoptime.com.br'
				}
			}
			
			proxiedRequest(options, function (err, res, body) {
				if (err) {
					return;
				}
				
				var date = new Date()
				console.log(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ' body: ', body)
				cb(config, proxiedRequest);
			})
		}catch(e){}
}

function sendPoll(config, proxiedRequest, cb){
	try {
		var options = {
			method: 'post',
			body: {
				sectionId: config.sectionId,
				questionId: config.questionId,
				resultId: config.itemId,
				recaptchaToken: "null"
			},
			json: true,
			url: "https://voting.playbuzz.com/poll/",
			headers: {
				'User-Agent': config.userAgent,
				'Referer': 'http://awards.portalpoptime.com.br/grupodoano/',
				'Origin': 'http://awards.portalpoptime.com.br'
			}
		}
		
		proxiedRequest(options, function (err, res, body) {
			if (err) {
				return;
			}
			
			var date = new Date();
			if(config.debug) console.log(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ' sendPoll::statusCode: ', res.statusCode)
			cb(config, proxiedRequest);
		})
	}catch(e){}
}


function vote(config, proxiedRequest) {
	config.userAgent = random_useragent.getRandom();
	config.debug = true;
	
	sendPoll(config, proxiedRequest, () => {
		sendVote(config, proxiedRequest, () => {
			logActionVote(config, proxiedRequest, () => {
				var date = new Date()
				console.log(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ' done')
			});
		});
	});
}

var paramsLiteralToQsp = function(params) {
	var pars = [], params_str;
	
	_.each(params, _.bind(function(value, key) {
		pars.push(key + '=' + value);
	}, this));
	
	params_str = pars.join('&');
	return params_str;
};

function sendVote(config, proxiedRequest, cb){
	
	try {
		var options = {
			method: 'get',
			url: "https://polldaddy.com/n/ccb7e83eb5d0a5c40d4e4ac0f0911d3e/10429140?" + Date.now(),
			headers: {
				'User-Agent': config.userAgent,
				'Referer': 'https://www.billboard.com/articles/news/8532580/snl-musical-guests-poll-vote?utm_source=twitter&utm_medium=social',
				'Origin': 'https://www.billboard.com'
			},
			timeout: 10000
		}
		
		proxiedRequest(options, function (err, res, body) {
			if (err) {
				//var date = new Date()
				//console.log(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ' err' + err);
				cb(config, false);
				return;
			}
			
			var tmp = body;
			tmp = tmp.replace("PDV_n10429140='", "");
			tmp = tmp.replace("';PD_vote10429140(0);", "");
			
			var data = {
				p: 10429140,
				b: 0,
				a: '48129568,',
				o: '',
				va: 0,
				cookie: 0,
				n: tmp,
				url: escape('https://www.billboard.com/articles/news/8532580/snl-musical-guests-poll-vote?utm_source=twitter&utm_medium=social')
			};
			
			
			var options = {
				method: 'get',
				url: "https://polls.polldaddy.com/vote-js.php?" + paramsLiteralToQsp(data),
				headers: {
					'User-Agent': config.userAgent,
					'Referer': 'https://www.billboard.com/articles/news/8532580/snl-musical-guests-poll-vote?utm_source=twitter&utm_medium=social',
					'Origin': 'https://www.billboard.com'
				},
				timeout: 10000
			}
			
			proxiedRequest(options, function (err, res, body) {
				if (err) {
					//var date = new Date()
					//console.log(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ' err' + err);
					cb(config, false);
					return;
				}
				
				var date = new Date()
				console.log(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ' statusCode: ' + res.statusCode)
				cb(config, true);
			});
		})
	}catch(e){}
}

function list1(callback) {
    let url = 'http://www.gatherproxy.com/embed/?t=Anonymous&p=&c='
    fetch(url)
      .then(res => res.text())
      .then(body => {
        const $ = cheerio.load(body);
        const proxies = [];
        $('script').each((i, elem) => {
          if (elem.children[0] && elem.children[0].data && /(.*)gp.insertPrx(.*)/g.test(elem.children[0].data)) {
            const proxy = JSON.parse(`{${between(elem.children[0].data, '{', '}', 1)}}`);
            proxies.push({
              host: proxy.PROXY_IP,
              port: parseInt('0x' + proxy.PROXY_PORT, 16),
              time: proxy.PROXY_TIME,
              country: proxy.PROXY_COUNTRY,
              type: proxy.PROXY_TYPE
            });
          }
        });
        callback(proxies);
      });
};

function list2(callback) {
    let url = 'http://www.gatherproxy.com/embed/?t=Elite&p=&c='
    fetch(url)
      .then(res => res.text())
      .then(body => {
        const $ = cheerio.load(body);
        const proxies = [];
        $('script').each((i, elem) => {
          if (elem.children[0] && elem.children[0].data && /(.*)gp.insertPrx(.*)/g.test(elem.children[0].data)) {
            const proxy = JSON.parse(`{${between(elem.children[0].data, '{', '}', 1)}}`);
            proxies.push({
              host: proxy.PROXY_IP,
              port: parseInt('0x' + proxy.PROXY_PORT, 16),
              time: proxy.PROXY_TIME,
              country: proxy.PROXY_COUNTRY,
              type: proxy.PROXY_TYPE
            });
          }
        });
        callback(proxies);
      });
};

function list3(callback) {
	var options = {
		method: 'post',
		url: "http://spys.one/en/anonymous-proxy-list/",
		form: {
			xpp: 5,
			xf1: 1,
			xf2: 0,
			xf4: 0,
			xf5: 0
		},
		headers: {
			'Referer': 'http://spys.one/en/anonymous-proxy-list/',
			'user-Agent': random_useragent.getRandom()
		}
	}
	
	request(options, function (err, res, body) {
		if (err) {
			return;
		}
		
		const $ = cheerio.load(body);
		//eval($('script')[3].children[0].data);
		
		var proxies = [];
		
		/*$("table table tr:nth-child(n+3)").each((i, elem) => {
			if($(elem).find("td").length == 10){
				var el = $(elem).find("td")[0];
				var script = $(el).find("script");
				var s = $(script)[0].children[0].data;
				s = s.replace("document.write", "");
				
				var proxy = $(el).find(".spy14").text() + ":" + eval(s).replace("<font class=spy2>:</font>", "");
				proxies.push(proxy);
			}
		});*/
	
		callback(proxies);
	});
};

function list4(callback) {
	var options = {
		method: 'get',
		url: "http://free-proxy.cz/fr/proxylist/country/FR/http/ping/level1",
		headers: {
			'user-Agent': random_useragent.getRandom()
		}
	}
	
	request(options, function (err, res, body) {
		if (err) {
			return;
		}
		
		const $ = cheerio.load(body);
		
		var proxies = [];
		
		$("#proxy_list tr").each((i, elem) => {
			if($(elem).find("td").length > 2){
				var td = $(elem).find("td");
				var script = $(td[0]).find("script");
				var s = $(script)[0].children[0].data;
				s = s.replace("document.write", "");
				s = s.replace("(Base64.decode(", "");
				s = s.replace('")', "");
				s = s.replace(')', "");
				s = s.replace('"', "");
				
				var proxy = Buffer.from(s, 'base64') + ":" + $(td[1]).text();
				
				proxies.push(proxy);
			}
		});
		
		callback(proxies);
	});
};

function list5(callback) {
	var options = {
		method: 'get',
		url: "http://free-proxy.cz/fr/proxylist/country/FR/http/ping/level1/2",
		headers: {
			'user-Agent': random_useragent.getRandom()
		}
	}
	
	request(options, function (err, res, body) {
		if (err) {
			return;
		}
		
		const $ = cheerio.load(body);
		
		var proxies = [];
		
		$("#proxy_list tr").each((i, elem) => {
			if($(elem).find("td").length > 2){
				var td = $(elem).find("td");
				var script = $(td[0]).find("script");
				var s = $(script)[0].children[0].data;
				s = s.replace("document.write", "");
				s = s.replace("(Base64.decode(", "");
				s = s.replace('")', "");
				s = s.replace(')', "");
				s = s.replace('"', "");
				
				var proxy = Buffer.from(s, 'base64') + ":" + $(td[1]).text();
				proxies.push(proxy);
			}
		});
		
		callback(proxies);
	});
};

function list6(callback) {
	var options = {
		method: 'get',
		url: "http://free-proxy.cz/fr/proxylist/country/FR/http/ping/level1/3",
		headers: {
			'user-Agent': random_useragent.getRandom()
		}
	}
	
	request(options, function (err, res, body) {
		if (err) {
			return;
		}
		
		const $ = cheerio.load(body);
		
		var proxies = [];
		
		$("#proxy_list tr").each((i, elem) => {
			if($(elem).find("td").length > 2){
				var td = $(elem).find("td");
				var script = $(td[0]).find("script");
				var s = $(script)[0].children[0].data;
				s = s.replace("document.write", "");
				s = s.replace("(Base64.decode(", "");
				s = s.replace('")', "");
				s = s.replace(')', "");
				s = s.replace('"', "");
				
				var proxy = Buffer.from(s, 'base64') + ":" + $(td[1]).text();
				//q.push({'proxy': 'http://' + proxy});
				proxies.push(proxy);
			}
		});
		
		callback(proxies);
		
	});
};

function list7(callback) {
	var options = {
		method: 'get',
		url: "http://free-proxy.cz/fr/proxylist/country/FR/http/ping/level2",
		headers: {
			'user-Agent': random_useragent.getRandom()
		}
	}
	
	request(options, function (err, res, body) {
		if (err) {
			return;
		}
		
		const $ = cheerio.load(body);
		var proxies = [];
		
		$("#proxy_list tr").each((i, elem) => {
			if($(elem).find("td").length > 2){
				var td = $(elem).find("td");
				var script = $(td[0]).find("script");
				var s = $(script)[0].children[0].data;
				s = s.replace("document.write", "");
				s = s.replace("(Base64.decode(", "");
				s = s.replace('")', "");
				s = s.replace(')', "");
				s = s.replace('"', "");
				
				var proxy = Buffer.from(s, 'base64') + ":" + $(td[1]).text();
				//q.push({'proxy': 'http://' + proxy});
				proxies.push(proxy);
			}
		});
		
		callback(proxies);
	});
};

function launch(){
	/*
	var d = db.get('proxies')
	  .value();
	
	d.sort((e1, e2) => {
		return Math.random() - Math.random();
	});
	
	console.log("loaded " + d.length + " proxies");
	
	d.forEach((el) => {
		q.push({'proxy': el});
	});
	
	var d2 = db2.get('proxies')
	  .value();
	
	d2.sort((e1, e2) => {
		return Math.random() - Math.random();
	});
	
	console.log("loaded " + d2.length + " proxies");
	
	d2.forEach((el) => {
		q.push({'proxy': el});
	});
	*/
	
	
	
	try {
		request("https://www.proxy-list.download/api/v1/get?type=http&anon=elite", function (error, response, body) {
			var proxies = body.split("\r\n");
			console.log("loaded " + proxies.length + " proxies");
			
			try {
				proxies.forEach((el) => {
					q.push({'proxy': 'http://' + el});
				});

			}catch(e){}
			
			count++;
	   });
	}catch(e){}

	/*try {
		request("https://www.proxy-list.download/api/v1/get?type=http&anon=anonymous", function (error, response, body) {
			var proxies = body.split("\r\n");
			console.log("loaded " + proxies.length + " proxies");
			
			try {
				proxies.forEach((el) => {
					q.push({'proxy': 'http://' + el});
				});
			}catch(e){}
			
			count++;
	   });
	}catch(e){}*/

	try {
		request("https://byteproxies.com/api.php?key=free&amount=100&type=http&anonymity=elite", function (error, response, body) {
			var tmp = JSON.parse(body);
			console.log("loaded " + tmp.length + " proxies");
			tmp.forEach((el) => {
				var el = el.response;
				try {
					q.push({'proxy': 'http://' + el.ip + ":" + el.port});
				}catch(e){};
			});
			
			count++;
		});
	}catch(e){}

	try {
		request("https://byteproxies.com/api.php?key=free&amount=100&type=http&anonymity=anonymous", function (error, response, body) {
			var tmp = JSON.parse(body);
			console.log("loaded " + tmp.length + " proxies");
			tmp.forEach((el) => {
				var el = el.response;
				try {
					q.push({'proxy': 'http://' + el.ip + ":" + el.port});
				}catch(e){};
			});
			
			count++;
		});
	}catch(e){}


	try {
		request("https://i.guillaumechalons.fr/LM30xzHkSo.txt", function (error, response, body) {
			var proxies = body.split("\n");
			console.log("loaded " + proxies.length + " proxies");
			try {
				for(var i = 0; i < proxies.length; i++){
					q.push({'proxy': 'http://' + proxies[i].replace("\r", "")});
				};
			}catch(e){}
			
			count++;
	   });
	}catch(e){}
	
	try {
		request("https://i.guillaumechalons.fr/cC4jLVbdTD.txt", function (error, response, body) {
			var proxies = body.split("\n");
			console.log("loaded " + proxies.length + " proxies");
			try {
				for(var i = 0; i < proxies.length; i++){
					q.push({'proxy': 'http://' + proxies[i].replace("\r", "")});
				};
			}catch(e){}
			
			count++;
	   });
	}catch(e){}
	
	try {
		request("https://i.guillaumechalons.fr/V33EaLMwgU.txt", function (error, response, body) {
			var proxies = body.split("\n");
			console.log("loaded " + proxies.length + " proxies");
			try {
				for(var i = 0; i < proxies.length; i++){
					q.push({'proxy': 'http://' + proxies[i].replace("\r", "")});
				};
			}catch(e){}
			
			count++;
	   });
	}catch(e){}
	
	try {
		request("https://i.guillaumechalons.fr/AHP0H0hag6.txt", function (error, response, body) {
			var proxies = body.split("\n");
			console.log("loaded " + proxies.length + " proxies");
			try {
				for(var i = 0; i < proxies.length; i++){
					q.push({'proxy': 'http://' + proxies[i].replace("\r", "")});
				};
			}catch(e){}
			
			count++;
	   });
	}catch(e){}
	
	try {
		request("https://i.guillaumechalons.fr/v5yusGQcOw.txt", function (error, response, body) {
			var proxies = body.split("\n");
			console.log("loaded " + proxies.length + " proxies");
			try {
				for(var i = 0; i < proxies.length; i++){
					q.push({'proxy': 'http://' + proxies[i].replace("\r", "")});
				};
			}catch(e){}
			
			count++;
	   });
	}catch(e){}
	
	try {
		request("https://i.guillaumechalons.fr/IKBeym9ZeT.txt", function (error, response, body) {
			var proxies = body.split("\n");
			console.log("loaded " + proxies.length + " proxies");
			try {
				for(var i = 0; i < proxies.length; i++){
					q.push({'proxy': 'http://' + proxies[i].replace("\r", "")});
				};
			}catch(e){}
			
			count++;
	   });
	}catch(e){}
	
	
	try {
		request("https://i.guillaumechalons.fr/j62Pemukdc.txt", function (error, response, body) {
			var proxies = body.split("\n");
			console.log("loaded " + proxies.length + " proxies");
			try {
				for(var i = 0; i < proxies.length; i++){
					q.push({'proxy': 'http://' + proxies[i].replace("\r", "")});
				};
			}catch(e){}
			
			count++;
	   });
	}catch(e){}
	
	try {
		request("https://i.guillaumechalons.fr/Pcje8YRA6L.txt", function (error, response, body) {
			var proxies = body.split("\n");
			console.log("loaded " + proxies.length + " proxies");
			try {
				for(var i = 0; i < proxies.length; i++){
					q.push({'proxy': 'http://' + proxies[i].replace("\r", "")});
				};
			}catch(e){}
			
			count++;
	   });
	}catch(e){}
	
	
	try {
		request("https://i.guillaumechalons.fr/0ytiO6E39e.txt", function (error, response, body) {
			var proxies = body.split("\n");
			console.log("loaded " + proxies.length + " proxies");
			try {
				for(var i = 0; i < proxies.length; i++){
					q.push({'proxy': 'http://' + proxies[i].replace("\r", "")});
				};
			}catch(e){}
			
			count++;
	   });
	}catch(e){}
	
	
	try {
		request("https://i.guillaumechalons.fr/2JTptlwj8I.txt", function (error, response, body) {
			var proxies = body.split("\n");
			console.log("loaded " + proxies.length + " proxies");
			try {
				for(var i = 0; i < proxies.length; i++){
					q.push({'proxy': 'http://' + proxies[i].replace("\r", "")});
				};
			}catch(e){}
			
			count++;
	   });
	}catch(e){}

	
	
	
	
	list1((proxies) => {
		console.log("loaded " + proxies.length + " proxies");
		try {
			proxies.forEach((el) => {
				q.push({'proxy': 'http://' + el.host + ":" + el.port});
			});
		}catch(e){};
		
		count++;
	});

	list2((proxies) => {
		console.log("loaded " + proxies.length + " proxies");
		try {
			proxies.forEach((el) => {
				q.push({'proxy': 'http://' + el.host + ":" + el.port});
			});
		}catch(e){};
		
		count++;
	});

	list3((proxies) => {
		console.log("loaded " + proxies.length + " proxies");
		try {
			proxies.forEach((el) => {
				q.push({'proxy': 'http://' + el});
			});
		}catch(e){};
		
		count++;
	});
	
	
	list4((proxies) => {
		console.log("loaded " + proxies.length + " proxies");
		try {
			proxies.forEach((el) => {
				q.push({'proxy': 'http://' + el});
			});
		}catch(e){};
		
		count++;
	});
	
	
	list5((proxies) => {
		console.log("loaded " + proxies.length + " proxies");
		try {
			proxies.forEach((el) => {
				q.push({'proxy': 'http://' + el});
			});
		}catch(e){};
		
		count++;
	});
	
	list6((proxies) => {
		console.log("loaded " + proxies.length + " proxies");
		try {
			proxies.forEach((el) => {
				q.push({'proxy': 'http://' + el});
			});
		}catch(e){};
		
		count++;
	});
	
	list7((proxies) => {
		console.log("loaded " + proxies.length + " proxies");
		try {
			proxies.forEach((el) => {
				q.push({'proxy': 'http://' + el});
			});
		}catch(e){};
		
		count++;
	});
}

launch();

setTimeout(function () {
	process.exit();
}, 1000*60*5);

