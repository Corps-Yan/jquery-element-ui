var Eagle = require('gulp-eagle'),
    gulp = require('gulp'),
    webpack = require('gulp-webpack'),
    config = Eagle.config,
    $ = Eagle.plugins;

config.buildPath = 'dist';

Eagle.extend('base64', function (src, output, removePath) {
    var paths = new Eagle.GulpPaths().src(src).output(output);

    removePath = typeof removePath === 'boolean' ? removePath : config.removePath;

    new Eagle.Task('base64', function () {
        this.log(paths.src, paths.output);

        return (
            gulp
                .src(paths.src.path)
                .pipe(webpack({
                    output: {
                        filename: paths.src.name
                    },
                    module: {
                        loaders: [
                            {
                                test: /\.svg$/,
                                loader: 'url-loader?limit=8192'
                            }
                        ]
                    }
                }))
                .pipe($.if(config.production, $.uglify({
                    compress: {
                        drop_console: true
                    }
                })))
                .pipe($.if(removePath, $.rename({
                    dirname: ''
                })))
                .pipe(gulp.dest(paths.output.baseDir))
        );
    })
        .watch(paths.src.path)
        .ignore(paths.output.path);
});

Eagle(function (mix) {
    mix.sass('./src/jquery-element-ui.scss')
        .base64('./src/jquery-element-ui.js')
        .copy(['./node_modules/jquery/dist/jquery.js']);

    if (!config.production) {
        mix.copy('./examples/index.html');
    }
});