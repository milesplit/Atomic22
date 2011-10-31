

// self-reference
var Me = this;

// Orientation
exports.orientationChange = function(f) {
	//	Titanium.UI.PORTRAIT (1)
	//	Titanium.UI.UPSIDE_PORTRAIT (2)
	//	Titanium.UI.LANDSCAPE_LEFT (3)
	//	Titanium.UI.LANDSCAPE_RIGHT (4)
	//	Titanium.UI.FACE_UP (5)
	//	Titanium.UI.FACE_DOWN (6)
	//	Titanium.UI.UNKNOWN (7)
	Ti.Gesture.addEventListener('orientationchange', f);
	return me;
};
// Platform
var _platformName = Ti.Platform.osname;
var _isAndroid = (_platformName == 'android') ? true : false;
var _isIPhone = (_platformName == 'iphone') ? true : false;
var _isIPad = (_platformName == 'ipad') ? true : false;
exports.android = function(callback) {
	if (arguments.length == 1 && _isAndroid) {
		callback();
	} else if (arguments.length == 2) {
		if (_isAndroid) {
			return arguments[0];
		} else {
			return arguments[1];
		}
	}
	return _isAndroid;
};
exports.iPhone= function(callback) { 
	if (arguments.length == 1 && _isIPhone) {
		callback();
	}
	return _isIPhone;
};
exports.iPad= function() {
	if (arguments.length == 1 && _isIPad) {
		callback();
	}
	return _isIPad;
};
exports.iOS= function() {
	if (arguments.length == 1 && (_isIPad || _isIPhone)) {
		callback();
	}
	return _isIPad || _isIPhone;
};
exports.osname = function() { return _platformName; };
exports.osversion = function() { return Ti.Platform.version; };
// Model
exports.model = function() { return Ti.Platform.model; };
exports.id = function() { return Ti.Platform.id; };
exports.guid = function() { return Titanium.Platform.createUUID(); };
exports.userName = function() { return Ti.Platform.username; };
exports.language = function() { return Ti.Platform.locale; };
exports.height = function() { return Titanium.Platform.displayCaps.platformHeight; };
exports.width = function() { return Titanium.Platform.displayCaps.platformWidth; };
exports.dpi = function() { return Titanium.Platform.displayCaps.dpi; };
exports.density = function() { return Titanium.Platform.displayCaps.density; };
// Network
exports.macAddress = function() { return Ti.Platform.macaddress; };
exports.ipAddress = function() { return Ti.Platform.address; };
exports.openURL = function(url) { return Ti.Platform.openURL(url); };
// Actions
exports.vibrate = function() { Ti.Media.vibrate(); };
// Calculation
exports.percentWidth = function(relative) {
	return Math.round(Ti.Platform.displayCaps.platformWidth * (relative/100));
};
exports.percentHeight = function(relative) {
	return Math.round(Ti.Platform.displayCaps.platformHeight * (relative/100));
};
exports.percentWidthDp = function(relative, plus) {
	if (!plus) plus = 0;
	var px = Ti.Platform.displayCaps.platformWidth * (relative/100);
	var dp = Math.round(px / (Titanium.Platform.displayCaps.dpi / 160));
	return (dp + parseInt(plus))+ 'dp';
};
exports.percentHeightDp = function(relative, plus) {
	if (!plus) plus = 0;
	var px = Ti.Platform.displayCaps.platformHeight * (relative/100);
	var dp = Math.round(px / (Titanium.Platform.displayCaps.dpi / 160));
	return (dp + parseInt(plus))+ 'dp';
};
// Titanium variables
exports.softKeyboardOnFocus = function() {
	if (_isAndroid) {
		return Titanium.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS;
	} else {
		return null;
	}
}

