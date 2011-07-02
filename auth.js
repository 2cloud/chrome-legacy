var auth = {};

auth.initiate = function() {
  chrome.extension.getBackgroundPage().oauth.clearTokens();
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
  background.oauth.authorize(background.getTokenRequest);
}

auth.request = function(path, callback, opts) {
  background.oauth.sendSignedRequest(path, callback, opts);
}
