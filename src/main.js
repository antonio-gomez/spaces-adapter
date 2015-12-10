/*
 * Copyright (c) 2014 Adobe Systems Incorporated. All rights reserved.
 *  
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 *  
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *  
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 * 
 */

/* global _spaces */

define(function (require, exports) {
    "use strict";

    var Promise = require("bluebird");

    /**
     * The minimum-compatible plugin version number. 
     *
     * @const
     * @type {{major: number=, minor: number=, patch: number=}}
     */
    var COMPATIBLE_PLUGIN_VERSION = {
        major: 2,
        minor: 0,
        patch: 14
    };

    /**
     * Determine whether v1 is compatible to v2.
     * 
     * @private
     * @param {{major: number=, minor: number=, patch: number=}} v1
     * @param {{major: number=, minor: number=, patch: number=}} v2
     * @return {boolean}
     */
    var _versionCompatible = function (v1, v2) {
        if (v1.hasOwnProperty("major") && v1.major !== v2.major) {
            return false;
        }

        if (v1.hasOwnProperty("minor") && v1.minor > v2.minor) {
            return false;
        }

        return true;
    };

    /**
     * Check if the current plugin version is compatible with the specified
     * minimum-compatible plugin version.
     * 
     * @return {boolean}
     */
    var isPluginCompatible = function () {
        var pluginVersion = _spaces.version;

        return _versionCompatible(COMPATIBLE_PLUGIN_VERSION, pluginVersion);
    };

    /**
     * Promisified version of _spaces.
     */
    var _main = Promise.promisifyAll(_spaces);

    Object.defineProperties(exports, {
        /**
         * Version of the Spaces adapter plugin API.
         * Follows Semver 2.0.0 conventions: http://semver.org/spec/v2.0.0.html
         *
         * @const
         * @type {{major: number, minor: number, patch: number}}
         */
        "version": {
            enumerable: true,
            value: _spaces.version
        },

        /**
         * Compatible version spec for the Spaces plugin.
         *
         * @const
         * @type {{major: number=, minor: number=, patch: number=}}
         */
        "compatiblePluginVersion": {
            enumerable: true,
            value: COMPATIBLE_PLUGIN_VERSION
        },

        /**
         * Abort the current application and return control to Classic Photoshop.
         * If a message is supplied, Classic Photoshop may display it to the user,
         * e.g., in a dialog.
         * 
         * @param {{message: string=}}
         * @return {Promise}
         */
        "abort": {
            enumerable: true,
            value: _main.abortAsync
        }
    });

    /**
     * Asynchronously get the value of a Photoshop property.
     *
     * @param {string} name
     * @return {Promise}
     */
    var getPropertyValue = function (name) {
        return _main.getPropertyValueAsync(name, {});
    };

    /**
     * Asynchronously set the value of a Photoshop property.
     *
     * @param {string} name
     * @param {string} value
     * @return {Promise}
     */
    var setPropertyValue = function (name, value) {
        return _main.setPropertyValueAsync(name, value, {});
    };

    /**
     * Opens the given URL in the user's default browser.
     *
     * @param {string} url The URL to open in the user's default browser.
     * @return {Promise}
     */
    var openURLInDefaultBrowser = function (url) {
        return _main.openURLInDefaultBrowserAsync(url);
    };

    // TODO: Currently it is VERY hard to pinpoint the origin of Bluebird
    // warnings. When that improves, we should enable this and then fix the
    // sources of the warnings.
    Promise.config({
        warnings: false,
        cancellation: true
    });

    exports.isPluginCompatible = isPluginCompatible;
    exports.openURLInDefaultBrowser = openURLInDefaultBrowser;
    exports.getPropertyValue = getPropertyValue;
    exports.setPropertyValue = setPropertyValue;
    
    exports.lib = require("./lib/index");
    exports.os = require("./os");
    exports.ps = require("./ps");
    exports.util = require("./util");
    exports.PlayObject = require("./playObject");
});
