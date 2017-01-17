var gulp = require('gulp');
var build = require("../build.js");
var foreach = require("gulp-foreach");
var msbuild = require("gulp-msbuild");
var debug = require("gulp-debug");
var path = require("path");
var fs = require('fs');
var powershell = require("./powershell");

function DeleteConfiguration () {
}

DeleteConfiguration.prototype.delete = function (callback) {
  build.logEvent("builder", "removing configuration transforms");
  var psFile = path.join(path.dirname(fs.realpathSync(__filename)), "../powershell-scripts/remove-configtransforms.ps1");
  var websiteRoot = build.config.websiteRoot;

  if(!path.isAbsolute(websiteRoot))
  {
    websiteRoot = path.join(process.cwd(),websiteRoot);
  }

  powershell.runAsync(psFile, " -webRootPath " + websiteRoot, callback);
};

exports = module.exports = new DeleteConfiguration();