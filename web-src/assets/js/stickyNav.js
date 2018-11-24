import $ from 'jquery'

const stickyElement = document.querySelector(".main-header");
let didScroll;

$(window).on('scroll', {passive: true}, function () {
    didScroll = true;
});

setInterval(function () {
    if (didScroll) {
        addStickyClass();
        didScroll = false;
    }
}, 250);

function addStickyClass() {
    if (window.pageYOffset >= 750) {
        $(stickyElement).addClass("is-sticky");
    } else {
        $(stickyElement).removeClass("is-sticky");
    }
}
