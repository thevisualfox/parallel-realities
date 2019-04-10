import "bootstrap";
import $ from "jquery";

// Core

import "./fancybox";
import "./smoothScroll";

// Disable right click

$("body").on("contextmenu", "img", function(e) {
    return false;
});
