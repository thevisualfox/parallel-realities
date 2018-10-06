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
    buttons: [
        "zoom",
        "thumbs",
        "close"
    ]
});