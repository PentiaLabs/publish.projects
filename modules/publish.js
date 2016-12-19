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

  //Added for backwards compatibility - wasnt added in config before 0.1.8
  if(!build.solutionConfiguration.msbuild.nodeReuse)
  {
    build.solutionConfiguration.msbuild.nodeReuse = false;
  }

  //Added for backwards compatibility - wasnt added in config before 0.1.8
  if(!build.solutionConfiguration.msbuild.maxcpucount)
  {
    build.solutionConfiguration.msbuild.maxcpucount = 0;
  }

  console.log("publish to " + dest + " folder");
  return gulp.src([location + "/**/*.csproj", "!" + location + "/**/*Tests.csproj", +location + "/**/*Test.csproj", "!" + location + "/**/*Specflow.csproj"])
    .pipe(foreach(function (stream, file) {
      return stream
        .pipe(debug({ title: "Building project:" }))
        .pipe(msbuild({
          targets: ["WebPublish"],
          configuration: build.config.name,
          logCommand: false,
          stderr: build.solutionConfiguration.msbuild.showError,
          stdout: build.solutionConfiguration.msbuild.showStandardOutput,
          verbosity: build.solutionConfiguration.msbuild.verbosity,
          maxcpucount: build.solutionConfiguration.msbuild.maxcpucount,
          nodeReuse: build.solutionConfiguration.msbuild.nodeReuse,
          toolsVersion: build.solutionConfiguration.msbuild.toolsversion,
          properties: {
            DeployOnBuild: "true",
            DeployDefaultTarget: "WebPublish",
            WebPublishMethod: "FileSystem",
            DeleteExistingFiles: "false",
            publishUrl: dest,
            _FindDependencies: "false",
            MSDeployUseChecksum: "true"
          }
        }));
    }));
};

exports = module.exports = new Publish();