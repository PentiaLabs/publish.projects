/*jslint node: true */
"use strict";

var gulp = require("gulp");
var build = require("../build.js");
var config = build.config;
var path = require("path");
var rimrafDir = require("rimraf");
var rimraf = require("gulp-rimraf");

gulp.task("clean-rootFolder", function (callback) {
  build.logEvent("builder", "cleaning: " + config.rootFolder);
  rimrafDir.sync(path.resolve(config.rootFolder));
  build.logEvent("builder", "done cleaning..");
  callback();
});