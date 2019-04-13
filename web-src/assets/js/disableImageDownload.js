import $ from "jquery";

// Disable right click

$("body").on("contextmenu", "img", function(e) {
    return false;
});
