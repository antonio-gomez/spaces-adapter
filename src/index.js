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

import Promise from "bluebird";
import semver from "semver";

/**
 * A semver-specification for compatible plugin versions.
 *
 * @const
 * @type {string}
 */
const COMPATIBLE_PLUGIN_VERSIONS = "^3.0.0";

/**
 * Promisified version of _spaces.
 */
const _main = Promise.promisifyAll(_spaces);

/**
 * Version of the Spaces adapter plugin API.
 * Follows Semver 2.0.0 conventions: http://semver.org/spec/v2.0.0.html
 *
 * @const
 * @type {{major: number, minor: number, patch: number}}
 */
export const version = _spaces.version;

/**
 * Compatible version spec for the Spaces plugin.
 *
 * @const
 * @type {{major: number=, minor: number=, patch: number=}}
 */
export const compatiblePluginVersion = COMPATIBLE_PLUGIN_VERSIONS;

/**
 * Abort the current application and return control to Classic Photoshop.
 * If a message is supplied, Classic Photoshop may display it to the user,
 * e.g., in a dialog.
 * 
 * @param {{message: string=}}
 * @return {Promise}
 */
export const abort = _main.abortAsync;

/**
 * Check if the current plugin version is compatible with the specified
 * minimum-compatible plugin version.
 * 
 * @return {boolean}
 */
export function isPluginCompatible () {
    const pluginVersion = _spaces.version,
        pluginVersionString = [
            pluginVersion.major,
            pluginVersion.minor,
            pluginVersion.patch
        ].join(".");

    return semver.satisfies(pluginVersionString, COMPATIBLE_PLUGIN_VERSIONS);
}

/**
 * Asynchronously get the value of a Photoshop property.
 *
 * @param {string} name
 * @return {Promise}
 */
export function getPropertyValue (name) {
    return _main.getPropertyValueAsync(name, {});
}

/**
 * Asynchronously set the value of a Photoshop property.
 *
 * @param {string} name
 * @param {string} value
 * @return {Promise}
 */
export function setPropertyValue (name, value) {
    return _main.setPropertyValueAsync(name, value, {});
}

/**
 * Opens the given URL in the user's default browser.
 *
 * @param {string} url The URL to open in the user's default browser.
 * @return {Promise}
 */
export function openURLInDefaultBrowser (url) {
    return _main.openURLInDefaultBrowserAsync(url);
}

// TODO: Currently it is VERY hard to pinpoint the origin of Bluebird
// warnings. When that improves, we should enable this and then fix the
// sources of the warnings.
Promise.config({
    warnings: false,
    cancellation: true
});

import * as ps from "./ps";
import * as util from "./util";
import * as window from "./window";
import os from "./os";
import PlayObject from "./playObject";
import lib from "./lib";

export { os, ps, util, PlayObject, lib, window };
