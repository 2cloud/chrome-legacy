var windows = {};

windows.openLink(link) {
  if(link.url.indexOf('://') === -1)
    link.url = 'http://' + link.url;
  if(config.giveFocus)
    link.selected = true;
  chrome.tabs.create(link, function(link) {
    //TODO: handle link creation
  });
}

windows.serverDown() {
  //TODO: Update UI to reflect the server being down
}

windows.disconnected() {
  //TODO: update UI to reflect the channel being disconnected
}

windows.overQuota() {
  //TODO: update the UI to reflect the server being over quota
}

windows.connecting() {
  //TODO: update the UI to reflect the extension connecting to the server
}

windows.connected() {
  //TODO: update the UI to reflect the extension being connected to the server
}
