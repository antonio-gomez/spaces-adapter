Photoshop Spaces Adapter [![Build Status](https://travis-ci.org/adobe-photoshop/spaces-adapter.svg?branch=master)](https://travis-ci.org/adobe-photoshop/spaces-adapter)
=================

This repository contains:

1. A collection of JavaScript modules, which wrap the low-level Spaces plug-in API into a more friendly, mid-level API.
2. A library of action descriptors, which can be submitted to the Spaces plug-in to drive Photoshop and inspect its state.

These modules are a dependency of the Photoshop Design Space application. For more information, see the [spaces-design repository](https://github.com/adobe-photoshop/spaces-design/).

Usage
-----

If you install through NPM, you can directly import "spaces-adapter" and you will get the Adapter object with
everything attached.

To use these files directly in your ES6 project, one way is to use Webpack.

First, add spaces-adapter sources as a resolve alias:

```
{
    resolve: {
        alias: {
            "spaces-adapter": path.join(__dirname, "node_modules/spaces-adapter/src")
        }
    }
}
```

In your webpack config, change babel-loader exclude rule to ignore `node_modules/spaces-adapter` folder.

```
{
    module: {
        loaders: {
            // ES6 transpiling
            test: /\.jsx?$/,
            exclude: /((node_modules)\/(?!spaces-adapter))/,
            loader: "babel",
            query: {
                presets: ["es2015"]
            }
        }
    }
}
```

Development
-----------

```
# 1. Build spaces-adapter locally
git clone git@github.com:adobe-photoshop/spaces-adapter.git
cd spaces-adapter
npm install
npm link
npm run dev

# 2. Now you can make changes to spaces-adapter.
# The `npm run dev` command will automatically pickup your changes
# and rebuild the package in the `build` folder.

# 3. Link the local spaces-adapter repo to your project.
cd path/to/your/project
npm link spaces-adapter
# Run or restart your project's build command, and test your changes.
```

Contributing
------------

We welcome your contributions! Please see [CONTRIBUTING.md](https://github.com/adobe-photoshop/spaces-adapter/blob/master/CONTRIBUTING.md) for more details.

License
-------

(MIT License)

Copyright (c) 2014 Adobe Systems Incorporated. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.

Third-Party Code
----------------

A list of third-party code used by this project is available at https://github.com/adobe-photoshop/spaces-adapter/wiki/Third-party-code
