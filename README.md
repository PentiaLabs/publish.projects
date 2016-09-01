# Pentia.Builder

## configuration files
### solution-config.json:
Contains all the environment specific settings for the solution

- **AlwaysApplyName**: is the name that will be used to identify configuration transform files that will always be run.
forexample web.always.config will always be applied if the setting is set to "always"
- **showError**: Controls if the msbuild will output errors or not
- **showStandardOutput**: Controls if the standard output of the msbuild tasks will be shown in the commandline
- **toolsversion**: Determines which version of the msbuild tools are being used
- **verbosity**: controls the level of verbosity for the msbuild tasks
- **location**: is the path to where the frontend project is placed
- **configs**: is a array of the build configurations and their settings
- **name**:is the name of the configuration, this should match the name of the build configuration in visual studio
- **websiteRoot**: the path to root of the website
- **websiteDataRoot**: the path to the root of the data folder for the website

### solution-packages.json:
Contains the list of packages nessecary for the solution to run.

> All packages needs to be a NuGet Package.
The nuget package needs to have two folders inside it, one called data and one called website. 
The data folder will be copied to the path in the solution-config.json setting called websiteDataRoot
The website folder will be copied to the path in the solution-config.json setting called websiteRoot

- **packageName**: Name of the nuget package in the feed

- **version**: the specific version of the package to be installed

- **location**: the location where the file is located, can be a file share, or http feed.

## Features

1. Get Sitecore
2. Publish site to local webroot
3. Install Packages from packages.json to local webroot
4. Do configuration transforms