var windows = {};

windows.browserAction = function() {
  console.log(channel.connection_status);
  if(channel.connection_status == 'connected') {
    channel.socket.close();
  } else if(channel.connection_status == 'disconnected') {
    windows.connecting();
    sockets.connect();
  }
}

windows.openLink = function(link) {
  newTab = {};
  if(link.url.indexOf('://') === -1)
    newTab.url = 'http://' + link.url;
  else
    newTab.url = link.url;
  chrome.tabs.create(newTab, function(link) {
    //TODO: handle link creation
  });
}

windows.serverDown = function() {
  channel.connection_status = "error";
  chrome.browserAction.setIcon({'path': 'images/error.png'});
  chrome.browserAction.setPopup({'popup': 'error_popup.html'});
  chrome.browserAction.setTitle({'title': 'Server error. Click for more details.'});
}

windows.disconnected = function() {
  channel.connection_status = "disconnected";
  chrome.browserAction.setIcon({'path': 'images/disconnected.png'});
  chrome.browserAction.setPopup({'popup': ''});
  chrome.browserAction.onClicked.addListener(function(tab) {
    sockets.connect();
  });
  chrome.browserAction.setTitle({'title': 'Disconnected. Click to connect.'});
}

windows.overQuota = function() {
  channel.connection_status = "over_quota";
  chrome.browserAction.setIcon({'path': 'images/error.png'});
  chrome.browserAction.setPopup({'popup': 'quota_popup.html'});
  chrome.browserAction.setTitle({'title': 'Over quota. Click for options.'});
}

windows.connecting = function() {
  channel.connection_status = "connecting";
  chrome.browserAction.setIcon({'path': 'images/connecting.png'});
  chrome.browserAction.setPopup({'popup': ''});
  chrome.browserAction.setTitle({'title': 'Connecting to the server...'});
}

windows.connected = function() {
  channel.connection_status = "connected";
  chrome.browserAction.setPopup({'popup': ''});
  chrome.browserAction.onClicked.addListener(function(tab) {
    channel.socket.close();
  });
  chrome.browserAction.setTitle({'title': 'Connected. Click to disconnect.'});
  chrome.browserAction.setIcon({'path': 'images/connected.png'});
}
