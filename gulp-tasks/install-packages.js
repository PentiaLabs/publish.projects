/*jslint node: true */
"use strict";

var gulp = require("gulp");
var build = require("../build.js");
var config = build.config;
var powershell = require("../modules/powershell");
var path = require("path");
var fs = require("fs")

gulp.task("install-packages", function (callback) {
  build.logEvent("builder", "Installing packages");
  var psFile = path.join(path.dirname(fs.realpathSync(__filename)), "../powershell-scripts/Install-packages.ps1");
  var packagesConfig = path.join(path.dirname(fs.realpathSync(__filename)), "../solution-packages.json");
  powershell.runAsync(psFile, " -packagesFileLocation '" + packagesConfig + "'" + " -webRootPath " + config.websiteRoot + " -dataRootPath " + config.websiteDataRoot, callback);
});
