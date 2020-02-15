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
        this.players = [];
        this.DOM.videos.forEach(video => this.players.push(new Player(video)));
        this.observer = null;

        this.initVideoObserver();
    }
    initVideoObserver = () => {
        this.observer = new IntersectionObserver(videos => {
            videos.forEach(video => {
                if (video.isIntersecting) {
                    this.toggleVideoPlayer("play", video.target);
                } else {
                    this.toggleVideoPlayer("pause", video.target);
                }
            });
        });

        this.DOM.videos.forEach(video => this.observer.observe(video));
    };
    toggleVideoPlayer = (action, video) => {
        const videoPlayer = this.players.filter(player => player.element.src === video.src)[0];
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
        gsap.set(item, { pointerEvents: "auto" });
        const itemWrapper = item.querySelector(".media__wrapper");
        const itemInner = item.querySelector(".media__inner");
        const itemContent = item.querySelector(".media__link");

        this.tl = new gsap.timeline().add("begin");

        this.tl
            .to(
                [itemWrapper, itemInner],
                {
                    duration: 1,
                    translateY: 0,
                    ease: "circ.inOut"
                },
                "begin"
            )
            .to(
                itemContent,
                {
                    duration: 0.75,
                    scale: 1,
                    ease: "circ.inOut"
                },
                "begin"
            );
    };
}

const lazyItemNodes = document.querySelectorAll("[data-lazy-component]");
if (lazyItemNodes !== null) {
    new LazyItems(lazyItemNodes);
}
