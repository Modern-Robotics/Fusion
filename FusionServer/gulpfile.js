// gulpFile.js

// grab our gulp packages
var gulp  = require('gulp'),
gutil = require('gulp-util'),
htmlmin = require('gulp-htmlmin'),
useref = require('gulp-useref'),
replace = require('gulp-replace'),
sourcemaps = require('gulp-sourcemaps'),
cacheBuster = require('gulp-cache-bust'),
cache = require('gulp-cache'),
imagemin = require('gulp-imagemin'),
runSequence = require('run-sequence'),
lazypipe = require('lazypipe'),
gulpif = require('gulp-if'),
cssnano = require('gulp-cssnano'),
sourcemaps = require('gulp-sourcemaps'),
uglify = require('gulp-uglify'),
pump = require('pump'),
merge = require('merge-stream');


// Build the index page and concats reference files
gulp.task('buildIndex', function(){
    return gulp.src('public/src/index.html')
        .pipe(useref())
        .pipe(sourcemaps.write('.'))
        .pipe(replace('<base href="/src">', '<base href="/dist">'))
        .pipe(gulp.dest('public/dist'));
});

// Copy and minimize views
gulp.task('copyComponentViews', function(){
    return gulp.src(['public/src/app/**/*.htm'])
        .pipe(htmlmin({ collapseWhitespace: true,
            removeComments: true }))
        .pipe(gulp.dest('public/dist/app'));
});

// Copy app assets
gulp.task('copyAssets', function(){
    
    // copy docs directory
    var stream1 = gulp.src(['public/src/assets/docs/**/*'])
        .pipe(gulp.dest('public/dist/assets/docs'));

    // // copy img directory
    var stream2 = gulp.src(['public/src/assets/img/**/*'])
        .pipe(gulp.dest('public/dist/assets/img'));

    // Gets ace libraries
    var stream3 = gulp.src(['public/src/assets/libs/ace-builds/**/*'])
        .pipe(gulp.dest('public/dist/assets/libs/ace-builds'));

    // Gets font awesome
    var stream4 = gulp.src(['public/src/assets/libs/google-blockly-29810d5/**/*'])
        .pipe(gulp.dest('public/dist/assets/libs/google-blockly-29810d5'));

    // Gets bootstrap
    var stream5 = gulp.src(['public/src/assets/libs/bootstrap/dist/**/*'])
        .pipe(gulp.dest('public/dist/assets/libs/bootstrap/dist'));

    // Gets font awesome
    var stream6 = gulp.src(['public/src/assets/libs/font-awesome/**/*'])
        .pipe(gulp.dest('public/dist/assets/libs/font-awesome'));

    return merge(stream1, stream2, stream3, stream4, stream5, stream6);

});

// Uglifies javascript files
gulp.task('uglifyJS', function(cb) {    
    pump([
        gulp.src('public/dist/*.js'),
        uglify(),
        gulp.dest('public/dist')
    ],
    cb
  );
});

// Uglifies css files
gulp.task('uglifyCss', function() {
    return gulp.src('public/dist/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('public/dist'));
});

// Compress images for better performance
gulp.task('optimizeImages', function(){
    
    // optimize assets docs
    var stream1 = gulp.src(['public/src/assets/docs/**/*'])
        .pipe(imagemin({verbose: true}))
        .pipe(gulp.dest('public/src/assets/docs'));

    // optimize assets img
    var stream2 = gulp.src(['public/src/assets/img/**/*'])
        .pipe(imagemin({verbose: true}))
        .pipe(gulp.dest('public/src/assets/img'));
    
    return merge(stream1, stream2);

});

// Busts the cache
gulp.task('cacheBuster', function () {
    return gulp.src('public/dist/index.html')
        .pipe(cacheBuster())
        .pipe(gulp.dest('public/dist'));
});

// create a default task and just log a message
gulp.task('default', [], function(){
    runSequence('buildIndex', 'copyComponentViews', 'optimizeImages', 'copyAssets', 'uglifyJS', 'uglifyCss', 'cacheBuster');
});