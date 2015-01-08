// From http://davidwalsh.name/javascript-debounce-function
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

// Each element gets own tangle containing a single variable called with
// the same name as the id
var tangles = {};

var tangleBinding = new Shiny.InputBinding();
$.extend(tangleBinding, {
  find: function(scope) {
    return $(scope).find(".TKAdjustableNumber");
  },
  initialize: function(el) {
    var id = $(el).attr("id");
    tangles[id] = new Tangle (document.documentElement, {
      initialize: function () { this[id] = parseFloat($(el).attr("data-value")); },
      update:     function () { $(el).trigger("change"); }
    });
  },
  getValue: function(el) {
    var id = $(el).attr("id");
    return tangles[id].getValue(id);
  },
  setValue: function(el, value) {
    var id = $(el).attr("id");
    tangles[id].setValue(id, value);
  },
  subscribe: function(el, callback) {
    var db_callback = debounce(callback, 100);
    $(el).on("change.TKAdjustableNumber", function(e) {
      db_callback();
    });
  },
  unsubscribe: function(el) {
    $(el).off(".TKAdjustableNumber");
  }
});

Shiny.inputBindings.register(tangleBinding);
