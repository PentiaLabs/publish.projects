/*jslint node: true */
'use strict';

var gulp = require('gulp');
var build = require("../build.js");
var foreach = require("gulp-foreach");
var msbuild = require("gulp-msbuild");
var debug = require("gulp-debug");

gulp.task("apply-xml-transform", function () {
  var layerPathFilters = [
  "./src/Foundation/**/*"+build.AlwaysApplyName+".config",
  "./src/Feature/**/*"+build.AlwaysApplyName+".config",
  "./src/Context/**/*"+build.AlwaysApplyName+".config",
  "./src/Foundation/**/*"+build.config.name+".config", 
  "./src/Feature/**/*"+build.config.name+".config", 
  "./src/Context/**/*"+build.config.name+".config", 
  "!./src/**/obj/**/*.transform", 
  "!./src/**/bin/**/*.transform",
  "!./src/**/output/**/*.transform"];

  return gulp.src(layerPathFilters)
    .pipe(foreach(function (stream, file) {
      if(file.path.indexOf("web."+build.config.name+".config") == -1 && file.path.indexOf("web."+build.AlwaysApplyName+".config") == -1)
      {
        var fileToTransform = file.path.slice(file.path.indexOf("App_Config")).replace("."+build.config.name,"");
      }
      else
      {
        var fileToTransform = "web.config";
      }

      console.log("Applying configuration transform: " + file.path);
      console.log("To desitionation file:            " + build.config.websiteRoot + "\\" + fileToTransform)
      return gulp.src("./node_modules/pentia-builder/applytransform.targets")
        .pipe(msbuild({
          targets: ["ApplyTransform"],
          configuration: build.config.name,
          logCommand: false,
          stderr: build.solutionConfiguration.msbuild.showError,
          stdout: build.solutionConfiguration.msbuild.showStandardOutput,
          verbosity: build.solutionConfiguration.msbuild.verbosity,
          maxcpucount: 0,
          toolsVersion: build.solutionConfiguration.msbuild.toolsversion,
          properties: {
            WebConfigToTransform: build.config.websiteRoot,
            TransformFile: file.path,
            FileToTransform: fileToTransform
          }
        }));
    }));
});