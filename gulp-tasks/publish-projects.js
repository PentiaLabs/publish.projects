var gulp = require("gulp");
var publish = require("../modules/publish");
var runSequence = require("run-sequence");
var build = require("../build.js");
var powershell = require("../modules/powershell");
var path = require("path");
var fs = require("fs")

gulp.task("publish-foundation-layer", function () {
  return publish.publishProjects("./src/Foundation");
});

gulp.task("publish-feature-layer", function () {
  return publish.publishProjects("./src/Feature");
});

gulp.task("publish-context-layer", function () {
    return publish.publishProjects("./src/Context");
});

gulp.task("publish-all-layers", function (callback) {
  runSequence(
    "publish-context-layer",
    "publish-feature-layer",
    "publish-foundation-layer", callback);
});