/*!
 * Atomic 22 - app.js
 * Copyright (C) 2011 MileSplit, Inc.
 * MIT Licensed
 */

var A22 = require('lib/framework').App({
	name: 'Atomic22 Test App',
	settings: {
		SOME_APP_SETTING: { type:'bool', defaultValue:true },
		SOME_OTHER_APP_SETTING: { type:'string', defaultValue:'Some text' }
	}
});

A22.open('welcome');
