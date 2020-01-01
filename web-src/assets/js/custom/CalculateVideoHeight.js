import Player from "@vimeo/player";

export default class CalculateVideoHeight {
    constructor(videos, grid) {
        this.DOM = { videos, grid };

        this.DOM.videos.forEach(video => this.calculateVideoHeight(video));
    }
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

            if (typeof this.DOM.grid !== "undefined") {
                this.DOM.grid.layout();
            }
        });
    };
}

const videoNodes = Array.from(document.querySelectorAll("[data-calculate-video-height]"));
if (videoNodes !== null) {
    new CalculateVideoHeight(videoNodes);
}
