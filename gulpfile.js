/*jslint node: true */
"use strict";

var gulp = require("gulp");
var nopt = require("nopt");
var path = require("path");
var requireDir = require("require-dir");
var runSequence = require("run-sequence");
var build = require("./build.js");
var fs = require('fs');
var config = build.config;

var tasks = path.join(__dirname, "gulp-tasks");
var tasks = requireDir(tasks);

var args = nopt({
  "env"     : [String, null]
});

build.setEnvironment(args.env);
  
gulp.task("setup", ["clean-rootFolder"], function (callback) {
  runSequence(
    "install-packages"
    , callback);
});

gulp.task("set-temp-output-folder", function (callback) {
  var tmpDir = "./tmp";
  if (!fs.existsSync(tmpDir)){
    fs.mkdirSync(tmpDir);
  }
  if (!fs.existsSync(tmpDir + "/Website")){
      fs.mkdirSync(tmpDir + "/Website");
  }
  config.rootFolder = path.resolve(tmpDir);
  config.websiteRoot = path.resolve(tmpDir);
  callback();
});

gulp.task("create-full-package", function (callback) {
  runSequence(
    "set-temp-output-folder",
    "install-packages",
    "publish-all-layers-for-package",
    "apply-xml-transform"
    , callback);
});

gulp.task("create-release-package", function (callback) {
  runSequence(
    "set-temp-output-folder",
    "publish-all-layers-for-package"
    , callback);
});


gulp.task("default", function () {
	console.log("You need to specifiy a task.");
});

