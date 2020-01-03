import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";
import Player from "@vimeo/player";
import LazyComponent from "./LazyComponent";

class MasonryGrid {
    constructor(el) {
        this.DOM = { el: el };
        this.DOM.wrapper = this.DOM.el.querySelector(".media__wrapper");
        this.DOM.videos = Array.from(this.DOM.el.querySelectorAll("[data-vimeo-player]"));
        this.DOM.images = Array.from(this.DOM.el.querySelectorAll("[data-lazy-component]"));

        this.videoIndexes = [];
        this.grid = new Masonry(this.DOM.el, {
            itemSelector: ".row__item",
            columnWidth: ".row__item",
            percentPosition: true,
            initLayout: false
        });

        this.initMasonry();
    }
    initMasonry = () => {
        imagesLoaded(this.DOM.el, () => {
            if (this.DOM.videos.length > 0) {
                this.DOM.videos.forEach(async (video, videoIndex) => {
                    const status = await this.calculateVideoHeight(video, videoIndex);

                    if (status === "done") {
                        this.grid.layout();
                        new LazyComponent(this.DOM.images, this.DOM.el, this.DOM.wrapper);
                    }
                });
            } else {
                this.grid.layout();
                new LazyComponent(this.DOM.images, this.DOM.el, this.DOM.wrapper);
            }
        });
    };
    calculateVideoHeight = async (video, videoIndex) => {
        const videoWrapper = video.parentNode;
        const player = new Player(video);

        return Promise.all([player.getVideoWidth(), player.getVideoHeight()]).then(dimensions => {
            const [width, height] = dimensions;
            const paddingTop = `${(height / width) * 100}%`;

            videoWrapper.style.padding = `${paddingTop} 0 0`;

            this.videoIndexes.push(videoIndex);

            if (this.videoIndexes.length === this.DOM.videos.length) {
                return "done";
            }
        });
    };
}

const gridNode = document.querySelector(".row--masonry");
if (gridNode !== null) {
    new MasonryGrid(gridNode);
}
