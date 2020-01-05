import imagesLoaded from "imagesloaded";
import { LazyVideo } from "./LazyComponent";
import CalculateVideoHeight from "./CalculateVideoHeight";

class MasonryGrid {
    constructor(el) {
        this.DOM = { el: el };
        this.DOM.videos = Array.from(this.DOM.el.querySelectorAll("[data-vimeo-player]"));
        this.DOM.images = Array.from(this.DOM.el.querySelectorAll(".img-lazy"));
        this.DOM.items = Array.from(this.DOM.el.querySelectorAll(".media"));

        this.initMasonry();
    }
    initMasonry = () => {
        imagesLoaded(this.DOM.el, () => {
            if (this.DOM.videos.length > 0) {
                const videoPlayers = new CalculateVideoHeight(this.DOM.videos);

                this.DOM.videos.forEach(async (video, videoIndex) => {
                    const status = await videoPlayers.editVideo(video, videoIndex);

                    if (status === "done") {
                        this.initLazyTypes(["videos"]);
                    }
                });
            }
        });
    };
    initLazyTypes = types => {
        for (let index = 0; index < types.length; index++) {
            const type = types[index];

            switch (type) {
                case "videos":
                    new LazyVideo(this.DOM.items);
                    break;
            }
        }
    };
}

const gridNode = document.querySelector(".row--masonry");
if (gridNode !== null) {
    new MasonryGrid(gridNode);
}
