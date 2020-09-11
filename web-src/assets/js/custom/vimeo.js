import Player from "@vimeo/player";

const vimeoNodes = document.querySelectorAll("[data-vimeo-player]");
export const vimeoPlayers = [...vimeoNodes].map((node) => {
    return {
        id: node.dataset.vimeoId,
        vimeoPlayer: new Player(node, {
            autopause: false,
        }),
    };
});
