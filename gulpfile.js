/*jslint node: true */
"use strict";

var gulp = require("gulp");
var nopt = require("nopt");
var path = require("path");
var requireDir = require("require-dir");
var runSequence = require("run-sequence");
var build = require("./build.js");
var fs = require('fs');
var powershell = require("./modules/powershell");
var publish = require("./modules/publish");
var deleteConfig = require("./modules/DeleteConfiguration");
var config = build.config;

var tasks = path.join(__dirname, "gulp-tasks");
var tasks = requireDir(tasks);

var args = nopt({
  "env"     : [String, null],
  "path"    : [String, null]
});

build.setEnvironment(args.env);

gulp.task("deploy-all-to-folder", ["set-temp-output-folder","publish-all-layers"], function (callback) {

}); 

gulp.task("remove-configtransforms", function (callback) {
  build.logEvent("builder", "removing configuration transforms");
  var psFile = path.join(path.dirname(fs.realpathSync(__filename)), "/powershell-scripts/remove-configtransforms.ps1");
  var websiteRoot = build.config.websiteRoot;

  if(!path.isAbsolute(websiteRoot))
  {
    websiteRoot = path.join(process.cwd(),websiteRoot);
  }

  powershell.runAsync(psFile, " -webRootPath " + websiteRoot, callback);
});

gulp.task("set-temp-output-folder", function (callback) {
  var tmpDir = args.path;
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

gulp.task("default", function () {
	console.log("You need to specifiy a task.");
});

exports.publish = publish;
exports.deleteConfig = deleteConfig;
exports.powershell = powershell;