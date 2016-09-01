#! /usr/bin/env node

var fs = require("fs");
var path = require("path");
var shell = require("shelljs");
var gulpfilePath = path.join(path.dirname(fs.realpathSync(__filename)), "../gulpfile.js");

shell.exec("gulp --colors --gulpfile " + gulpfilePath + " " + process.env.npm_config_task + " --env " + process.env.npm_config_env);