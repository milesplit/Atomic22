
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
	Me.Window = Ti.UI.createWindow(opts);
	// Private Methods
	var addControl = function(control, o) {
		// Add to window
		if (o) {
			var parent = Me.get(o.parent);
			if (A22.typeOf(parent) == 'object') {
				parent.add(control);
			} else {
				Me.Window.add(control);
			}
			// add properties
			for (k in o) {
				if (k in control && k != 'parent') {
					control[k] = o[k];
				}
			}
		} else {
			Me.Window.add(control);
		}
		// extend and return
		extendControl(control);
		return control;
	};
	var registerControl = function(control) {
		if (typeof control['id'] != 'undefined') {
			byID[control.id] = control;
		}
		if (typeof control['className'] != 'undefined') {
			var arrClass = control.className.split(' ');
			for (var i=0; i < arrClass.length; i++) {
				var className = arrClass[i];
				if (!A22.isSet(byClass[className])) {
					byClass[className] = [];
				}
				byClass[className].push(control);
			}
		}
		Me.fire('control:added', { control:control });
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
	var resolveSelector = function(path) {
		if (A22.typeOf(path) == 'string') {
			var startsWith = path.substr(0, 1);
			if (startsWith == '#') {
				return byID[path.substr(1)];
			} else if (startsWith == '.') {
				return byClass[path.substr(1)];
			} else {
				if (path == 'window') {
					return Me.Window;
				} else if (path == '*') {
					return byID;
				} else {
					return null;
				}
			}
		} else {
			return null;
		}
	};
	var applyStyle = function() {
		if (arguments.length == 3) {
			var el = arguments[0];
			var prop = arguments[1];
			var val = arguments[2];
			var type = A22.typeOf(el);
			if (type == 'array') {
				for (var i=0; i < el.length; i++) {
					if (prop in el[i]) {
						el[i][prop] = val;
					}
				}
			} else if (type == 'object') {
				if (prop in el) {
					el[prop] = val;
				}
			}
		} else if (arguments.length == 2) {
			var el = arguments[0];
			var style = arguments[1];
			var type = A22.typeOf(el);
			if (type == 'array') {
				el.forEach(function(r) {
					for (var prop in style) {
						if (prop in r && prop != 'parent' && prop != 'children') {
							r[prop] = style[prop];
						}
					}
				});
			} else if (type == 'object') {
				for (var prop in style) {
					if (prop in r) {
						r[prop] = style[prop];
					}
				}
			}
		}
	}
	// Public Methods
	Me.stylesheet = function(name) {
		stylesheets.push(name);
	};
	Me.get = function() {
		if (arguments.length == 1) {
			// Single argument
			var type = A22.typeOf(arguments[0]);
			if (type == 'string') {
				// string
				return resolveSelector(arguments[0]);
			} else if (type == 'array') {
				// Several strings in an array
				var out = [];
				arguments[0].forEach(function(path) {
					var selected = resolveSelector(path);
					if (selected) {
						if (A22.typeOf(selected) == 'array') {
							selected.forEach(function(item) {
								out.push(item);
							});
						} else {
							out.push(selected);
						}
					}
				});
				return out;
			}
		} else if (arguments.length > 1) {
			var out = [];
			// Arguments is (stupidly) not an actual array, can't do forEach
			for (var i=0; i < arguments.length; i++) {
				var selected = resolveSelector(arguments[i]);
				if (selected) {
					if (A22.typeOf(selected) == 'array') {
						selected.forEach(function(item) {
							out.push(item);
						});
					} else {
						out.push(selected);
					}
				}
			}
			return out;
		}
		return [];		
	};
	Me.style = function() {
		if (arguments.length < 2) {
			return null;
		}
		var selectors = [];
		for (var i=0; i < arguments.length; i++) {
			var r = arguments[i];
			if (i == arguments.length - 1) {
				// last argument is style, so apply it
				applyStyle(Me.get(selectors), r);
			} else {
				selectors.push(r);
			}
		}
		return Me;
	};
	Me.button = function(o) {
		return registerControl(addControl(Ti.UI.createButton(), o));
	};
	Me.coverFlow = function(o) {
		return registerControl(addControl(Ti.UI.createCoverFlow(), o));
	};
	Me.dashboardView = function(o) {
		return registerControl(addControl(Ti.UI.createDashboardView(), o));
	};
	Me.imageView = function(o) {
		return registerControl(addControl(Ti.UI.createImageView(), o));
	};
	Me.picker = function(o) {
		return registerControl(addControl(Ti.UI.createPicker(), o));
	};
	Me.progressBar = function(o) {
		return registerControl(addControl(Ti.UI.createProgressBar(), o));
	};
	Me.scrollView = function(o) {
		return registerControl(addControl(Ti.UI.createScrollView(), o));
	};
	Me.slider = function(o) {
		return registerControl(addControl(Ti.UI.createSlider(), o));
	};
	Me.toggle = function(o) {
		return registerControl(addControl(Ti.UI.createSwitch(), o));
	};
	Me.tabGroup = function(o) {
		return registerControl(addControl(Ti.UI.createTabGroup(), o));
	};
	Me.tableView = function(o) {
		return registerControl(addControl(Ti.UI.createTableView(), o));
	};
	Me.textArea = function(o) {
		return registerControl(addControl(Ti.UI.createTextArea(), o));
	};
	Me.textField = function(o) {
		return registerControl(addControl(Ti.UI.createTextField(), o));
	};
	Me.toolbar = function(o) {
		return registerControl(addControl(Ti.UI.createToolbar(), o));
	};
	Me.panel = function(o) {
		return registerControl(addControl(Ti.UI.createView(), o));
	};
	Me.webView = function(o) {
		return registerControl(addControl(Ti.UI.createWebView(), o));
	};
	Me.label = function(o) {
		return registerControl(addControl(Ti.UI.createLabel(), o));
	};
	Me.add = function(control, o) {
		return registerControl(
			addControl(control, {
				parent:o.parent
			})
		);
	}
	Me.widget = function(widget, o) {
		var control = Me.add(widget(o), o);
		for (var i=0; i < control.children.length; i++) {
			var child = control.children[i];
			registerControl(child);
		}
		return control;
	};
	Me.close = function(opts) {
		Me.fire('closing', Me);
		Me.Window.close(opts);
		Me.fire('closed', Me);
		return Me;
	};
	Me.open = function(opts) {
		// Load view and view-model
		A22.trace('opening ' + Me.moduleName);
		Me.fire('opening');
		require('view/' + name).View(Me);
		require('viewmodel/' + name).ViewModel(Me.get);
		// Apply stylesheets
		for (var i=0; i < stylesheets.length; i++) {
			require('style/' + stylesheets[i]).Stylesheet(Me.style);
		}
		// Open window
		Me.Window.open(opts);
		Me.fire('opened');
		return Me;
	};
	// Event handling
	Me.on = Target.on;
	Me.fire = Target.fire;
	Me.remove = Target.remove;
	// return self
	return Me;
};

