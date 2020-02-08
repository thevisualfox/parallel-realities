const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const DashboardPlugin = require('webpack-dashboard/plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = merge(common, {
    mode: 'development',
    watch: true,
    watchOptions: {
        ignored: /node_modules/
    },
    plugins: [
        new DashboardPlugin(),
        new WebpackNotifierPlugin()
    ]
});
