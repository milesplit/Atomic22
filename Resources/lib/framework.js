
var core = require('lib/core');

exports.Framework = function() {
	// Self-reference
	var Me = this;
	// Initial values
	Me.ViewModel = {};
	Me.View = {};
	Me.Stylesheet = {};
	Me.Device = require('lib/device');
	Me.Controller = require('lib/controller').Controller;
	Me.FS = require('lib/filesystem');
	Me.EventTarget = core.EventTarget;
	Me.Property = core.Property;
	// Methods
	Me.now = function() { return new Date().getTime(); };
	Me.trace = function(msg) { Ti.API.info(msg); return Me; };
	Me.shout = function(msg) { alert(msg); };
	Me.includeDirectory = function(path) {
		var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, path);
		var listing = file.getDirectoryListing();
		if (listing) {
			for (var i = 0; i < listing.length; i++) {
				if (listing[i].split('.').pop() === 'js') { 
					Ti.include(path + listing[i]);	
				}
			}
		}
		return Me;
	};
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
		var controller = new Me.Controller(name, opts);
		return controller;
	};
	Me.open = function(name, opts) {
		var controller = Me.load(name, opts).open();
		return controller;
	};
	// return self
	return Me;
};

