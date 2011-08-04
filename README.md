## 2cloud Chrome Client

### About

2cloud is a free, decentralised, open source project to try and make sharing 
content between browsers and devices as seamless and effortless as possible. An 
up-to-date list of devices and browsers supported by the project is available at 
http://www.2cloudproject.com/clients

This is the Chrome extension we distribute as an official client through the 
[Chrome Webstore](http://links.2cloudproject.com/chrome). We offer the source 
code here for inspection and as a template for porting the project over to other 
browsers and clients.

### Installation Instructions

We tried to make installation as streamlined as possible. You just need to 
download the source (use git, or the download button). Store the code some place 
safe&mdash;you're going to need it. Open Chrome, and follow the excellent 
[instructions](http://code.google.com/chrome/extensions/getstarted.html#load) 
that Google has provided to get the extension set up as an "unpacked extension".

### Where to Get Help

We try to maintain a presence with our users. To wit, we have:

* A Tender support site (the best way to get help with "it's not working"): http://help.2cloudproject.com
* An announcement mailing list (the best way to stay up-to-date on downtime and changes): http://groups.google.com/group/2cloud-announce
* A discussion mailing list (the best way to talk to other users and the team): http://groups.google.com/group/2cloud
* A development mailing list (the best way to stay on top of API changes): http://groups.google.com/groups/2cloud-dev
* A beta mailing list (if you want to help test buggy software): http://groups.google.com/group/2cloud-beta
* A Twitter account (the best way to stay on top of new releases and other updates): http://www.twitter.com/2cloudproject
* A Facebook page (the second best way to stay on top of new releases and other updates): http://www.facebook.com/2cloud
* A website (for a bunch of other links and information): http://www.2cloudproject.com
* A blog (for lengthier updates and explanations): http://blog.2cloudproject.com
* A Github account (where all our source code and issues reside): https://www.github.com/2cloud

If you don't use _any_ of those... you're kind of out of luck.

### Contribution Guidelines

The quickest, easiest, and most assured way to contribute is to be a beta tester. 
Simply join the [mailing list](http://groups.google.com/group/2cloud-beta) and 
wait for a new beta to be released. Try and break it. Submit feedback. Wash, 
rinse, repeat.

If you're interested in contributing code, we use different guidelines for each 
part of our app. This is driven by necessity; you can't use JSHint on Python.

Right now, we don't have the Chrome extension codified to a set of standards. 
We're looking to adopt JSHint for styling, and will be implementing some unit 
tests shortly. Watch this space. In the meantime, if you want to help and are 
okay with very few guidelines or structure, you can join up on the [dev mailing 
list](http://groups.google.com/group/2cloud-dev) or look through some of the 
[issues](https://www.github.com/2cloud/Chrome/issues) we want to fix. We'd love 
a pull request, just try to explain clearly what you changed, why you changed it, 
and why it's better this way.

### Contributors

2cloud is an open source application. It is technically "owned" by [Second Bit LLC](http://www.secondbit.org), 
but all that really means is they take care of the mundane administrative and 
financial stuff. The team behind 2cloud is separate from the Second Bit team 
(despite some overlap). The 2cloud team is as follows:

* Paddy Foran - Lead Developer - [@paddyforan](http://www.twitter.com/paddyforan) - http://www.paddyforan.com/
* Dylan Staley - UI/UX Lead - [@dstaley](http://www.twitter.com/dstaley) - http://www.dstaley.me
* Tino Galizio - Project Manager - [@tinogalizio](http://www.twitter.com/tinogalizio) - http://www.secondbit.org/team/tino

They're pretty friendly. Please do get in touch!

### Credits and Alternatives

One of the great parts about being an open source project is how often we get to 
stand on the shoulders of giants. Without these people and projects, we couldn't 
do what we do.

* [Chromium](http://www.chromium.org) is a fantastic platform to develop for
* [ChromeExOAuth](http://code.google.com/chrome/extensions/tut_oauth.html) powers our OAuth implementation

There are some alternatives to 2cloud out there, and we encourage you to try them 
out. Use what works best for you. You can find an up-to-date list on 
[our website](http://links.2cloudproject.com/competition).
