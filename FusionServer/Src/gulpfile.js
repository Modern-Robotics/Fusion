// gulpFile.js

// Grab our gulp packages
var gulp           = require('gulp');
var del            = require('del');
var useref         = require('gulp-useref');
var sourcemaps     = require('gulp-sourcemaps');
var replace        = require('gulp-replace');
var htmlmin        = require('gulp-htmlmin');
var pump           = require('pump');
var obfuscator     = require('gulp-javascript-obfuscator');
var uglify         = require('gulp-uglify-es').default;
var str2hex        = require('gulp-str2hex');
var gnirts         = require('gulp-gnirts');
var cssnano        = require('gulp-cssnano');
var cacheBuster    = require('gulp-cache-bust');
var merge          = require('merge-stream');
var imagemin       = require('gulp-imagemin');
var runSequence    = require('run-sequence');
var rename         = require("gulp-rename");
var fs             = require('fs');


// Variables
var rootDir          = '../..';
var fusionServerDir  = '..';
var buildDir         = '../Build';
var fusionFolder     = 'FusionServer';
var srcDir           = 'public';
var distDir          = buildDir + '/' + 'public';


// Creates build directory if doesn't exist
gulp.task('Create Build Directory', function () {
    if (!fs.existsSync(buildDir)){
        fs.mkdirSync(buildDir);
    }
});


// Deletes everything in the build directory
gulp.task('Clean Build Directory', function () {
    return del([
        buildDir + '/**/*',
        buildDir + '/.**/*',
        buildDir + '/.*'
      ], {
          force: true
      });
});


// Copies the fusion parent directory to the build folder
gulp.task('Copy Fusion Parent Directory', function () {
    return gulp.src([
                    rootDir + '/**/**',
                    //rootDir + '/.**/*',
                    //rootDir + '/.*',
                    '!' + rootDir + '/**/' + fusionFolder + '*/',
                    '!' + rootDir + '/**/' + fusionFolder + '*/**/*'
                ])
    .pipe(gulp.dest(buildDir));
});


// Creates Fusion Server Folder
gulp.task('Create Fusion Server Folder', function () {
    fs.mkdirSync(buildDir + '/' + fusionFolder);
});


// Copies fusion server code
gulp.task('Copy Fusion Server Code', function () {
    return gulp.src([ './**/**',

                    // Ignore node modules
                    '!./**/' + 'node_modules' + '*/',
                    '!./**/' + 'node_modules' + '*/**/*',

                    // Ignore public directory
                    '!./**/' + 'public' + '*/',
                    '!./**/' + 'public' + '*/**/*',

                    // Ignore build directory
                    '!./**/' + 'build' + '*/',
                    '!./**/' + 'build' + '*/**/*',
                
                    // Ignore gulp file
                    '!./gulpfile.js',
                
                    // Ignore bower file
                    '!./bower.json',
                    '!./.bowerrc'
                ]
                )
    .pipe(gulp.dest(buildDir));
});


// Obfuscates the server code
gulp.task('Uglify Server Code', function(cb) {
    pump([
        gulp.src([
            buildDir + '/**/*.js',
            '!' + buildDir + '/node_modules/*',
            '!' + buildDir + '/node_modules/**/*',
            '!' + buildDir + '/public/*',
            '!' + buildDir + '/public/**/*',
            '!' + buildDir + '/scripts/*',
            '!' + buildDir + '/scripts/**/*',
        ]),
        obfuscator(),
        gulp.dest(buildDir)
    ], 
        cb
    );  
});


// Creates Public Folder
gulp.task('Create Public Folder', function () {
    fs.mkdirSync(buildDir + '/public');
});


// Build the index page and concatenates reference files
gulp.task('Build Index', function(){
    return gulp.src(srcDir + '/index.html')
        .pipe(rename('index_uncompressed.html'))
        .pipe(useref())
        .pipe(sourcemaps.write('.'))        
        .pipe(gulp.dest(distDir));
});


// Compresses the index page
gulp.task('Compress Index', function(){
    return gulp.src(distDir + '/index_uncompressed.html')
        .pipe(rename('index.html'))
        .pipe(htmlmin({ collapseWhitespace: true,
            removeComments: true }))
        .pipe(gulp.dest(distDir));
});


