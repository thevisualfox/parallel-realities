import gsap from "gsap";
import Player from "@vimeo/player";
import Layzr from "layzr.js";

const lazyImages = Layzr({
    threshold: 10
});

document.addEventListener("DOMContentLoaded", () => {
    lazyImages
        .update()
        .check()
        .handlers(true);
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

export class LazyItems {
    constructor(items, masonry = null) {
        this.DOM = { items };
        this.observer = null;
        this.masonry = masonry;

        this.initItemsObserver();
    }
    initItemsObserver = () => {
        this.observer = new IntersectionObserver(
            (items, observer) => {
                items.forEach(item => {
                    if (item.isIntersecting) {
                        this.animateItem(item.target);

                        observer.unobserve(item.target);
                    }
                });
            },
            { rootMargin: "0px 0px 0px 0px" }
        );

        this.DOM.items.forEach(item => this.observer.observe(item));
    };
    animateItem = item => {
        const itemWrapper = item.querySelector(".media__wrapper");
        const itemInner = item.querySelector(".media__inner");
        const itemContent = item.querySelector(".media__link");

        gsap.to([itemWrapper, itemInner], {
            duration: 1,
            translateY: 0,
            ease: "circ.inOut"
        });

        gsap.to(itemContent, {
            duration: 0.75,
            scale: 1,
            ease: "circ.inOut"
        });

        if (this.masonry !== null) this.masonry.layout();
    };
}

const lazyItemNodes = document.querySelectorAll("[data-lazy-component]");
if (lazyItemNodes !== null) {
    new LazyItems(lazyItemNodes);
}
