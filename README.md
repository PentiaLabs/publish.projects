# Publish-projects

> Publish files from your source directory to your sitecore site

```shell
npm install publish-projects --save
```

## usage 
The module exports the following gulp tasks:

* publish-all-layers
* publish-project-layer
* publish-context-layer
* publish-feature-layer
* publish-foundation-layer

import in gulpfile.js
```javascript
var package = require('@pentia/publish-projects')
```

use to publish all projects
```shell
gulp publish-all-layers
```

use publish-project-layer to publish only projects in the project folder

use publish-feature-layer to publish only projects in the feature folder

use publish-foundation-layer to publish only projects in the foundation folder

**Note:** 
The publishing is done using the web publish feature of visual studio

## configuration files
### solution-config.json:

```
{
    "msbuild": {
        "showError": false, //controls if errors should be shown in the output
        "showStandardOutput": false, //controls if the standard output of msbuild should be shown
        "toolsversion": 14.0, //controls the msbuild tool version
        "verbosity": "minimal" //sets the verbosity of the msbuild
        "maxcpucount": 0, 
        "nodeReuse": true 
    },
    "configs": [{
        "name": "debug",
        "rootFolder": "C:\\websites\\pentia.boilerplate.local",
        "websiteRoot": "C:\\websites\\pentia.boilerplate.local\\Website", //where all the files are published to
        "websiteDataRoot": "C:\\websites\\pentia.boilerplate.local\\Website\\Data"
    }]
}
```
