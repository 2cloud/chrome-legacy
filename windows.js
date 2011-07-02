var windows = {};

windows.openLink = function(link) {
  newTab = {};
  if(link.url.indexOf('://') === -1)
    newTab.url = 'http://' + link.url;
  else
    newTab.url = link.url;
  console.log(config.giveFocus);
  if(config.giveFocus === "true")
    newTab.selected = true;
  else
    newTab.selected = false;
  chrome.tabs.create(newTab, function(link) {
    //TODO: handle link creation
  });
}

windows.serverDown = function() {
  //TODO: Update UI to reflect the server being down
}

windows.disconnected = function() {
  //TODO: update UI to reflect the channel being disconnected
}

windows.overQuota = function() {
  //TODO: update the UI to reflect the server being over quota
}

windows.connecting = function() {
  //TODO: update the UI to reflect the extension connecting to the server
}

windows.connected = function() {
  //TODO: update the UI to reflect the extension being connected to the server
}
