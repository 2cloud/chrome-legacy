var config = {};
config.host = "http://android2cloud.appspot.com/";
config.secureHost = "https://android2cloud.appspot.com/";
config.key = "dev.android2cloud.org";
config.secret = "RnPKDZCnYy/ccr8STpe8ASL7";
config.callback = false;
config.identifier = "Chrome";
config.giveFocus = true;
config.debug = false;

config.save = function(settings) {
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
  config.load();
}

config.load = function() {
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
