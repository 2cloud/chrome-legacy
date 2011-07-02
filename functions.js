var background = chrome.extension.getBackgroundPage();

var config = new Object();
config.host = "http://android2cloud.appspot.com/";
config.secureHost = "https://android2cloud.appspot.com/";
config.key = "dev.android2cloud.org";
config.secret = "RnPKDZCnYy/ccr8STpe8ASL7";
config.callback = false;
config.identifier = "Chrome";
config.giveFocus = true;
config.debug = false;
/*
var channel = new Object();
channel.channel = false;
channel.token = false;
channel.socket = false;
*/

function setConfig(settings) {
  if(typeof settings.host != "undefined")
    localStorage['config.host'] = settings.host;
  if(typeof settings.secureHost != "undefined")
    localStorage['config.secureHost'] = settings.secureHost;
  if(typeof settings.key != "undefined")
    localStorage['config.key'] = settings.key;
  if(typeof settings.secret != "undefined")
    localStorage['config.secret'] = settings.secret;
  if(typeof settings.callback != "undefined")
    localStorage['config.callback'] = settings.callback;
  if(typeof settings.identifier != "undefined")
    localStorage['config.identifier'] = settings.identifier;
  if(typeof settings.giveFocus != "undefined")
    localStorage['config.giveFocus'] = settings.giveFocus;
  if(typeof settings.debug != "undefined")
    localStorage['config.debug'] = settings.debug;
  getConfig();
}

function getConfig() {
  config.host = localStorage['config.host'];
  config.secureHost = config.host.replace("http://", "https://");
  if(localStorage.getItem('config.host') !== null)
    config.secureHost = localStorage['config.secureHost'];
  config.key = "anonymous";
  config.secret = "anonymous";
  config.callback = "callback/";
  if(localStorage.getItem('config.key') !== null && localStorage.getItem('config.secret')) {
    config.key = localStorage['config.key'];
    config.secret = localStorage['config.secret'];
  }
  if(localStorage.getItem('config.callback') !== null)
    config.callback = localStorage['config.callback'];
  config.identifier = localStorage['config.identifier'];
  if(localStorage.getItem('config.giveFocus') !== null)
    config.giveFocus = localStorage['config.giveFocus'];
  if(localStorage.getItem('config.debug') !== null)
    config.debug = localStorage['config.debug'];
}

/*function openLink(tab) {
  if(tab.url.indexOf("://") === -1){
    tab.url = "http://"+tab.url;
  }
  delete tab.windowId;
  chrome.tabs.create(tab, function(tab) { });
}*/

function reauth() {
  background.oauth.clearTokens();
  chrome.tabs.getSelected(null, function(tab){
    setupTab = tab.id;
  });
  oauth_config = {
    'request_url': background.config.secureHost + "_ah/OAuthGetRequestToken",
    'authorize_url': background.config.secureHost + "_ah/OAuthAuthorizeToken",
    'access_url': background.config.secureHost + "_ah/OAuthGetAccessToken",
    'consumer_key' : background.config.key,
    'consumer_secret' : background.config.secret,
    'scope': "",
    'callback_page' : background.config.host + background.config.callback,
  };
  background.chromeExOAuthConfig = oauth_config;
  background.oauth = background.ChromeExOAuth.fromConfig(oauth_config);
  console.log(background.oauth);
  console.log(background.config);
  background.oauth.authorize(background.getTokenRequest);
}

/*function dummy(a, b){
  return;
}*/

function sendMessage(path, callback, opts) {
  background.oauth.sendSignedRequest(path, callback, opts);
}


/*function getTokenRequest() {
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
  openLink(newTab);
}

function onSocketMessage(evt) {
  var o = JSON.parse(evt.data);
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
  console.log("Error ("+error.code+"): "+error.message);
  if(error.code == 401 && localStorage['errorCount'] < 10){
    getTokenRequest();
  }
}

function onSocketDisconnect(){
  //TODO: handle socket disconnection
}

function getTokenResult(resp, xhr) {
  channel.token = resp;
  if(resp == "Error: Not logged in.") {
    //TODO: handle auth error
  }
  console.log(goog.appengine);
  channel.channel = new goog.appengine.Channel(channel.token);
  channel.socket = channel.channel.open();
  channel.socket.onopen = onSocketOpen;
  channel.socket.onmessage = onSocketMessage;
  channel.socket.onerror = onSocketError;
  channel.socket.onclose = onSocketDisconnect;
}*/
