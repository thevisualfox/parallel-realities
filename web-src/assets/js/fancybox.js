import $ from "jquery";
import fancybox from "@fancyapps/fancybox";

$('[data-fancybox="default"]').fancybox({
    vimeo: {
        controls: 0,
        showinfo: 0
    },
    protect: true,
    animationEffect: "zoom",
    animationDuration: 200,
    buttons: ["thumbs", "close"],
    clickContent: false,
    caption : function( instance, item ) {
		return $(this).next('figcaption').html();
	}
});

fancybox.init()
