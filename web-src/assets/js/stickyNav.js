import $ from 'jquery'

const stickyElement = document.querySelector(".main-header");
let didScroll;

$(window).scroll(function () {
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
