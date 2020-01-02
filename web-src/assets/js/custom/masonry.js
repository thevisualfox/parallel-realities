import Masonry from "masonry-layout";
import InfiniteScroll from "infinite-scroll";
import CalculateVideoHeight from "./CalculateVideoHeight";
import imagesLoaded from "imagesloaded";
import Player from "@vimeo/player";

InfiniteScroll.imagesLoaded = imagesLoaded;

class MasonryGrid {
    constructor(el) {
        this.DOM = { el: el };
        this.DOM.videos = Array.from(this.DOM.el.querySelectorAll("[data-vimeo-player]"));

        this.grid = new Masonry(this.DOM.el, {
            itemSelector: "none",
            columnWidth: ".row__item",
            percentPosition: true,
            visibleStyle: { transform: "translateY(0)", opacity: 1 },
            hiddenStyle: { transform: "translateY(100px)", opacity: 0 }
        });

        this.initMasonry();
    }
    initMasonry = () => {
        new CalculateVideoHeight(this.DOM.videos, this.grid);

        imagesLoaded(this.DOM.el, () => {
            const gridItems = this.DOM.el.querySelectorAll(".row__item");
            this.grid.options.itemSelector = ".row__item";
            this.grid.appended(gridItems);
        });

        const infiniteScroll = new InfiniteScroll(this.DOM.el, {
            path: function() {
                const pageType = this.element.dataset.pageType;
                const totalPages = this.element.dataset.totalPages;

                if (this.loadCount < totalPages) {
                    if (this.loadCount === 0) this.loadCount = 1; // Start at 1

                    const nextIndex = this.loadCount + 1;
                    return `${pageType}/p${nextIndex}`;
                }
            },
            append: ".row__item",
            history: false,
            outlayer: this.grid
        });

        infiniteScroll.on("append", (response, path, items) => {
            items.forEach(item => {
                const video = item.querySelector("[data-vimeo-player]");

                if (video !== null) {
                    this.calculateVideoHeight(video);
                }
            });
        });
    };
    calculateVideoHeight = video => {
        /* Get the bounds of the video */
        const videoWrapper = video.parentNode;

        /* Initialize a new Player class and stop the video from playing */
        const player = new Player(video);

        /* Get video width and height */
        Promise.all([player.getVideoWidth(), player.getVideoHeight()]).then(dimensions => {
            const [width, height] = dimensions;
            const paddingTop = `${(height / width) * 100}%`;

            /* Set the calculated padding to the video bounds */
            videoWrapper.style.padding = `${paddingTop} 0 0`;

            this.grid.layout();
        });
    };
}

const gridNode = document.querySelector(".row--masonry");
if (gridNode !== null) {
    new MasonryGrid(gridNode);
}
