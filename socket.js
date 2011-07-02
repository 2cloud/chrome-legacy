var sockets = {};
var channel = {};

sockets.getTokenRequest = function() {
  var pastFrame = chrome.extension.getBackgroundPage().document.getElementById('wcs-iframe');
  if(pastFrame)
    pastFrame.parentNode.removeChild(pastFrame);
  auth.request(config.host + 'getToken/' + config.identifier, sockets.getTokenResult, null);
  //TODO: Check to make sure the quota isn't depleted before requesting a new token
}

sockets.getTokenResult = function(resp, xhr) {
  channel = {};
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
    channel.channel = new goog.appengine.Channel(channel.token);
    channel.socket = channel.channel.open();
    channel.socket.onopen = sockets.onOpen;
    channel.socket.onmessage = sockets.onMessage;
    channel.socket.onerror = sockets.onError;
    channel.socket.onclose = sockets.onDisconnect;
  } else {
    //TODO: handle non-successful responses
  }
}

sockets.onOpen = function() {
  //TODO: handle socket opening
}

sockets.onMessage = function(evt) {
  var message = JSON.parse(evt.data);
  if(config.debug)
    console.log(message);
  if(message.links) {
    linksToSend = Array();
    for(link in message.links) {
      windows.openLink(message.links[link].link);
      linksToSend.push(link);
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
  console.log("Error!");
  console.log(error);
  //TODO: Do more than just log the error
}

sockets.onDisconnect = function() {
  //TODO: handle socket disconnect
}
