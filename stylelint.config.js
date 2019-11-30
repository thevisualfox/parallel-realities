module.exports = {
    extends: "stylelint-config-standard",
    plugins: ["stylelint-scss"],
    rules: {
        "at-rule-no-unknown": null,
        "block-no-empty": null,
        indentation: 4,
        "selector-pseudo-element-colon-notation": "single",
        "scss/at-rule-no-unknown": true
    },
    ignoreFiles: ["./vendor/**/*", "./web/**/*"]
};
