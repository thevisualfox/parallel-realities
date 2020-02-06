import gsap from "gsap";
import Player from "@vimeo/player";
import Layzr from "layzr.js";
import { masonry } from "./masonry";

const lazyImages = Layzr({
    threshold: 10
});

document.addEventListener("DOMContentLoaded", () => {
    lazyImages
        .update()
        .check()
        .handlers(true);
});

lazyImages.on("src:after", image => {
    const parent = document.querySelector(image.dataset.parent);
    const parentWrapper = parent.querySelector(".media__wrapper");
    const parentContent = parent.querySelector(".media__link");

    gsap.to([parent, parentWrapper], {
        duration: 1,
        translateY: 0,
        ease: "circ.inOut"
    });

    gsap.to(parentContent, {
        duration: 0.35,
        scale: 1,
        ease: "circ.inOut"
    });

    masonry.masonry.layout();
});

export class LazyVideo {
    constructor(videos) {
        this.DOM = { videos };
        this.observer = null;

        this.initEvents();
    }
    initEvents = () => {
        this.DOM.videos.forEach(video => {
            const videoNode = video.querySelector("[data-vimeo-player]");

            if (videoNode !== null) {
                const videoPlayer = new Player(videoNode);

                video.addEventListener("mouseenter", () => this.toggleVideoPlayer("play", videoPlayer));
                video.addEventListener("mouseleave", () => this.toggleVideoPlayer("pause", videoPlayer));
            }
        });
    };
    toggleVideoPlayer = (action, videoPlayer) => {
        action === "play" ? videoPlayer.play() : videoPlayer.pause();
    };
}
