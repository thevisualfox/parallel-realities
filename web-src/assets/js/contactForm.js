import $ from "jquery";

$("#contact-form").submit(function(event) {
    event.preventDefault();

    $.post({
        url: "/",
        dataType: "json",
        data: $(this).serialize(),
        success: function(response) {
            if (response.success) {
                $("#confirmation").fadeIn();
                $("#contact-form")[0].reset()

                setTimeout(() => {
                    $("#confirmation").fadeOut();
                }, 5000);
            } else {
                $("#error").fadeIn();

                setTimeout(() => {
                    $("#error").fadeOut();
                }, 5000);
            }
        }
    });
});
