function load() {
	window.oauth = ChromeExOAuth.initBackgroundPage({
		'request_url': config.secureHost + "_ah/OAuthGetRequestToken",
		'authorize_url': config.secureHost + "_ah/OAuthAuthorizeToken",
		'access_url': config.secureHost + "_ah/OAuthGetAccessToken",
		'consumer_key' : config.key,
		'consumer_secret' : config.secret,
		'scope': "",
		'callback_page' : config.host + config.callback
	});

	chrome.browserAction.onClicked.addListener(function(tab) {
		windows.browserAction();
	});

	if(localStorage['config.setupCompleted'] != "true"){
		config.save(config);
		tab = new Object();
		tab.url = chrome.extension.getURL("setup.html");
		tab.selected = true;
		windows.openLink(tab);
	}else{
		config.load();
		console.log(config);
		oauth.authorize(sockets.getTokenRequest);
	}
}

if(window.attachEvent) {
	window.attachEvent('onload', load);
} else {
	if(window.onload) {
		var curronload = window.onload;
		var newonload = function() {
			curronload();
			load();
		};
		window.onload = newonload;
	} else {
		window.onload = load;
	}
}
