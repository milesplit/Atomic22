
var touch = require('lib/touch');

exports.Controller = function(name, opts) {
	// Private variables
	var Me = this,
		Target = A22.EventTarget(),
		byID = {},
		byClass = {},
		stylesheets = [];
	// Properties
	Me.controllerName = name;
	Me.className = 'default';
	Me.Window = Ti.UI.createWindow();
	// Private Methods
	var addControl = function(control, o) {
		// Add to window
		var parent = Me.get(o.parent);
		if (parent) {
			parent.add(control);
		} else {
			Me.Window.add(control);
		}
		// add properties
		for (k in o) {
			if (k in control) {
				control[k] = o[k];
			}
		}
		// extend and return
		return extendControl(control);
	};
	var registerControl = function(control, o) {
		if ('id' in o) {
			byID[o.id] = control;
		}
		if ('className' in o) {
			var arrClass = o.className.split(' ');
			for (var i=0; i < arrClass.length; i++) {
				var className = arrClass[i];
				if (!A22.isSet(byClass[className])) {
					byClass[className] = [];
				}
				byClass[className].push(control);
			}
		}
		return control;
	};
	var extendControl = function(control) {
		if (!'touchEnabled' in control || control.touchEnabled) {
			touch.touchable(control);
		}
		control.on = function(type, callback) {
			control.addEventListener(type, callback);
			return control;
		};
		control.fire = function(type, e) {
			control.fireEvent(type, e);
			return control;
		};
		return control;
	};
	
	// Public Methods
	Me.style = function(name) {
		stylesheets.push(name);
	};
	Me.get = function(path) {
		if (A22.typeOf(path) == 'string') {
			var startsWith = path.substr(0, 1);
			if (startsWith == '#') {
				return byID[path.substr(1)];
			} else if (startsWith == '.') {
				return byClass[path.substr(1)];
			} else {
				if (path == 'window') {
					return Me.Window;
				} else {
					return null;
				}
			}
		} else {
			return null;
		}
	};
	Me.applyStyle = function(path, style) {
		var el = Me.get(path);
		var type = A22.typeOf(el);
		if (type == 'null') {
			// Ignore
		} else if (type == 'object') {
			for (var prop in style) {
				el[prop] = style[prop];
			}
		} else if (type == 'array') {
			for (var i=0; i < el.length; i++) {
				var r = el[i];
				for (var prop in style) {
					r[prop] = style[prop];
				}
			}
		}
	};
	Me.button = function(o) {
		return registerControl(addControl(Ti.UI.createButton(), o), o);
	};
	Me.coverFlow = function(o) {
		return registerControl(addControl(Ti.UI.createCoverFlow(), o), o);
	};
	Me.dashboardView = function(o) {
		return registerControl(addControl(Ti.UI.createDashboardView(), o), o);
	};
	Me.imageView = function(o) {
		return registerControl(addControl(Ti.UI.createImageView(), o), o);
	};
	Me.picker = function(o) {
		return registerControl(addControl(Ti.UI.createPicker(), o), o);
	};
	Me.progressBar = function(o) {
		return registerControl(addControl(Ti.UI.createProgressBar(), o), o);
	};
	Me.scrollView = function(o) {
		return registerControl(addControl(Ti.UI.createScrollView(), o), o);
	};
	Me.slider = function(o) {
		return registerControl(addControl(Ti.UI.createSlider(), o), o);
	};
	Me.toggle = function(o) {
		return registerControl(addControl(Ti.UI.createSwitch(), o), o);
	};
	Me.tabGroup = function(o) {
		return registerControl(addControl(Ti.UI.createTabGroup(), o), o);
	};
	Me.tableView = function(o) {
		return registerControl(addControl(Ti.UI.createTableView(), o), o);
	};
	Me.textArea = function(o) {
		return registerControl(addControl(Ti.UI.createTextArea(), o), o);
	};
	Me.textField = function(o) {
		return registerControl(addControl(Ti.UI.createTextField(), o), o);
	};
	Me.toolbar = function(o) {
		return registerControl(addControl(Ti.UI.createToolbar(), o), o);
	};
	Me.panel = function(o) {
		return registerControl(addControl(Ti.UI.createView(), o), o);
	};
	Me.webView = function(o) {
		return registerControl(addControl(Ti.UI.createWebView(), o), o);
	};
	Me.label = function(o) {
		return registerControl(addControl(Ti.UI.createLabel(), o), o);
	};
	Me.add = function(control, o) {
		return registerControl(addControl(control, o), o);
	}
	Me.close = function(opts) {
		Me.fire('closing', Me);
		Me.Layout.Window.close(opts);
		Me.fire('closed', Me);
		return Me;
	};
	Me.open = function(opts) {
		Me.fire('opening', Me);
		require('view/' + name).View(Me);
		require('viewmodel/' + name).ViewModel(Me.get);
		for (var i=0; i < stylesheets.length; i++) {
			require('style/' + stylesheets[i]).Stylesheet(Me.applyStyle);
		}
		Me.Window.open(opts);
		Me.fire('opened', Me);
		return Me;
	};
	// Event handling
	Me.on = Target.on;
	Me.fire = Target.fire;
	Me.remove = Target.remove;
	// return self
	return Me;
};

