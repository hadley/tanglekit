# tk_drag("cookies", 10, " cookies", 2, 100)
# <span data-var="cookies" class="" data-min="2" data-max="100"> cookies</span>

tangle_deps <- function() {
  htmltools::htmlDependency("tanglekit", "0.1.0",
    src = system.file("www", package = "tanglekit"),
    script = c("Tangle.js", "shiny.js", "TangleKit/mootools.js", "TangleKit/sprintf.js",
      "TangleKit/BVTouchable.js", "TangleKit/TangleKit.js"),
    stylesheet = "TangleKit/TangleKit.css"
  )
}

tk_drag <- function(id, value, text, min, max) {
  slider <- htmltools::span(
    id = id,
    class = "TKAdjustableNumber",
    "data-var" = id,
    "data-value" = value,
    "data-min" = min,
    "data-max" = max,
    text
  )
  # wrapper <- htmltools::span(id = id, slider)
  htmltools::attachDependencies(slider, tangle_deps())
}

