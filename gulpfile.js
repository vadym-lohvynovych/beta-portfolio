
const
    gulp = require('gulp'),
    scss = require('gulp-sass'),
    concat = require('gulp-concat'),
    sMaps = require('gulp-sourcemaps'),
    prefix = require('gulp-autoprefixer'),
    gulpIf = require('gulp-if'),
    uglify = require('gulp-uglify-es').default,
    rename = require('gulp-rename'),
    del = require('del'),
    sync = require('browser-sync');

const production = process.env.NODE_ENV === 'production';

const jsFiles = [
    'src/js/jquery-3.4.1.min.js',
    'src/js/main.js'
];

gulp.task('html', () => {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist'))
});

gulp.task('styles', () => {
    return gulp.src('src/styles/main.scss')
        .pipe(gulpIf(!production, sMaps.init()))
        .pipe(scss())
        .pipe(prefix())
        .pipe(gulpIf(!production, sMaps.write()))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('fonts', () => {
    return gulp.src('src/fonts/**/**.*', {base: 'src'})
        .pipe(gulp.dest('dist'));
});

gulp.task('js', () => {
    return gulp.src(jsFiles)
        .pipe(gulpIf(!production, sMaps.init()))
        .pipe(concat('main.min.js'))
        .pipe(gulpIf(production, uglify()))
        .pipe(gulpIf(!production, sMaps.write()))
        // .pipe(rename('main.min.js'))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('images', () => {
    return gulp.src('src/img/**.*')
        .pipe(gulp.dest('dist/img'))
});


gulp.task('serve', () => {
    sync.init({
        server: 'dist'
    });
    sync.watch('src/**/**.*').on('change', sync.reload)
});


gulp.task('watch', () => {
    gulp.watch('src/index.html', gulp.series('html'));
    gulp.watch('src/styles/**.scss', gulp.series('styles'));
    gulp.watch('src/fonts/**/**.*', gulp.series('fonts'));
    gulp.watch(jsFiles, gulp.series('js'));
    gulp.watch('src/img/**.*', gulp.series('images'));
});

gulp.task('clean', () => {
    return del('dist');
});

gulp.task('build', gulp.series('clean', gulp.parallel('html', 'styles', 'fonts', 'js', 'images')));

gulp.task('develop', gulp.series('build', gulp.parallel('watch', 'serve')));