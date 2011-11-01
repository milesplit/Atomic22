
exports.View = function(Me, opts) {
	
	Me.stylesheet('default');
	
	A22.trace('before add label');
	
	Me.label({
		id:'lblTitle',
		className: 'heading',
		text: 'Hello World'
	});
	
	A22.trace('after add label');
	
};

