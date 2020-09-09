import MasonryGrid from "./masonry";
import Swup from "swup";
import { gsap } from "gsap";
import SwupScrollPlugin from "@swup/scroll-plugin";
import SwupJsPlugin from "@swup/js-plugin";

const options = [
    {
        from: "(.*)",
        to: "(.*)",
        in: function (next) {
            const main = document.querySelector("#swup");
            gsap.set(main, { scale: 1.1, opacity: 0 });
            gsap.to(main, 0.5, {
                scale: 1,
                opacity: 1,
                onComplete: next,
                ease: "circ",
            });
        },
        out: (next) => {
            const main = document.querySelector("#swup");
            gsap.to(main, 0.5, {
                scale: 1.1,
                opacity: 0,
                onComplete: next,
                ease: "circ",
            });
        },
    },
];

const options2 = {
    animateScroll: false,
    scrollAcceleration: 0.04,
};

const swup = new Swup({
    animateHistoryBrowsing: true,
    plugins: [new SwupScrollPlugin(options2), new SwupJsPlugin(options)],
});

swup.on("contentReplaced", () => {
    const gridNode = document.querySelector(".row--masonry");
    gridNode !== null ? new MasonryGrid(gridNode) : null;
});
