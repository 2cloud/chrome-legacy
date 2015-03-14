function setupLoad() {
	var defaultHost = "https://2cloudapp.appspot.com/"
		window.content = new Array();
	window.content[0] = "<p>Thanks for downloading the Chrome client for 2cloud! You'll be ready to start opening links in a minute&mdash;we just need to get your account configured.</p>";
	window.content[1] = "<p>The first thing you need to do is tell the extension where your information is being stored. Enter the base URL (something like \"http://<i>your-server</i>.appspot.com/\") in the field below. This needs to match the one you entered (or will enter) for your Android device. <b>If you're unsure, just leave it as the default</b>. When you're done, <b>remember to hit Save</b>.</p><div class=\"form centered\"><input id=\"host\" class=\"textarea\" type=\"text\" value=\""+defaultHost+"\"><br \><input type=\"submit\" class=\"continuebutton\" id=\"hostLink\" value=\"Save\"></div>";
	window.content[2] = "<p>Next, you need to give your extension a name. 2cloud has a fun feature that lets you choose which browser or device to send a link to, and this name will identify the device or browser for you. If this is your only installation of a 2cloud extension, you can leave it as \"Chrome\". When you're done, <b>remember to hit Save</b>.</p><div class=\"form centered\">Device Name: <input id=\"name\" type=\"text\" value=\"Chrome\" class=\"textarea\"><input type=\"submit\" class=\"continuebutton\" value=\"Save\" id=\"nameLink\"><span style=\"display: none; color: red;\" id=\"nameSpaceError\">Error: invalid device name. Please use only numbers and letters.</span></div>";
	window.content[3] = "<p>Finally, you need to give the extension permission to get your links from the server. The server uses your Google account for login and identification purposes, so you'll be asked to log in with that. Don't worry&mdash;we don't get any access to your account, password, or information. All this does is prove you are you say you are. You have one last step after you log in, so come back to this window.</p><p><a class=\"continuebutton\" href=\"#\" id=\"authLink\">Log in</a></p>";
	window.content[4] = "<p>You're good to go. We recommend you <a href=\"http://www.twitter.com/2cloudproject\" title=\"Follow 2cloud on Twitter\">follow 2cloud on Twitter</a> or sign up for the <a href=\"http://groups.google.com/group/2cloud-announce\" title=\"2cloud Announcement mailing list on Google Groups\">mailing list</a> to be notified about downtime and changes.</p><p>If you don't have the Android app yet, you can scan the barcode below to download it. You'll need it to send links to the extension.</p><p class=\"centered\"><img src=\"http://chart.apis.google.com/chart?cht=qr&chs=350x350&chl=market%3A%2F%2Fsearch%3Fq%3Dpname%3Acom.suchagit.android2cloud\"/></p>";
	window.curPage = 0;
	updateContent(0);
	document.getElementById("continueLink").addEventListener("click", advanceContent);
}

function advanceContent() {
	updateContent(window.curPage + 1);
}

function updateContent(page){
	window.curPage = page;
	console.log(window.curPage);
	if(window.curPage != 1 && window.curPage != 2 && window.curPage != 3)
		document.getElementById("continue").style.display = "";
	else
		document.getElementById("continue").style.display = "none";
	div = document.getElementById("instructionText");
	div.innerHTML = window.content[page];
	if(page == (window.content.length - 1)){
		document.getElementById("continue").style.display = "none";
		localStorage['config.setupCompleted'] = true;
	}
	document.getElementById("continueLink").href = "#"+(window.curPage + 2);
	registerListeners(page)
}

function registerListeners(page) {
	switch(page) {
		case 1:
			document.getElementById("hostLink").addEventListener("click", setHost);
			break;
		case 2:
			document.getElementById("nameLink").addEventListener("click", setName);
			break;
		case 3:
			document.getElementById("authLink").addEventListener("click", grantAuth);
			break;
	}
}

function setName() {
	name = document.getElementById("name").value;
	valid = true;
	for(x=0; x < name.length; x++){
		if(!name.charAt(x).match(/^[A-Za-z0-9]$/)){
			document.getElementById("nameSpaceError").style.display = "";
			valid = false;
		}
	}
	if(valid){
		document.getElementById("nameSpaceError").style.display = "none";
		config.save({'identifier':name});
		document.getElementById("continue").style.display = "";
	}
}

function setHost() {
	hostText = document.getElementById('host').value;
	if(hostText.indexOf("://") == -1)
		hostText = "http://" + host;
	if(hostText.charAt(hostText.length - 1) != "/")
		hostText += "/";
	secureHostText = hostText.replace("http://", "https://");
	config.save({'host':hostText, 'secureHost':secureHostText});
	document.getElementById("continue").style.display = "";
}

function grantAuth() {
	document.getElementById("continue").style.display = "";
	auth.initiate();
}

if(window.attachEvent) {
	window.attachEvent('onload', setupLoad);
} else {
	if(window.onload) {
		var curronload = window.onload;
		var newonload = function() {
			curronload();
			setupLoad();
		};
		window.onload = newonload;
	} else {
		window.onload = setupLoad;
	}
}
