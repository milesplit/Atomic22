

exports.LargeButton = function(opts) {
	
	// Default class so we don't have to set it every time
	var className = 'largeButton';
	// Create container control
	var Widget = A22.Widget(opts, className);
	
	// caption
	A22.isSet(opts.caption, function() {
		var caption = Ti.UI.createLabel({ text: opts.caption });
		Widget.add(caption, 'caption');
		A22.isSet(opts.textAlign, function() {
			caption.textAlign = opts.textAlign;
		});
	});
	// title
	A22.isSet(opts.title, function() {
		var title = Ti.UI.createLabel({ text: opts.title });
		Widget.add(title, 'title');
		A22.isSet(opts.textAlign, function() {
			title.textAlign = opts.textAlign;
		});
	});
	// bottom border
	var border = Ti.UI.createView({
		bottom: 0,
		left: 0,
		right: 0
	});
	Widget.add(border, 'border');
	
	// return widget control
	return Widget.View;
	
};
