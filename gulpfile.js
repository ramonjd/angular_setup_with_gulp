/*
angular_setup_with_gulp
TASKS

// bundled
setup:
dev:
build:


// individual
bower:
scss:



*/
var gulp = require('gulp'),
    pkg = require('./package.json'),
    sass = require('gulp-sass'),
    es = require('event-stream'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    bower = require('gulp-bower'),
    inject   = require('gulp-inject'),
    filesize = require('gulp-filesize'),
    sequence = require('run-sequence'),
    karma = require('gulp-karma'),
    notify = require('gulp-notify'),
    bowerFiles = require('gulp-bower-files'),

	config = {

	};


/* LOCAL  ======================================================================================================= 
    - uncompressed, individually embedded scripts and css
    - runs in /app
*/

// get bower files
gulp.task('bower', function() {
  bower('./app/js/vendor/');
});


// compile scss
gulp.task('scss', function() {
  return gulp.src(['./scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('./app/css/'))
    .pipe(filesize())
    .pipe(notify({ message: 'SCSS task complete' }));
});


// update index.html
// https://www.npmjs.org/package/gulp-inject
gulp.task('updateindex', function() {

    // prepare css files
    var cssStream = gulp.src([
            './app/css/screen.css',
            './app/css/print.css'])
          .pipe(inject(gulp.src('./app/css/ie.css', {read: false}), 
            { 
                starttag: '<!-- inject:ie:{{ext}} -->', 
                addRootSlash: false, 
                ignorePath: '/app/'
            }
            )),


    // prepare vendor js files
        vendorStream = gulp.src(
            [
                './app/js/vendor/modernizr/modernizr.js', 
                './app/js/vendor/angular/angular.js', 
                './app/js/vendor/angular-ui-router/release/angular-ui-router.js'
            ], 
            { 
                read: false 
            })
        .pipe(gulp.dest('./app')),



    // prepare app js files
        appStream = gulp.src(
            [
                './app/js/*.js'
            ], 
            { 
                read: false 
            })
        .pipe(gulp.dest('./app'));


    return gulp.src('./app/index.html')
        .pipe(inject(es.merge(cssStream, vendorStream, appStream)), {
            addRootSlash: false,  // ensures proper relative paths
            ignorePath: '/app/' // ensures proper relative paths
        })
        //.pipe(replace('%LANG%', config.lang))
        .pipe(gulp.dest('./app'))
        .pipe(notify({ message: 'HTML task complete' }));
});


// watch files for changes
gulp.task('watch', function() {
    // gulp.watch('app/js/*.js', ['lint', 'jsApp']);
    gulp.watch(['./scss/*.scss', './scss/**/*.scss'], ['scss']);
    // gulp.watch('app/index.html', ['html']);
    console.log('Watching for changes...')
});




/* DEV  ======================================================================================================= 
    - uncompressed, concatenated, optimised images
    - runs in /dev


gulp.task('imagemin', function () {
    return gulp.src('./app/images/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('./app/images'));
});
*/


/* DIST  ======================================================================================================= 
    - compressed, concatenated
    - outputs to /dist
*/


/* BUNDLED TASKS ========================== */

gulp.task('setup', function(callback) {
  sequence(
        'bower',
        'scss'
    );
});

gulp.task('dev', function(callback) {
  sequence(
  		'scss',
        'watch'
    );
});

gulp.task('default', ['dev']);