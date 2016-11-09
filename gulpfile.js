var gulp = require('gulp');
var flatten = require('gulp-flatten');
var notify = require('gulp-notify');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');


var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Task for moving index.html
// and html templates to the dist folder
gulp.task('move', function(){

	//	Set the source
	gulp.src(['./src/index.html'])
	.pipe(htmlmin({collapseWhitespace: true}))
	//	Pipe it and store it in the dist folder
	.pipe(gulp.dest('./dist'))
	//	Notify the user
	.pipe(notify('Moved index.html'));


	// Set the source. You can exclude files with !
	gulp.src(['!./src/index.html', './src/**/*.html'])
	// Remove any relative folders, subfolders
	.pipe(flatten())
	.pipe(gulp.dest('./dist/templates'))
	.pipe(notify('Moved templates'));

	//	Set the source
	gulp.src(['./src/css/*.css'])
	//	Pipe it and store it in the dist folder
	.pipe(gulp.dest('./dist/css'))
	//	Notify the user
	.pipe(notify('Moved css'));

	//	Set the source
	gulp.src(['./src/fonts/*.*'])
	//	Pipe it and store it in the dist folder
	.pipe(gulp.dest('./dist/fonts'))
	//	Notify the user
	.pipe(notify('Moved fonts'));


});

//	Task for concating and moving all js files
gulp.task('scripts', function(){

	gulp.src(['./src/app.js', './src/**/*.js'])
	// Concat all the js files into a single all.js file
//    .pipe(uglify())
	.pipe(concat('all.js'))
//.pipe(rename({ suffix: '.min' }))
	.pipe(gulp.dest('./dist/js'))
	.pipe(notify('Generated all.js'));

});

//	Task for running a webserver
gulp.task('serve', function(){


	gulp.src('.')
	// Start a webserver with livereload on localhost:48080
	.pipe(webserver({
		port: 48080,
		livereload: true,
		open: 'http://localhost:48080/dist/'
	}));

});


// Task for moving library files to dist/lib/ folder
gulp.task('libs', function () {

	gulp.src(['./bower_components/angular-bootstrap/*.js','./bower_components/bootstrap/dist/js/*.js','./bower_components/jquery/dist/*.js','./bower_components/angular/angular.js','./bower_components/angular/angular.min.js','./bower_components/angular-ui-router/release/angular-ui-router.js','./bower_components/angular-resource/angular-resource.js'])
		.pipe(gulp.dest('./dist/js'))
		.pipe(notify("Copied AngularJS files!"));

	gulp.src(['./bower_components/angular-bootstrap/ui-bootstrap-csp.css','./bower_components/bootstrap/dist/css/bootstrap.min.css', './bower_components/bootstrap/dist/css/bootstrap-theme.min.css'])
		.pipe(gulp.dest('./dist/css'))
		.pipe(notify("Copied Bootstrap CSS files!"));

});

//	Task for running watchers. When watch is called
//	the serve task will be called as well
gulp.task('watch', ['serve'], function(){

	//	Run tasks on start
	gulp.start(['scripts', 'move', 'libs']);

	//	Create a watcher that will run the scripts task
	//	anytime a .js file changes
	gulp.watch(['./src/**/*.js'], ['scripts']);
	gulp.watch(['./src/**/*.html'], ['move']);
});
