var _ = (function() {
  const events = [];

  const __querySelector = function(selector, parent) {
    if (!selector) {
      this.elements = undefined;
    } else if (selector === 'document') {
			this.elements = [document];
		} else if (selector === 'window') {
			this.elements = [window];
    } else if (_.isElement(selector)) {
      this.elements = [selector];
		} else {
			this.elements = parent.querySelectorAll(selector);
		}
  }

  const __loop = function(callback) {
    for(let i = 0; i < this.elements.length; i++) {
      callback(this.elements[i], i);
    }
  }

  const LowLine = function(selector, props) {
    __querySelector.call(this, selector, props.parent);

    this.selector = selector;
  }

  LowLine.prototype.find = function(selector) {
    if (_.isElement(this.selector))
      return _(selector, this.selector);
    
    return _(this.selector + ' ' + selector);
  }

  LowLine.prototype.on = function(eventName, callback) {
    __loop.call(this, function(element) {
      element.addEventListener(eventName, callback, false);
    });

    return this;
  }

  LowLine.prototype.off = function(eventName, callback) {
    __loop.call(this, function(element) {
      element.removeEventListener(eventName, callback, false);
    });

    return this;
  }

  const defaultProps = {
    parent: document
  }
  
  const init = function(selector, props = defaultProps) {
    return new LowLine(selector, props);
  }

  return init;
})();

(function test(_) {
  _.isElement = function(o) {
    return o && o instanceof Element;
  }
})(_);

(function customEvent(_) {
  const events = [];

  _.emit = function(eventName, context) {
    events.forEach(function(event) {
      if (event.name !== eventName)
        return;

      event.callback(context);
    });
  }
  
  _.on = function(event, callback){
    events.push({
      name: event,
      callback
    });
  }
})(_);
