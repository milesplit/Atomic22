

exports.Widget = function(opts, className) {

	var Widget = Ti.UI.createView();
	Widget.className = className;
	for (key in opts) {
		if (key == 'className') {
			Widget.className += ' ' + opts[key];
		} else if (key != 'parent' && key != 'children') {
			Widget[key] = opts[key];
		}
	}

	return {
		View:Widget,
		add: function(child, subclass) {
			Widget.add(child);
			if (subclass) {
				A22.isSet(className, function() {
					if (Widget.className) {
						var arrClasses = Widget.className.split(' ');
						arrClasses.forEach(function(item) {
							child.className += className + '_' + subclass + ' ';
						});
					}
				});
				A22.isSet(Widget.id, function() {
					child.id = Widget.id + '_' + subclass;
				});
			}
		}
	};

};
