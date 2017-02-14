/*
 * Copyright (c) 2015 Adobe Systems Incorporated. All rights reserved.
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

import PlayObject from "../playObject";
import { wrapper } from "./reference";

export const referenceBy = wrapper("application");

/**
 * PlayObject that returns the system font list.
 *
 * @param {boolean} englishOnly Whether to use native or English-only font names.
 * @return {PlayObject}
 */
export function getFontList (englishOnly) {
    var native = !englishOnly;

    return new PlayObject("get", {
        "null": {
            "_ref": [
                {
                    "_ref": "property",
                    "_property": "fontList"
                },
                {
                    "_ref": "application",
                    "_enum": "ordinal",
                    "_value": "targetEnum"
                }
            ]
        },
        "fontNativeFullName": native,
        "fontNativeFamilyName": native,
        "fontNativeStyleName": native
    });
}

/**
 * Possible values for the Photoshop UI color stop.
 *
 * @const
 * @type {Object.<string, string>}
 */
export const colorStops = Object.defineProperties({}, {
    ORIGINAL: {
        writeable: false,
        enumerable: true,
        value: "kPanelBrightnessOriginal"
    },
    LIGHT: {
        writeable: false,
        enumerable: true,
        value: "kPanelBrightnessLightGray"
    },
    MEDIUM: {
        writeable: false,
        enumerable: true,
        value: "kPanelBrightnessMediumGray"
    },
    DARK: {
        writeable: false,
        enumerable: true,
        value: "kPanelBrightnessDarkGray"
    }
});

/**
 * PlayObject to set the Photoshop UI color stop.
 *
 * @param {string} stop Must be one of the values in the colorStops enum above.
 * @return {PlayObject}
 */
export function setColorStop (stop) {
    return new PlayObject("set", {
        "null": {
            _ref: [
                {
                    _ref: null,
                    _property: "kuiBrightnessLevel"
                },
                referenceBy.current
            ]
        },
        "to": {
            "_enum": "uiBrightnessLevelEnumType",
            "_value": stop
        }
    });
}

/**
 * PlayObject to set "add 'copy' to duplicated layer names" preference
 *
 * @param {boolean} add If true, duplicated layers will have "[layer name] copy" as their name
 * @return {PlayObject}
 */
export function setAddCopyToLayerNames (add) {
    return new PlayObject("set", {
        "null": {
            _ref: [
                {
                    _ref: null,
                    _property: "addCopyToLayerNames"
                },
                referenceBy.current
            ]
        },
        "addCopyToLayerNames": add || false
    });
}

/**
 * Sets the global preferences of given objects
 *
 * @param {object} preferences An object containing key/value pairs of preferences to set
 *
 * @return {PlayObject}
 */
export function setGlobalPreferences (preferences) {
    return new PlayObject(
        "set",
        {
            "null": {
                _ref: [
                    {
                        "_property": "generalPreferences",
                        "_ref": "property"
                    },
                    referenceBy.current
                ]
            },
            "to": {
                _obj: "generalPreferences",
                _value: preferences || {}
            }
        }
    );
}

/**
 * Gets document presets in PS
 *
 * @return {PlayObject}
 */
export function getDocumentPresets () {
    var descriptor = {
        "null": {
            _ref: [
                {
                    _ref: null,
                    _property: "newDocPresetJSON"
                },
                {
                    _ref: "application",
                    _enum: "ordinal",
                    _value: "targetEnum"
                }
            ]
        }
    };

    return new PlayObject("get", descriptor);
}

/**
 * Gets menu commands in PS
 *
 * @return {PlayObject}
 */
export function getMenuCommands () {
    var descriptor = {
        "null": {
            _ref: [
                {
                    _ref: null,
                    _property: "menuBarInfo"
                },
                {
                    _ref: "application",
                    _enum: "ordinal",
                    _value: "targetEnum"
                }
            ]
        }
    };

    return new PlayObject("get", descriptor);
}

/**
 * Open Learn Panel with provided tutorial
 *
 * @return {PlayObject}
 */
export function openLearnPanel (tutoral) { 
    return new PlayObject(
        "toggleLearnPanel",
        {
            "null": referenceBy.current,
            "tutorals": tutoral
        }
    );
}
