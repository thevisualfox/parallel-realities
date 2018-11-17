import $ from 'jquery'

const stickyElement = document.querySelector(".main-header");

$(window).scroll(function () {
    addStickyClass();
});

function addStickyClass() {
    if (window.pageYOffset >= 750) {
        $(stickyElement).addClass("is-sticky");
    } else {
        $(stickyElement).removeClass("is-sticky");
    }
}
