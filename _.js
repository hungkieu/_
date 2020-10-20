var _ = (function() {
  const init = function() {

  }

  return init;
})();

(function (_) {
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
