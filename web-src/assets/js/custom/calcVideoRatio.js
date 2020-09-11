import { vimeoPlayers } from "./vimeo";

const calcVideoRatio = async (video) => {
    const videoWrapper = video.parentNode;
    const { vimeoPlayer } = vimeoPlayers.find((player) => player.id === video.dataset.vimeoId);

    const [width, height] = await getPlayerDimensions(vimeoPlayer);

    const paddingTop = `${(height / width) * 100}%`;

    videoWrapper.style.padding = `${paddingTop} 0 0`;
};

const getPlayerDimensions = async (videoPlayer) => {
    const dimensions = await Promise.all([videoPlayer.getVideoWidth(), videoPlayer.getVideoHeight()]);

    return dimensions;
};

const videoNodes = document.querySelectorAll("[data-calculate-video-height]");
[...videoNodes].forEach((video) => calcVideoRatio(video));

export default calcVideoRatio;
