/* 
  angular-train gulpfile (boilerplate)
    MrPaws 2015
    Support:
    livereload, bower integration, minification and concatenation.
    serves from the build directory but watches on source and 
    runs build tasks on the fly for production view.
    
    Uses a temporary build dir for any tasks that may require it. 
*/


var gulp = require('gulp');
var buildDir = 'build';
var distDir = 'dist'
var $ = require('gulp-load-plugins')();

/* 
    Tasks 
*/ 

/* link bower dependencies */
gulp.task('linkBowerFiles', ['clean','processJs'], function () { 
  var jsDeps = require('main-bower-files')();
  jsDeps.push(buildDir + '/js/project.js');
  return gulp.src(jsDeps)
    .pipe($.concat('all.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(distDir + '/js'))
    .pipe($.connect.reload());
})

/* js post-processing */
gulp.task('processJs', ['clean'], function () {
  return gulp.src('app/js/**/*.js')
    .pipe($.concat('project.js'))
    .pipe(gulp.dest(buildDir + '/js'));
});

/* html post-processing */
gulp.task('html',function () {
  return gulp.src('app/*.html')
    .pipe(gulp.dest(destDir))
    .pipe($.connect.reload());
});

/* css post-processing */
gulp.task('css', function () {
  return gulp.src('app/css/**/*.css')
    .pipe(gulp.dest(destDir + '/css'))
    .pipe($.connect.reload());
});

/* media asset post-processing */
gulp.task('media', function () {
  return gulp.src('app/media/**')
    .pipe(gulp.dest(distDir + '/media'))
    .pipe($.connect.reload());
});

/* browser reloading */
gulp.task('connect', function() {
  $.connect.server({
    root: distDir,
    livereload: true
  });
  require('opn')('http://localhost:8080');
});


/* clean dist dir */
gulp.task('cleanDist', require('del').bind(null, [distDir]));

/* clean build dir */
gulp.task('cleanBuild', require('del').bind(null, [buildDir]));

/* 
   Important Targets 
*/
/* clean build and dist dirs */
gulp.task('clean', ['cleanBuild', 'cleanDist'])

/* build all */
gulp.task('build', ['clean', 'processJs', 'linkBowerFiles', 'cleanBuild']);

/* watch project files and build on the fly as they are modified */
gulp.task('watch', ['connect'], function () {
  gulp.watch(['app/*.html'], ['html']);
  gulp.watch(['app/js/**/*.js'], ['processJs','linkBowerFiles']);
  gulp.watch(['app/css/**/*.css'], ['css']);
  gulp.watch(['app/media/**'], ['media']);
  gulp.watch(['bower.json'], ['processJS', 'linkBowerFiles']);
});

/* default is to build */
gulp.task('default', ['build'])