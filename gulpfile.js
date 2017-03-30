let Eagle = require('gulp-eagle'),
    config = Eagle.config

config.buildPath = ''
config.sourcemaps = false

Eagle(mix => {
    mix.sass('./style/style.scss')
})

