"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var svgstore = require("gulp-svgstore");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var del = require("del");
var uglify = require ("gulp-uglify")
var PatternSvg = "{icon-*,logo-htmlacademy,logo-footer}";


gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass({
      includePaths: require('node-normalize-scss').includePaths
    }))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("sprite", function () {
  return gulp.src("source/img/"+PatternSvg+".svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});


gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img/webp"));
});

gulp.task("js", function() {
  return gulp.src(["source/js/script.js", "source/js/svg4everybody.js"])
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest("build/js"))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest("build/js"));
});


gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**",
    "source/pixel-glass/**/*",
    "source/preview/**/*"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    online: true,
    open: false,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/img/"+PatternSvg+".svg", gulp.series("sprite", "html", "reload"));
  gulp.watch("source/*.html", gulp.series("html", "reload"));
});

gulp.task("reload", function (done) {
  server.reload();
  done();
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("build", gulp.series (
  "clean",
  "copy",
  "css",
  "sprite",
  "html",
  "images",
  "webp",
  "js"
));
