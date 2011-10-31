
exports.Settings = function(props){
	// Private methods
	var get = function(a) {
		var out;
		switch (props[a].type) {
			case 'bool':
				out = Ti.App.Properties.getBool(a);
				break;
			case 'string':
				out = Ti.App.Properties.getString(a);
				break;
			case 'array':
				out = Ti.App.Properties.getList(a);
				break;
			case 'integer':
				out = Ti.App.Properties.getInt(a);
				break;
			case 'double':
				out = Ti.App.Properties.getDouble(a);
				break;
			default:
				out = Ti.App.Properties.getString(a);
				break;
		}
		if (out === null) {
			out = props[a].defaultValue;
			set(a, out);
		}
		return out;
	};
	var set = function(a, b) {
		switch (props[a].type) {
			case 'bool':
				Ti.App.Properties.setBool(a, b);
				break;
			case 'string':
				Ti.App.Properties.setString(a, b);
				break;
			case 'array':
				Ti.App.Properties.setList(a, b);
				break;
			case 'integer':
				Ti.App.Properties.setInt(a, b);
				break;
			case 'double':
				Ti.App.Properties.setDouble(a, b);
				break;
			default:
				Ti.App.Properties.setString(a, b);
		}
		return b;
	};
	// Public methods
	this.val = function(a, b) {
		if (arguments.length == 1) {
			if (typeof props[a] != 'undefined') {
				return get(a);
			} else {
				return null;
			}
		} else if (arguments.length == 2) {
			if (typeof props[a] != 'undefined') {
				return set(a, b);
			} else {
				return null;
			}
		} else {
			return null;
		}
	};
	return this;
};