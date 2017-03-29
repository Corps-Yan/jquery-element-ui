var Eagle = require('gulp-eagle'),
    gulp = require('gulp'),
    webpack = require('gulp-webpack'),
    config = Eagle.config,
    $ = Eagle.plugins;

config.buildPath = 'dist';
config.version.enabled = false;
config.browserSync.options.port = 3000;

Eagle.extend('webpack', function (src, output) {
    var paths = new Eagle.GulpPaths().src(src).output(output);

    new Eagle.Task('webpack', function () {
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
                                test: /\.ejs$/,
                                loader: 'ejs-loader'
                            }
                        ]
                    }
                }))
                .pipe($.if(config.production, $.uglify({
                    compress: {
                        drop_console: true
                    }
                })))
                .pipe(gulp.dest(paths.output.baseDir))
        );
    })
        .watch(paths.src.path)
        .ignore(paths.output.path);
});

Eagle(function (mix) {
    mix.sass('./src/jquery-element-ui.scss')
        .webpack('./src/jquery-element-ui.js');

    if (!config.production) {
        mix.copy(['./node_modules/jquery/dist/jquery.js', './examples/index.html']);
    }
});