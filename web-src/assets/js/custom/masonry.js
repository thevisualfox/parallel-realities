import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";
import CalculateVideoHeight from './CalculateVideoHeight';

class MasonryGrid {
    constructor(el) {
        this.DOM = { el: el };
        this.DOM.videos = Array.from(this.DOM.el.querySelectorAll("[data-vimeo-player]"));
        this.grid = new Masonry(this.DOM.el, {
            itemSelector: ".row__item",
            columnWidth: ".row__item",
            percentPosition: true
        });

        this.initMasonry();
    }
    initMasonry = () => {
        new imagesLoaded(this.DOM.el, () => {
            this.grid.layout();
        });

        new CalculateVideoHeight(this.DOM.videos, this.grid)
    };
}

// class Masonry {
//     constructor(el) {
//         this.DOM = { el: el };
//         this.gridItems = this.DOM.el.getElementsByClassName("grid__item");

//         /* Get cases observer to play videos on intersection */
//         this.cases = document.getElementById("cases");
//         this.casesObserver = document.getElementsByClassName("cases-observer")[0];
//         this.casesObserver.__link = this.cases;
//         this.casesIsPlaying = false;

//         /* Get the grid object, its row-gap, and the size of its implicit rows */
//         this.rowGap = parseInt(window.getComputedStyle(this.DOM.el).getPropertyValue("grid-row-gap"));
//         this.rowHeight = parseInt(window.getComputedStyle(this.DOM.el).getPropertyValue("grid-auto-rows"));

//         /* Wait for images to load en initialize events */
//         this.imagesLoaded();
//     }
//     imagesLoaded() {
//         imagesLoaded(this.DOM.el, () => {
//             this.initEvents();
//         });
//     }
//     initEvents() {
//         /* Resize all the grid items on the load and resize events */
//         const masonryEvents = ["load", "resize"];
//         masonryEvents.forEach(event => {
//             window.addEventListener(event, this.resizeAllMasonryItems());
//         });

//         /* Get video's and pauze them on load */
//         document.querySelectorAll("[data-vimeo-player]").forEach(video => {
//             const player = new Player(video);
//             player.pause();
//         });

//         /* Initialize new Interestion observer */
//         new IntersectionObserver(this.onIntersection, { threshold: 1 }).observe(this.casesObserver);
//     }
//     resizeAllMasonryItems() {
//         /*
//          * Loop through the grid items and execute the spanning function to
//          * each list-item (i.e. each masonry item)
//          */
//         for (let index = 0; index < this.gridItems.length; index++) {
//             this.resizeMasonryItem(this.gridItems[index]);
//         }
//     }
//     resizeMasonryItem(item) {
//         /* Specify which kind of masonry item it is and run specific function */
//         if (item.classList.contains("grid__item--video") && window.innerWidth > 992) {
//             this.resizeMasonryVideo(item);
//         } else {
//             this.resizeMasonryImage(item);
//         }
//     }
//     resizeMasonryVideo(item) {
//         /* Get the bounds of the video */
//         const bounds = item.querySelector(".media__container");

//         /* Initialize a new Player class and stop the video from playing */
//         const player = new Player(bounds.children[0]);

//         /* Get video width and height */
//         Promise.all([player.getVideoWidth(), player.getVideoHeight()]).then(dimensions => {
//             const [width, height] = dimensions;
//             const paddingTop = `${(height / width) * 100}%`;

//             /* Calculate the rowSpan */
//             const rowSpan = Math.ceil(
//                 (bounds.getBoundingClientRect().height + this.rowGap) / (this.rowHeight + this.rowGap)
//             );

//             /* Set the calculated padding to the video bounds */
//             bounds.style.padding = `${paddingTop} 0 0`;

//             /* Set the spanning as calculated above (S) */
//             item.style.gridRowEnd = "span " + rowSpan;

//             /* Make the video take all the available space in the cell/item */
//             bounds.style.height = rowSpan * 5 - 5 + "px";
//         });
//     }
//     resizeMasonryImage(item) {
//         /* Get the bounds of the image */
//         const bounds = item.querySelector(".img-fluid");

//         if (bounds !== null) {
//             /* Calculate the rowSpan */
//             const rowSpan = Math.ceil(
//                 (bounds.getBoundingClientRect().height + this.rowGap) / (this.rowHeight + this.rowGap)
//             );

//             /* Set the spanning as calculated above (S) */
//             item.style.gridRowEnd = "span " + rowSpan;

//             /* Make the images take all the available space in the cell/item */
//             bounds.style.height = rowSpan * 5 + "px";
//         }
//     }
//     onIntersection(entries) {
//         if (this.casesIsPlaying) return;

//         entries.forEach(entry => {
//             if (entry.target.className === "cases-observer" && entry.intersectionRatio === 1) {
//                 this.casesIsPlaying = true;

//                 /* Get video's and play them on intersection */
//                 document.querySelectorAll("[data-vimeo-player]").forEach(video => {
//                     const player = new Player(video);
//                     player.play();
//                 });
//             }
//         });
//     }
// }

const gridNode = document.querySelector(".row--masonry");
if (gridNode !== null) {
    new MasonryGrid(gridNode);
}
