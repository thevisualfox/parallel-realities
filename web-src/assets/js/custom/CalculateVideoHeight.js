import Player from "@vimeo/player";

export default class CalculateVideoHeight {
    constructor(videos) {
        this.DOM = { videos };
        this.videoIndexes = [];
    }
    editVideo = async (video, videoIndex = undefined) => {
        const videoWrapper = video.parentNode;
        const videoPlayer = new Player(video);

        return Promise.all([videoPlayer.getVideoWidth(), videoPlayer.getVideoHeight()]).then(dimensions => {
            const [width, height] = dimensions;
            const paddingTop = `${(height / width) * 100}%`;

            videoWrapper.style.padding = `${paddingTop} 0 0`;

            this.videoIndexes.push(videoIndex);

            if (this.videoIndexes.length === this.DOM.videos.length) {
                return "done";
            } else {
                return "failed";
            }
        });
    };
}

const videoNodes = Array.from(document.querySelectorAll("[data-calculate-video-height]"));
if (videoNodes !== null) {
    const videoPlayer = new CalculateVideoHeight(videoNodes);
    videoNodes.forEach(video => videoPlayer.editVideo(video));
}
