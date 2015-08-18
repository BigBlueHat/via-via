var self = require('sdk/self');
var tabs = require('sdk/tabs');
var urlbarButton = require('urlbarbutton')

const PREFIX = 'https://via.hypothes.is/'

// given a URL, redirect it to via.hypothes.is
function toVia(url) {
  return PREFIX + url;
}

function onVia(url) {
  return url.startsWith(PREFIX);
}

function fromVia(url) {
  if (onVia(url)) {
    return url.substring(PREFIX.length);
  } else {
    // if we're not on via...who cares...
    return url;
  }
}

// TODO: the urlbarButton currently in use is pretty primitive;
// return type is a DOM node...in the chrome...
var urlButton = urlbarButton({
  id : 'hypothesis-button',
  image : self.data.url('images/browser-icon-inactive.png'),
  onClick : function() {
    var url = tabs.activeTab.url;
    if (!onVia(url)) {
      tabs.activeTab.url = toVia(url);
      buttonOn();
    } else {
      tabs.activeTab.url = fromVia(url);
      buttonOff();
    }
  }
});

// TODO: improve the whole urlButton library thing
function buttonOn() {
  urlButton.setAttribute('image', self.data.url('images/browser-icon-active.png'));
}

function buttonOff() {
  urlButton.setAttribute('image', self.data.url('images/browser-icon-inactive.png'));
}

function toggleIcon(tab) {
  if (onVia(tab.url)) {
    buttonOn();
  } else {
    buttonOff();
  }
}

tabs.on('activate', toggleIcon);
tabs.on('pageshow', function(tab) {
  if (tab == tabs.activeTab) {
    toggleIcon(tab);
  }
});

exports.toVia = toVia;
exports.fromVia = fromVia;
