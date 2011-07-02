var windows = {};

windows.openLink(link, config) {
  if(link.url.indexOf('://') === -1)
    link.url = 'http://' + link.url;
  if(config.giveFocus)
    link.selected = true;
  chrome.tabs.create(link, function(link) {
    //TODO: handle link creation
  });
}


