var sockets = {};
var channel = {};

sockets.getTokenRequest = function() {
  windows.connecting();
  var pastFrame = chrome.extension.getBackgroundPage().document.getElementById('wcs-iframe');
  if(pastFrame)
    pastFrame.parentNode.removeChild(pastFrame);
  auth.request(config.host + 'channels/get/' + config.identifier, sockets.getTokenResult, sockets.getTokenResult);
  console.log("Sent token request");
  //TODO: Check to make sure the quota isn't depleted before requesting a new token
}

sockets.getTokenResult = function(resp, xhr) {
  channel = {};
  console.log(resp);
  result = JSON.parse(resp);
  if(result.code === 200 || result.code === 304) {
    //handle a successful retrieval of a token
    //200 means a token was created
    //304 means a token was already cached
    if(config.debug) {
      console.log("Channel token result:");
      console.log(result);
    }
    channel.token = result.token;
    sockets.connect();
  } else if(result.code === 503) {
    windows.overQuota();
  }
}

sockets.connect = function() {
  channel.channel = new goog.appengine.Channel(channel.token);
  channel.socket = channel.channel.open();
  channel.socket.onopen = sockets.onOpen;
  channel.socket.onmessage = sockets.onMessage;
  channel.socket.onerror = sockets.onError;
  channel.socket.onclose = sockets.onDisconnect;
}

sockets.onOpen = function() {
  windows.connected();
  window.setTimeout(
    function() {
      auth.request(config.host + 'channels/connected/' + config.identifier, function(resp, xhr) { }, {'method' : 'POST'});
    }, 100);
}

sockets.onMessage = function(evt) {
  var message = JSON.parse(evt.data);
  if(config.debug)
    console.log(message);
  if(message.links) {
    linksToSend = Array();
    for(link in message.links) {
      windows.openLink(message.links[link]);
      linksToSend.push(message.links[link].id);
    }
    auth.request(config.host + 'links/mark_read', function(resp, xhr) {
      if(config.debug) {
        console.log("Marked link as read:");
        console.log(evt.data);
        console.log("Response: " + resp);
      }
    }, {
      'method': 'POST',
      'parameters': {
        'links': JSON.stringify(linksToSend)
      }
    }
    );
  }
  //TODO: Handle other messages
}

sockets.onError = function(error) {
  if(error.code != 401) {
    channel.error = "Error " + error.code +": ";
    channel.error += error.description;
    windows.serverDown();
    console.log(error);
  } else {
    sockets.getTokenRequest();
  }
}

sockets.onDisconnect = function() {
  windows.disconnected();
}
