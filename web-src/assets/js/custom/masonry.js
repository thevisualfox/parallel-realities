import imagesLoaded from "imagesloaded";
import { LazyVideo, LazyItems } from "./LazyComponent";
import Masonry from "masonry-layout";
import calcVideoRatio from "./calcVideoRatio";

class MasonryGrid {
    constructor(el) {
        this.DOM = { el: el };
        this.DOM.videos = Array.from(this.DOM.el.querySelectorAll("[data-vimeo-player]"));
        this.DOM.images = Array.from(this.DOM.el.querySelectorAll(".img-lazy"));
        this.DOM.items = Array.from(this.DOM.el.querySelectorAll(".media"));
        this.loading = false;

        this.masonry = new Masonry(this.DOM.el, {
            itemSelector: ".row__item",
            columnWidth: ".row__item",
            percentPosition: true,
        });

        this.initMasonry();
    }
    initMasonry = () => {
        this.setLoading(true);

        imagesLoaded(this.DOM.el, () => {
            if (this.DOM.videos.length > 0) {
                Promise.allSettled(this.DOM.videos.map((video) => calcVideoRatio(video))).then(() => {
                    this.masonry.layout();
                    this.masonry.on("layoutComplete", () => {
                        this.initLazyTypes(["videos", "items"]);
                        this.setLoading(false);
                    });
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

const gridNode = document.querySelector(".row--masonry");
export const masonry = gridNode !== null ? new MasonryGrid(gridNode) : null;
