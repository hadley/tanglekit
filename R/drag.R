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

#' Create a tangle kit slider
#'
#' @param value Starting value.
#' @param text Text shown after the number
#' @param min,max Minimum and maximum allowable values.
#' @param id A unique identifier for the control. If unspecified, uses
#'   lower case value with non-alphanumeric values converted to -,
#'   multiple - collapsed to one -, and leading and trailing - dropped.
#' @export
#' @examples
#' tk_drag(1, " pies")
#' tk_drag(2, " hats")
tk_drag <- function(value, text, min = NULL, max = NULL, id = as_attr(text)) {
  stopifnot(is.numeric(value))

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


as_attr <- function(x) {
  x <- tolower(x)
  x <- gsub("[^a-zA-Z0-9_-]", "-", x)
  x <- gsub("-+$", "", x)
  x <- gsub("^-+", "", x)
  x
}
