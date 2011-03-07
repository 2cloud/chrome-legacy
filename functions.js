var background = chrome.extension.getBackgroundPage();

var config = new Object();
config.host = "http://android2cloud.appspot.com/";
config.secureHost = "https://android2cloud.appspot.com/";
config.key = "dev.android2cloud.org";
config.secret = "RnPKDZCnYy/ccr8STpe8ASL7";
config.callback = false;
config.identifier = "Chrome";
config.giveFocus = true;
config.mute = true;
config.enabled = true;

var channel = new Object();
channel.channel = false;
channel.token = false;
channel.socket = false;
channel.username = false;

function setConfig(settings) {
  if(settings.host)
    localStorage['config.host'] = settings.host;
  if(settings.key)
    localStorage['config.key'] = settings.key;
  if(settings.secret)
    localStorage['config.secret'] = settings.secret;
  if(settings.callback)
    localStorage['config.callback'] = settings.callback;
  if(settings.identifier)
    localStorage['config.identifier'] = settings.identifier;
  if(settings.giveFocus)
    localStorage['config.giveFocus'] = settings.giveFocus;
  if(settings.mute)
    localStorage['config.mute'] = settings.mute;
  if(settings.enabled)
    localStorage['config.enabled'] = settings.enabled;
  getConfig();
}

function getConfig() {
  config.host = localStorage['config.host'];
  config.secureHost = config.host.replace("http://", "https://");
  config.key = "anonymous";
  config.secret = "anonymous";
  config.callback = "callback/";
  if(localStorage['config.key'] && localStorage['config.secret']) {
    config.key = localStorage['config.key'];
    config.secret = localStorage['config.secret'];
  }
  if(localStorage['config.callback'])
    config.callback = localStorage['config.callback'];
  config.identifier = localStorage['config.identifier'];
  if(localStorage['config.mute'])
    config.mute = localStorage['config.mute'];
  if(localStorage['config.giveFocus'])
    config.giveFocus = localStorage['config.giveFocus'];
  config.enabled = localStorage['config.enabled'];
}

function setCurrentWindow(window) {
  currentWindows[window.id] = window;
}

function windowClosed(id) {
  delete currentWindows[id];
}

function getCurrentWindow() {
  chrome.windows.getCurrent(setCurrentWindow);
}

function openLink(tab) {
  if(tab.url.indexOf("://") === -1){
    tab.url = "http://"+tab.url;
  }
  delete tab.windowId;
  chrome.tabs.create(tab, function(tab) { });
}

function notify(message) {
  if (window.webkitNotifications.checkPermission() == 0) {
    window.webkitNotifications.createNotification("http://code.google.com/p/android2cloud/logo?cct=1282716273", message.title, message.body).show();
  } else {
    alert(message);
  }
}

function reauth() {
  background.oauth.clearTokens();
  chrome.tabs.getSelected(null, function(tab){
    setupTab = tab.id;
  });
  oauth_config = {
        'request_url': background.config.secureHost + "_ah/OAuthGetRequestToken",
        'authorize_url': background.config.secureHost + "_ah/OAuthAuthorizeToken",
        'access_url': background.config.secureHost + "_ah/OAuthGetAccessToken",
        //'consumer_key': "android2cloud-dev.appspot.com",
        //'consumer_secret': "IWWF240PCETzf92EFJDD1qH1",
        'consumer_key' : background.config.key,
        'consumer_secret' : background.config.secret,
        'scope': "",
        //'app_name' : 'android2cloud dev server',
        'callback_page' : background.config.host + background.config.callback,
      };
  background.chromeExOAuthConfig = oauth_config;
  background.oauth = background.ChromeExOAuth.fromConfig(oauth_config);
  console.log(background.oauth);
  console.log(background.config);
  background.oauth.authorize(background.getTokenRequest);
}

function playSound(sound) {
  sound = background.document.getElementById(sound);
  sound.play();
}

function sendLink(link) {
  //link.url = encodeURIComponent(link.url);
  //link.target = encodeURIComponent(link.target);
  if(!link.callback)
    link.callback = dummy
  sendMessage(config.host + 'addlink', link.callback, {'method' : 'POST', 'parameters' :{'link' : link.url, 'name' : config.identifier, 'recipient' : link.target, 'comment' : link.comment }});
}

function dummy(a, b){
  return;
}

function sendMessage(path, callback, opts) {
  background.oauth.sendSignedRequest(path, callback, opts);
}


function getTokenRequest() {
  getConfig();
  var pastFrame = document.getElementById("wcs-iframe");
  if(pastFrame)
    pastFrame.parentNode.removeChild(pastFrame);
  while(!(localStorage['oauth.token'] && localStorage['oauth.secret'])) {
    window.setTimeout(dummy(null, null), 100);
  }
  sendMessage(config.host + 'getToken/' + config.identifier, background.getTokenResult, null);
}

function onSocketOpen() {
  window.setTimeout(function() {sendMessage(config.host + 'connected/' + config.identifier, function(resp, xhr) { channel.username = resp; }, {'method' : 'POST'})}, 100);
  localStorage['errorCount'] = 0;
}

function linkOpener(link) {
  var newTab = new Object();
  newTab.url = link.url;
  newTab.selected = config.giveFocus == "true";
  newTab.windowId = "all";
  if(link.instance)
    newTab.windowId = link.instance;
  openLink(newTab);
  if(config.mute == "false")
    playSound("ding");
  if(link.comment) {
    var notification = new Object();
    notification.icon = "icon48.png";
    notification.title = link.from;
    notification.body = link.comment;
    notify(notification);
  }
}

function onSocketMessage(evt) {
  var o = JSON.parse(evt.data);
  /*if (o.link) {
    if(localStorage['links.last'] != o.link.id){
      linkOpener(o.link);
      localStorage['links.last'] = o.link.id;
    }
  }else */
  console.log(o);
  if(o.link && !o.links){
  	o.links = {};
  	o.links[o.link.id] = {};
  	o.links[o.link.id].link = o.link;
  	o.links[o.link.id].meta = o.meta;
  }
  linksToSend = Array()
  if(o.links) {
    for(link in o.links){
      linkOpener(o.links[link].link);
      linksToSend.push(link)
    }
  }
	sendMessage(config.host + 'marklinkread', function(resp, xhr) { console.log ("marked link as read"); console.log(evt.data); console.log("response: " + resp); }, {'method' : 'POST', 'parameters' : {'links' : JSON.stringify(linksToSend)}});
}

function onSocketError(error) {
	//alert("Error ("+error.code+"): "+error.message);
	console.log("Error ("+error.code+"): "+error.message);
	if(error.code == 401 && localStorage['errorCount'] < 10){
	  localStorage['errorCount']++;
    getTokenRequest();
	}
}

function onSocketDisconnect(){
	if(config.enabled){
		channel.socket = channel.channel.open();
		channel.socket.onopen = onSocketOpen;
		channel.socket.onmessage = onSocketMessage;
		channel.socket.onerror = onSocketError;
		channel.socket.onclose = onSocketDisconnect;
	}
}

function getTokenResult(resp, xhr) {
  channel.token = resp;
  if(resp == "Error: Not logged in.") {
    //getTokenRequest();
  }
  console.log(goog.appengine);
  channel.channel = new goog.appengine.Channel(channel.token);
  channel.socket = channel.channel.open();
  channel.socket.onopen = onSocketOpen;
  channel.socket.onmessage = onSocketMessage;
  channel.socket.onerror = onSocketError;
  channel.socket.onclose = onSocketDisconnect;
}