// Delete uncompressed index
gulp.task('Delete Uncompressed Index', function(){
    return del([
        distDir + '/index_uncompressed.html'
      ], {
        force: true
    }); 
});


// Copy and minimize views
gulp.task('Build Views', function(){
    return gulp.src([srcDir + '/app/**/*.htm'])
        .pipe(htmlmin({ collapseWhitespace: true,
            removeComments: true }))
        .pipe(gulp.dest(distDir + '/app'));
});


// Create Build Assets Directory
gulp.task('Create Build Assets Directory', function () {
    fs.mkdirSync( distDir + '/assets');
});


// Uglifies angular javascript files
gulp.task('Uglify Angular Files', function(cb) {
    pump([
        gulp.src([distDir + '/ang.js']),
        uglify(),
        str2hex({
            hexall: true,
            placeholdMode: 2,
            compress: true
        }),
        gulp.dest(distDir)
    ], 
        cb
    );  
});


// Uglifies css files
gulp.task('Uglify CSS', function() {
    return gulp.src(distDir + '/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest(distDir));
});


// Busts the cache
gulp.task('Bust Cache', function () {
    return gulp.src(distDir + '/index.html')
        .pipe(cacheBuster())
        .pipe(gulp.dest(distDir));
});


// Copy app assets
gulp.task('Copy Assets To Build', function(){

    // Copy favicon
    var faviconStream = gulp.src([srcDir + '/favicon.ico'])
        .pipe(gulp.dest(distDir));
    
    // Copy docs directory
    var docsStream = gulp.src([srcDir + '/assets/docs/**/*'])
        .pipe(gulp.dest(distDir + '/assets/docs'));

    // Copy img directory
    var imageStream = gulp.src([srcDir + '/assets/img/**/*'])
        .pipe(gulp.dest(distDir + '/assets/img'));

    // Copy il8n directory
    var il8nStream = gulp.src([srcDir + '/assets/i18n/**/*'])
        .pipe(gulp.dest(distDir + '/assets/i18n'));

    // Copy Blockly examples to dist
    var examplesStream = gulp.src([srcDir + '/app/components/blockly/Examples/**/*'])
        .pipe(gulp.dest(distDir + '/app/components/blockly/Examples'));

    // Copy Custom Blockly
    var customBlocklyStream = gulp.src([srcDir + '/assets/custom-blockly/**/*'])
        .pipe(gulp.dest(distDir + '/assets/custom-blockly'));

    // Copy Roboto font
    var robotoStream = gulp.src([srcDir + '/assets/libs/roboto-fontface/**/*'])
        .pipe(gulp.dest(distDir + '/assets/libs/roboto-fontface'));

    // Copy Blockly
    var blocklyStream = gulp.src([srcDir + '/assets/libs/google-blockly/**/*'])
        .pipe(gulp.dest(distDir + '/assets/libs/google-blockly'));

    // Copy Ace Editor
    var aceStream = gulp.src([srcDir + '/assets/libs/ace-builds/**/*'])
        .pipe(gulp.dest(distDir + '/assets/libs/ace-builds'));

    return merge( 
        faviconStream,
        docsStream,
        imageStream,
        il8nStream,
        examplesStream,
        customBlocklyStream,
        //robotoStream,
        //blocklyStream,
        //aceStream
        );

});


// Compress images for better performance
gulp.task('Optimize Src Assets', function(){
    
    // Optimize docs assets
    var stream1 = gulp.src([ srcDir +'/assets/docs/**/*'])
        .pipe(imagemin({verbose: true}))
        .pipe(gulp.dest(srcDir + '/assets/docs'));

    // Optimize img assets
    var stream2 = gulp.src([srcDir + '/assets/img/**/*'])
        .pipe(imagemin({verbose: true}))
        .pipe(gulp.dest(srcDir + '/assets/img'));
    
    return merge(stream1, stream2);

});


// Default gulp build process
gulp.task('default', [], function(cb){
    runSequence(
        'Create Build Directory',
        'Clean Build Directory',
        'Copy Fusion Server Code',
        'Uglify Server Code',
        'Create Public Folder',
        'Build Index',
        'Compress Index',
        'Delete Uncompressed Index',
        'Build Views',
        'Create Build Assets Directory',
        //'Optimize Src Assets',
        'Copy Assets To Build',
        'Uglify Angular Files',
        'Uglify CSS',
        'Bust Cache',
        cb
    );
});