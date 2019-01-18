const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const postcss = require('gulp-postcss');
const  sourcemaps = require('gulp-sourcemaps');
const log = require('fancy-log');
const plumber = require('gulp-plumber');

const sassSourceFile = 'dev/scss/**/*.scss';
const outputFolder = 'public/stylessheets';
const watchedResources = 'dev/scss/**/*';

gulp.task('scss', function (done) {
  gulp.src(sassSourceFile)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass().on('error', function(err){
    log.error(err.message);
    }))
    .pipe(postcss([autoprefixer, cssnano]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(outputFolder))
    .on('end', done)
});

gulp.task('watch',gulp.series('scss', function (done) {
    gulp.watch(watchedResources, gulp.parallel('scss')); done();
  }));

gulp.task('default', gulp.series(gulp.parallel('watch', function () {})
)
);
