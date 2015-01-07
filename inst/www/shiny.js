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
    $(el).on("change.TKAdjustableNumber", function(e) {
      callback();
    });
  },
  unsubscribe: function(el) {
    $(el).off(".TKAdjustableNumber");
  }
});

Shiny.inputBindings.register(tangleBinding);
