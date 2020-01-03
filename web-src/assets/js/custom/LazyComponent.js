import gsap from "gsap";

export default class LazyComponent {
    constructor(entries, animate = false) {
        this.DOM = { entries };
        this.animate = animate;
        this.observer = null;

        this.initObserver();
    }
    initObserver = () => {
        this.observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const shouldAnimate = entry.target.hasAttribute("data-lazy-component");

                        if (shouldAnimate) {
                            this.animateComponent(entry);
                        }

                        this.lazyLoadImage(entry);

                        observer.unobserve(entry.target);
                    }
                });
            },
            { rootMargin: "0px 0px 600px 0px" }
        );

        this.DOM.entries.forEach(entry => this.observer.observe(entry));
    };
    lazyLoadImage = entry => {
        const image = entry.target.querySelector(".img-lazy");

        if (image !== null) {
            image.src = image.dataset.src;
            image.srcset = image.dataset.srcset;
        }
    };
    animateComponent = entry => {
        const element = entry.target;

        gsap.to(element, {
            duration: 0.75,
            scale: 1,
            opacity: 1,
            translateY: 0,
            ease: "circ.inOut"
        });
    };
}
