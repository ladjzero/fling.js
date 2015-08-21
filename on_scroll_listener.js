(function (window) {
// `debounce` is taken from `underscore`
var debounce = function(func, wait, immediate) {
  var timeout, args, context, timestamp, result;
  
  var later = function() {
    var last = Date.now() - timestamp;
    if (last < wait) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  };
  
  return function() {
    context = this;
        args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }
  
    return result;
  };
};

var isOnScrolling = false,
  isOnTouch = false,
  touchEventId;

var touchHandler = function (e) {
  switch (e.type) {
  case 'touchstart':
    isOnTouch = true;
    isOnScrolling && dispatchScrollEvent('scroll');
    break;
  case 'touchend':
    isOnTouch = false;
    dispatchScrollEvent(isOnScrolling ? 'fling' : 'scroll end');
    break;
  }
};

var scrollHandler = function (e) {
  switch(e) {
  case 'start':
    isOnScrolling = true;
    dispatchScrollEvent('scroll');
    break;
  case 'end':
    isOnScrolling = false;
    !isOnTouch && dispatchScrollEvent('scroll end');
  }
}

var scrollHandler1 = debounce(function () {
  scrollHandler('start');
}, 150, true);

var scrollHandler2 = debounce(function () {
  scrollHandler('end');
}, 150);

var dispatchScrollEvent = function (state) {
  window.dispatchEvent(new CustomEvent('scrollState', {detail: state}));
}

window.addEventListener('touchstart', touchHandler);
window.addEventListener('touchend', touchHandler);
window.addEventListener('touchmove', touchHandler);
window.addEventListener('touchcancel', touchHandler);
window.addEventListener('scroll', scrollHandler1);
window.addEventListener('scroll', scrollHandler2);
})(window);