const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync');
const htmlSrc = 'app/*.html'
const scssSrc = 'app/scss/**/*.scss'
const jsSrc = ['app/js/common.js', 'app/libs/**/*.js']


gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('scss', () => {
    return gulp.src(scssSrc)
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', () => {
    return gulp.src(htmlSrc)
        .pipe(browserSync.reload({stream: true}))
})

gulp.task('js', () => {
    return gulp.src(jsSrc)
        .pipe(browserSync.reload({stream: true}))
})

gulp.task('watch', () => {
    gulp.watch(scssSrc, gulp.parallel('scss'))
    gulp.watch(htmlSrc, gulp.parallel('html'))
    gulp.watch(jsSrc, gulp.parallel('js'))
});

gulp.task('default', gulp.parallel('scss', 'browser-sync', 'watch'));