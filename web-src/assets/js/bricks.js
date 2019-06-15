import Bricks from "./bricksSource";

const sizes = [
    { columns: 1, gutter: 10 },
    { mq: "768px", columns: 2, gutter: 25 },
    { mq: "992px", columns: 3, gutter: 25 }
];

const instance = Bricks({
    container: "[data-grid]",
    packed: "data-packed",
    sizes: sizes
});

document.addEventListener("DOMContentLoaded", event => {
    instance
        .resize(true) // bind resize handler
        .pack(); // pack initial items
});

instance.pack();
