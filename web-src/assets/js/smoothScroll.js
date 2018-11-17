import $ from 'jquery';

$('[data-smooth-scroll]').click(function () {
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top -100
    }, 400);

    return false;
});