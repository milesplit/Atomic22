

exports.touchable = function(control) {
    var tolerance = 2;
    var start;
    var startTime;
    var minDistance = 30;
    var dx, dy;
    var update = function(e) {
    	dx = e.x - start.x;
        dy = e.y - start.y;
    };
    control.addEventListener('touchstart', function(evt) {
        start = evt;
        startTime = A22.now();
    });
    control.addEventListener('touchmove', function (e) {
    	update(e);
    	control.fireEvent('swiping', { distanceX:dx, distanceY:dy, touch:e });
    });
    control.addEventListener('touchend', function (end) {
        update(end);
        var dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        // only trigger if dragged further than 50 pixels
        if (dist < minDistance) {
        	end.startTime = startTime;
        	control.fireEvent('tap', end);
        	return;
        }
        var isVertical = Math.abs(dx / dy) < 1 / tolerance;
        var isHorizontal = Math.abs(dy / dx) < 1 / tolerance;
        // only trigger if dragged in a particular direction
        if (!isVertical && !isHorizontal) {
        	return;
        }
        // now fire the event off so regular 'swipe' handlers can use this!
        end.direction = isHorizontal ? ((dx < 0) ? 'left' : 'right') : ((dy < 0) ? 'up' : 'down');
        end.type = 'swipe';
        end.distance = Math.abs(dist);
        end.distanceLongest = Math.abs(isHorizontal ? dx : dy);
        end.distanceX = Math.abs(dx);
        end.distanceY = Math.abs(dy);
        control.fireEvent('swipe', end);
    });
    return control;
};
