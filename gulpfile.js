const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));;

gulp.task('fileinclude', function(done) {
    return gulp.src(['pages/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist'))
        .on('end', done);
});

gulp.task('copy-src', function() {
    return gulp.src('src/**/*')
        .pipe(gulp.dest('dist/src'));
});

gulp.task('sass', function(done) {
    return gulp.src('src/css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/src/css'))
        .on('end', done);
});

gulp.task('copy-assets', function() {
    return gulp.src('src/assets/**/*')
        .pipe(gulp.dest('dist/src/assets'));
});
gulp.task('copy-components', function() {
    return gulp.src('src/components/')
        .pipe(gulp.dest('dist/src/components/*.html'));
});

gulp.task('watch', function() {
    gulp.watch('pages/**/*.html', gulp.series('fileinclude'));
    gulp.watch('src/css/**/*.scss', gulp.series('sass'));
    gulp.watch('src/assets/**/*', gulp.series('copy-assets'));
    gulp.watch('src/components/**/*', gulp.series('copy-components'));
});

gulp.task('default', gulp.series('fileinclude','copy-assets', 'sass', 'watch'));