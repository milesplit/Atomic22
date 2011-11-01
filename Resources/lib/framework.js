
require('lib/polyfill').apply();

var core = require('lib/core');
var settings = require('lib/settings');

exports.App = function(opts) {
	// Self-reference
	var Me = this,
		Target = core.EventTarget();
	// Initial values
	Me.Device = require('lib/device');
	Me.Controller = require('lib/controller').Controller;
	Me.FS = require('lib/filesystem');
	Me.EventTarget = core.EventTarget;
	Me.Property = core.Property;
	Me.Settings = settings.Settings(opts.settings);
	// Methods
	Me.now = function() { return new Date().getTime(); };
	Me.trace = function(msg) { Ti.API.info(msg); return Me; };
	Me.window = function() { return Ti.UI.currentWindow; };
	Me.typeOf = function(v) {
		if (typeof(v) == 'object') {
			if (v === null) return 'null';
			if (v.constructor == (new Array).constructor) return 'array';
			if (v.constructor == (new Date).constructor) return 'date';
			if (v.constructor == (new RegExp).constructor) return 'regex';
			return 'object';
		}
		return typeof(v);
	};
	Me.iif = function(statement, callback, elseCallback) {
		if (statement) {
			callback();
		} else if (elseCallback) {
			elseCallback();
		}
		return statement;
	};
	Me.isSet = function(prop, callback, elseCallback) {
		var iif = (typeof prop == 'undefined') ? false : true;
		if (iif && callback) {
			callback();
		} else if (iif === false && elseCallback) {
			elseCallback();
		}
		return iif;
	};
	Me.load = function(name, opts) {
		Me.fire('window:loading', { module:name });
		var controller = new Me.Controller(name, opts);
		Me.fire('window:loaded', { module:name, controller:controller });
		return controller;
	};
	Me.open = function(name, opts) {
		var controller = Me.load(name, opts).open();
		Me.fire('window:opened', { module:name, controller:controller });
		return controller;
	};
	// Event handling
	Me.on = Target.on;
	Me.remove = Target.remove;
	Me.fire = Target.fire;
	// return self
	return Me;
};

