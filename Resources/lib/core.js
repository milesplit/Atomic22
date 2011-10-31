
 var EventTarget = function() {
	// Private variables
	var Me = this;
	var _listeners = {};
	// Public Methods
    Me.on = function(type, listener) {
        if (typeof _listeners[type] == 'undefined'){
            _listeners[type] = [];
        }
        _listeners[type].push(listener);
        return Me;
    };
    Me.fire = function(event){
        if (typeof event == "string"){
            event = { type: event };
        }
        if (!event.target){
            event.target = this;
        }
        if (!event.type){  //falsy
            throw new Error("Event object missing 'type' property.");
        }
        if (_listeners[event.type] instanceof Array){
            var listeners = _listeners[event.type];
            for (var i=0, len=listeners.length; i < len; i++){
                listeners[i].call(this, event);
            }
        }
        return Me;
    };
	Me.remove = function(type, listener) {
        if (_listeners[type] instanceof Array){
            var listeners = _listeners[type];
            for (var i=0, len=listeners.length; i < len; i++){
                if (listeners[i] === listener){
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
    };
    return Me;
};


var Property = function(defaultValue) {
	// Private properties
	var target = new EventTarget();
	var val = defaultValue;
	// Public methods
	this.value = function() {
		if (arguments.length == 0) {
			return val;
		} else {
			val = arguments[0];
			target.fire({ type:'changed', value:val });
		}
	};
	this.bind = function(callback) {
		target.on('changed', callback);
	};
	this.unbind = function(callback) {
		target.remove('changed', callback);
	};
	return this;
};



exports.EventTarget = EventTarget;
exports.Property = Property;

