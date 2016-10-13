var gulp = require('gulp');
var build = require("../build.js");
var foreach = require("gulp-foreach");
var msbuild = require("gulp-msbuild");
var debug = require("gulp-debug");
var path = require("path");

function Publish () {
}

Publish.prototype.publishProjects = function (location, dest) {
  dest = dest || build.config.websiteRoot;

  if(!path.isAbsolute(dest))
  {
    dest = path.join(process.cwd(),dest);
  }

  console.log("publish to " + dest + " folder");
  return gulp.src([location + "/**/*.csproj", "!" + location + "/**/*Tests.csproj", +location + "/**/*Test.csproj", "!" + location + "/**/*Specflow.csproj"])
    .pipe(foreach(function (stream, file) {
      return stream
        .pipe(debug({ title: "Building project:" }))
        .pipe(msbuild({
          targets: ["Clean", "Build"],
          configuration: build.config.name,
          logCommand: false,
          stderr: build.solutionConfiguration.msbuild.showError,
          stdout: build.solutionConfiguration.msbuild.showStandardOutput,
          verbosity: build.solutionConfiguration.msbuild.verbosity,
          maxcpucount: 0,
          toolsVersion: build.solutionConfiguration.msbuild.toolsversion,
          properties: {
            DeployOnBuild: "true",
            DeployDefaultTarget: "WebPublish",
            WebPublishMethod: "FileSystem",
            DeleteExistingFiles: "false",
            publishUrl: dest,
            _FindDependencies: "false"
          }
        }));
    }));
};

exports = module.exports = new Publish();