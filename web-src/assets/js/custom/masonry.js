import imagesLoaded from "imagesloaded";
import { LazyVideo, LazyItems } from "./LazyComponent";
import CalculateVideoHeight from "./CalculateVideoHeight";
import MagicGrid from "magic-grid";

class MasonryGrid {
    constructor(el) {
        this.DOM = { el: el };
        this.DOM.videos = Array.from(this.DOM.el.querySelectorAll("[data-vimeo-player]"));
        this.DOM.images = Array.from(this.DOM.el.querySelectorAll(".img-lazy"));
        this.DOM.items = Array.from(this.DOM.el.querySelectorAll(".media"));
        this.loading = false;

        this.masonry = new MagicGrid({
            container: this.DOM.el,
            static: true,
            animate: true,
            maxColumns: 2,
            gutter: 5,
            center: false
        });

        this.masonry.listen();
        this.initMasonry();
    }
    initMasonry = () => {
        this.setLoading(true);

        imagesLoaded(this.DOM.el, () => {
            if (this.DOM.videos.length > 0) {
                const videoPlayers = new CalculateVideoHeight(this.DOM.videos);

                this.DOM.videos.forEach(async (video, videoIndex) => {
                    const status = await videoPlayers.editVideo(video, videoIndex);

                    if (status === "done") {
                        this.initLazyTypes(["videos", "items"]);
                        this.masonry.positionItems();
                        this.setLoading(false);
                    }
                });
            } else {
                this.initLazyTypes(["items"]);
                this.setLoading(false);
            }
        });
    };
    initLazyTypes = (types) => {
        for (let index = 0; index < types.length; index++) {
            const type = types[index];

            switch (type) {
                case "videos":
                    new LazyVideo(this.DOM.videos);
                    break;
                case "items":
                    new LazyItems(this.DOM.items);
                    break;
            }
        }
    };
    setLoading = (loading) => {
        this.loading = loading;

        document.body.classList[loading ? "add" : "remove"]("is-loading");
    };
}

const gridNode = document.querySelector(".masonry");
export const masonry = gridNode !== null ? new MasonryGrid(gridNode) : null;
