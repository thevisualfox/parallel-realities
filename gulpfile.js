var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    del = require('del'),
    fs = require('fs'),
    lazypipe = require('lazypipe'),
    named = require('vinyl-named'),
    siphon = require('siphon-media-query'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano')
    notify = require('gulp-notify'),
    webpack2 = require('webpack'),
    wpStream = require('webpack-stream'),
    yaml = require('js-yaml'),
    yargs = require('yargs'),
    path = require('path'),
    objectMerge = require('object-merge');

// Load the configuration file
var yamlFile = yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'));

// Set the app-channel as default
var channel = yargs.argv.channel ? yargs.argv.channel : 'app';

// Set the configuration channel
var config = yamlFile[channel];

// Webpack configuration
var webpackConfig = {
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    }
};

// PostCSS configuration
var postCssPlugins = [
    autoprefixer()
];

if (yargs.argv.production) {
    postCssPlugins.push(cssnano());
}

// Plumber error handler
var reportError = function (error) {

    notify({
        title: 'Task Failed in ' + error.plugin,
        message: "<%= error.message %>",
        sound: 'Frog'
    }).write(error);

    // Prevent the 'watch' task from stopping
    this.emit('end');
};

// Gulp tasks
gulp.task('default', config.default);

gulp.task('build', config.build);

gulp.task('deploy', config.deploy);

gulp.task('watch', ['build'], function () {
    for (var i = 0; i < config.watch.tasks.length; i++) {
        gulp.watch(config.watch.tasks[i].source, config.watch.tasks[i].task);
    }
});

gulp.task('clean', function () {
    return del.sync(config.clean.dir, {
        force: true
    });
});

gulp.task('css', function () {
    return gulp
        .src(config.css.source)
        .pipe($.if(yargs.argv.development, $.sourcemaps.init()))
        .pipe($.if(yargs.argv.development, $.plumber({errorHandler: reportError})))
        .pipe($.sass(config.css.plugins.sass).on('error', $.sass.logError))
        .pipe($.postcss(postCssPlugins))
        .pipe($.if(yargs.argv.development, $.sourcemaps.write('.')))
        .pipe(gulp.dest(config.css.destination));
});

gulp.task('js', function () {
    return gulp
        .src(config.js.source)
        .pipe($.if(yargs.argv.development, $.plumber({errorHandler: reportError})))
        .pipe(named())
        .pipe(wpStream(webpackConfig, webpack2))
        .pipe(
            $.if(
                yargs.argv.production,
                $.uglify().on('error', error => {
                    console.log(error);
                })
            )
        )
        .pipe(gulp.dest(config.js.destination));
});

gulp.task('img', function () {
    return gulp
        .src(config.img.source)
        .pipe($.if(yargs.argv.development, $.plumber({errorHandler: reportError})))
        .pipe($.changed(config.img.destination))
        .pipe($.if(yargs.argv.production, $.imagemin([
            $.imagemin.gifsicle({interlaced: true}),
            $.imagemin.jpegtran({progressive: true}),
            $.imagemin.svgo({
                plugins: [
                    {removeViewBox: false}
                ]
            })
        ])))
        .pipe(gulp.dest(config.img.destination));
});

gulp.task('symbols', function () {
    return gulp
        .src(config.symbols.source)
        .pipe($.svgSprite(config.symbols.plugins.svgSprite))
        .pipe(gulp.dest(config.symbols.destination));
});

gulp.task('assets', function () {
    return gulp
        .src(config.assets.source, {base: config.assets.base})
        .pipe($.changed(config.assets.destination))
        .pipe(gulp.dest(config.assets.destination));
});

gulp.task('copy', function () {
    return gulp
        .src(config.copy.source, {base: config.copy.base})
        .pipe($.changed(config.copy.destination))
        .pipe(gulp.dest(config.copy.destination));
});

gulp.task('inline', ['html', 'css'], function () {
    return gulp
        .src(config.inline.source)
        .pipe(inliner(config.css.destination + '/' + channel + '.css'))
        .pipe(gulp.dest(config.inline.destination));
});

function inliner(css) {
    var css = fs.readFileSync(css).toString();
    var mediaQueries = siphon(css);

    var pipe = lazypipe()
        .pipe($.inlineCss, {
            applyStyleTags: false,
            removeStyleTags: false,
            removeLinkTags: false
        })
        .pipe($.replace, '<!-- <style> -->', `<style>${mediaQueries}</style>`);

    return pipe();
}
