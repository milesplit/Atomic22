var largeButton = require('widget/largebutton').LargeButton;

exports.View = function(Me, opts) {
	
	Me.stylesheet('default');
	
	A22.trace('before add label');
	Me.label({
		id:'lblTitle',
		className: 'heading',
		text: 'Hello World'
	});
	A22.trace('after add label');

	Me.widget(largeButton, {
		id:'btnStartSession', parent:'#pnlMain', className:'asdf',
		bottom: '0dp', right: '0dp', width: '50%', height: '100dp',
		title: 'button widget example', caption: 'some more text'
	});	


	
};

