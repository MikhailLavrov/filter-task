import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import del from 'del';
import browser from 'browser-sync';

// Styles
export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

//Html
const html = () => {
  return gulp.src('source/*.html')
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('build'));
}

//Scripts
const scripts = () => {
  return gulp.src('source/js/*.js')
  .pipe(terser())
  .pipe(gulp.dest('build/js'))
}

//Images
const optimizeImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(squoosh())
  .pipe(gulp.dest('build/img'))
}

const copyImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(gulp.dest('build/img'))
}

//Webp
const createWebp = () => {
  return gulp.src('source/img/**/*.{jpg,png}', '!source/img/favicons', '!source/img/location')
  .pipe(squoosh({
    webp: {}
  }))
  .pipe(gulp.dest('build/img'))
}


// Svg
const svg = () => {
  return gulp.src('source/img/**/*.svg', '!source/img/icons/*.svg')
  .pipe(svgo())
  .pipe(gulp.dest('build/img'));
}

const sprite = () => {
  return gulp.src('source/img/icons/*.svg')
  .pipe(svgo())
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('build/img'));
}

//Copy
const copy = (done) => {
  gulp.src([
    'source/fonts/*.{woff2,woff}',
    'source/*.ico',
    'source/*.webmanifest',
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'))
  done();
}

//Clean
const clean = (done) => {
  return del('build');
};

// Server
const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

//Reload
const reload = (done) => {
  browser.reload();
  done();
}

// Watcher
const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/script.js', gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html,reload));
}

//Build
export const build = gulp.series(
  clean, copy, optimizeImages,

  gulp.parallel(styles,html,scripts,svg,sprite,createWebp),
);

//Default
export default gulp.series(
  clean, copy, copyImages,

  gulp.parallel(styles,html,scripts,svg,sprite,createWebp),

  gulp.series(server,watcher)
);
