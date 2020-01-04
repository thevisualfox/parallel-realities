import gsap from "gsap";
import Player from "@vimeo/player";

export class LazyImage {
    constructor(images) {
        this.DOM = { images };
        this.observer = null;

        this.initImageObserver();
    }
    initImageObserver = () => {
        this.observer = new IntersectionObserver(
            (images, observer) => {
                images.forEach(image => {
                    if (image.isIntersecting) {
                        this.lazyLoadImage(image.target);

                        observer.unobserve(image.target);
                    }
                });
            },
            { rootMargin: "0px 0px 800px 0px" }
        );

        this.DOM.images.forEach(image => this.observer.observe(image));
    };
    lazyLoadImage = image => {
        if (image !== null) {
            image.src = image.dataset.src;
            image.srcset = image.dataset.srcset;
        }
    };
}

export class LazyVideo {
    constructor(videos) {
        this.DOM = { videos };
        this.observer = null;

        this.initVideoObserver();
    }
    initVideoObserver = () => {
        this.observer = new IntersectionObserver(
            videos => {
                videos.forEach(video => {
                    if (video.isIntersecting) {
                        this.toggleVideoPlayer("play", video.target);
                    } else {
                        this.toggleVideoPlayer("pause", video.target);
                    }
                });
            },
            { rootMargin: "0px 0px 0px 0px" }
        );

        this.DOM.videos.forEach(video => this.observer.observe(video));
    };
    toggleVideoPlayer = (action, video) => {
        const videoPlayer = new Player(video);

        action === "play" ? videoPlayer.play() : videoPlayer.pause();
    };
}

export class LazyComponent {
    constructor(components) {
        this.DOM = { components };
        this.observer = null;

        this.initComponentObserver();
    }
    initComponentObserver = () => {
        this.observer = new IntersectionObserver(
            (components, observer) => {
                components.forEach(component => {
                    if (component.isIntersecting) {
                        this.animateComponent(component.target);

                        observer.unobserve(component.target);
                    }
                });
            },
            { rootMargin: "0px 0px 200px 0px" }
        );

        this.DOM.components.forEach(component => this.observer.observe(component));
    };
    animateComponent = component => {
        gsap.to(component, {
            duration: 0.75,
            scale: 1,
            opacity: 1,
            translateY: 0,
            ease: "circ.inOut"
        });
    };
}
