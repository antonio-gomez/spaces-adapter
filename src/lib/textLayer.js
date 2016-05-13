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

import PlayObject from "../playObject";
import * as unitsIn from "./unit";
import { colorObject } from "./color";
import { assert } from "../util";
import { wrapper, refersTo as referenceOf } from "./reference";

export const referenceBy = wrapper("textLayer");

/**
 * Create a text layer
 *
 * @param {ActionDescriptor} sourceRef Layer reference
 * @param {string} strTextKey The text string. 
 * @param {array} numClickPointH The horizontal text click point.
 * @param {array} numClickPointV The vertical text click point.
 *
 * @return {PlayObject} The action descriptor of the text style.
 *
 * Preconditions:
 * Open or create a document
 *
 * Examples:
 * createText("Photoshop Spaces",20,20);
 */
export function createText (sourceRef, strTextKey, numClickPointH, numClickPointV) {
    assert(referenceOf(sourceRef) === "textLayer", "createText expects a textLayer reference");
    return new PlayObject(
        "make",
        {
            "null": sourceRef,
            "using": {
                "_obj": "textLayer",
                "_value": {
                    "textKey": strTextKey,
                    "textClickPoint": {
                        "_obj": "paint",
                        "_value": {
                            "horizontal": unitsIn.percent(numClickPointH),
                            "vertical": unitsIn.percent(numClickPointV)
                        }
                    },
                    "textStyleRange": [
                    ]
                }
            }
        }
    );
}

/**
 * Set the font face
 *
 * @param {ActionDescriptor} sourceRef Layer reference
 * @param {string} family The family name of the font
 * @param {string} style The style of the font     
 *
 * @returns {PlayObject} The action descriptor of the text style.
 *
 * Preconditions:
 * Select a text layer
 *
 * Examples:
 * setFace("Helvetica", "Light");
 */
export function setFace (sourceRef, family, style) {
    // NOTE: Using a source ref with layer IDs crashes Photoshop. This also
    // doesn't seem to work with postScriptName

    assert(referenceOf(sourceRef) === "textLayer", "setFace expects a textLayer reference");
    sourceRef = {
        "_ref": "textLayer",
        "_value": "$Trgt",
        "_enum": "$Ordn"
    };

    return new PlayObject(
        "set",
        {
            null: {
                _ref: [
                    {
                        _ref: "property",
                        _property: "textStyle"
                    },
                    sourceRef
                ]
            },
            to: {
                _obj: "textStyle",
                _value: {
                    fontName: family,
                    fontStyleName: style
                }
            }
        }
    );
}

/**
 * Sets the typeface by postscript name
 *
 * @param {ActionDescriptor} sourceRef Layer reference
 * @param {string} postScriptName Postscript name of the typeface
 *
 * @returns {PlayObject} The action descriptor of the text style.
 *
 * Preconditions:
 * Select a text layer
 *
 * Examples:
 * setPostScript("Kozuka Gothic Pr6N L");
 */
export function setPostScript (sourceRef, postScriptName) {
    // NOTE: Using a source ref with layer IDs crashes Photoshop.

    assert(referenceOf(sourceRef) === "textLayer", "setPostScript expects a textLayer reference");
    sourceRef = {
        "_ref": "textLayer",
        "_value": "$Trgt",
        "_enum": "$Ordn"
    };

    return new PlayObject(
        "set",
        {
            null: {
                _ref: [
                    {
                        _ref: "property",
                        _property: "textStyle"
                    },
                    sourceRef
                ]
            },
            to: {
                _obj: "textStyle",
                _value: {
                    fontPostScriptName: postScriptName
                }
            }
        }
    );
}

/**
 * Set the font size
 *
 * @param {ActionDescriptor} sourceRef Layer reference
 * @param {number} val The size of the font.
 *      Points: 0.01pt to 1296.00pt
 *      Pixels: 0.01px to 1296.00px
 *      Millimeters: 0.00mm to 457.19mm
 * @param {string} unit The unit of the type.  "pt","px", or "mm"
 *
 * @return {PlayObject} The action descriptor of the text style.
 *
 * Preconditions:
 * Select a text layer
 *
 * Examples:
 * setSize(14, "pt");
 */
export function setSize (sourceRef, val, unit) {
    // NOTE: See warning in setFace
    assert(referenceOf(sourceRef) === "textLayer", "setSize expects a textLayer reference");
    sourceRef = {
        "_ref": "textLayer",
        "_value": "$Trgt",
        "_enum": "$Ordn"
    };

    return new PlayObject(
        "set",
        {
            null: {
                _ref: [
                    {
                        _ref: "property",
                        _property: "textStyle"
                    },
                    sourceRef
                ]
            },
            to: {
                _obj: "textStyle",
                _value: {
                    size: unitsIn[unit](val)
                }
            }
        }
    );
}

/**
 * Constant values for types of alignment
 * @type {Object.<string, string>}
 */
export const alignmentTypes = Object.defineProperties({}, {
    LEFT: {
        value: "left",
        enumerable: true
    },
    CENTER: {
        value: "center",
        enumerable: true
    },
    RIGHT: {
        value: "right",
        enumerable: true
    },
    JUSTIFY: {
        value: "justifyAll",
        enumerable: true
    }
});

/**
 * Set the font alignment
 *
 * @param {ActionDescriptor} sourceRef Layer reference
 * @param {string} alignment The alignment of the type, as described by the alignmentTypes enum.
 * @return {PlayObject} The action descriptor of the paragraph style.
 *
 * Preconditions:
 * Select a text layer
 *
 * Examples:
 * setAlignment("center");
 */
export function setAlignment (sourceRef, alignment) {
    // NOTE: See warning in setFace
    assert(referenceOf(sourceRef) === "textLayer", "setAlignment expects a textLayer reference");
    sourceRef = {
        "_ref": "textLayer",
        "_value": "$Trgt",
        "_enum": "$Ordn"
    };
    return new PlayObject(
        "set",
        {
            null: {
                _ref: [
                    {
                        _ref: "property",
                        _property: "paragraphStyle"
                    },
                    sourceRef
                ]
            },
            "to": {
                "_obj": "paragraphStyle",
                "_value": {
                    "align": {
                        "_enum": "alignmentType",
                        "_value": alignment
                    }
                }
            }
        }
    );
}

/**
 * Set the text leading
 *
 * @param {ActionDescriptor} sourceRef Layer reference
 * @param {boolean} auto Whether the auto leading is enabled.
 * @param {number} val The leading of the text.
 *      Points: 0.01pt to 5000.00pt
 *      Pixels: 0.01px to 5000.00px
 *      Millimeters: 0.00mm to 1763.88mm
 * @param {string} unit The unit of the type.  "pointsUnit","pixelsUnit", or "millimetersUnit"
 *
 * @return {PlayObject} The action descriptor of the text style.
 *
 * Preconditions:
 * Select a text layer
 *
 * Examples:
 * setLeading(true);
 * setLeading(false,14,"pt");
 * setLeading(false,14);
 */
export function setLeading (sourceRef, auto, val, unit) {
    // NOTE: See warning in setFace
    assert(referenceOf(sourceRef) === "textLayer", "setLeading expects a textLayer reference");
    sourceRef = {
        "_ref": "textLayer",
        "_value": "$Trgt",
        "_enum": "$Ordn"
    };
    if (auto === false) {
        return new PlayObject(
            "set",
            {
                null: {
                    _ref: [
                        {
                            _ref: "property",
                            _property: "textStyle"
                        },
                        sourceRef
                    ]
                },
                "to": {
                    "_obj": "textStyle",
                    "_value": {
                        "autoLeading": auto,
                        "leading": unitsIn[unit](val)
                    }
                }
            }
        );
    } else {
        return new PlayObject(
            "set",
            {
                null: {
                    _ref: [
                        {
                            _ref: "property",
                            _property: "textStyle"
                        },
                        sourceRef
                    ]
                },
                "to": {
                    "_obj": "textStyle",
                    "_value": {
                        "autoLeading": auto
                    }
                }
            }
        );
    }
}

/**
 * Set the text tracking
 *
 * @param {ActionDescriptor} sourceRef Layer reference
 * @param {number} val The amount of space between a range of letters or characters. -1000 to 10000
 *
 * @return {PlayObject} The action descriptor of the text style.
 *
 * Preconditions:
 * Select a text layer
 *
 * Examples:
 * setLeading(10);
 */
export function setTracking (sourceRef, val) {
    // NOTE: See warning in setFace        
    assert(referenceOf(sourceRef) === "textLayer", "setTracking expects a textLayer reference");
    sourceRef = {
        "_ref": "textLayer",
        "_value": "$Trgt",
        "_enum": "$Ordn"
    };
    return new PlayObject(
        "set",
        {
            null: {
                _ref: [
                    {
                        _ref: "property",
                        _property: "textStyle"
                    },
                    sourceRef
                ]
            },
            "to": {
                "_obj": "textStyle",
                "_value": {
                    "tracking": val
                }
            }
        }
    );
}

/**
 * Set the text color
 *
 * @param {ActionDescriptor} sourceRef Layer reference
 * @param {Color} color The color of the layer. Opacity is ignored.
 *
 * @return {PlayObject} The action descriptor of the text style.
 */
export function setColor (sourceRef, color) {
    // NOTE: See warning in setFace
    assert(referenceOf(sourceRef) === "textLayer", "setColor expects a textLayer reference");
    sourceRef = {
        "_ref": "textLayer",
        "_value": "$Trgt",
        "_enum": "$Ordn"
    };

    return new PlayObject(
        "set",
        {
            null: {
                _ref: [
                    {
                        _ref: "property",
                        _property: "textStyle"
                    },
                    sourceRef
                ]
            },
            to: {
                _obj: "textStyle",
                _value: {
                    color: colorObject(color)
                }
            }
        }
    );
}

/**
 * Set the text orientation
 *
 * @param {ActionDescriptor} sourceRef Layer reference
 * @param {string} strTextOrientation The text orientation. "horizontal" or "vertical"
 *
 * @return {PlayObject} The action descriptor of the text style.
 *
 * Preconditions:
 * Select a text layer
 *
 * Examples:
 * setOrientation("vertical");
 */
export function setOrientation (sourceRef, strTextOrientation) {
    assert(referenceOf(sourceRef) === "textLayer", "setOrientation expects a textLayer reference");
    return new PlayObject(
        "set",
        {
            "null": sourceRef,
            "to": {
                "_enum": "orientation",
                "_value": strTextOrientation
            }
        }
    );
}

/**
 * Set the text anti alias
 *
 * @param {ActionDescriptor} sourceRef Layer reference
 * @param {string} strAntiAliasType The anti alias type. "none","sharp","crisp","strong","smooth","macLcd", or "mac"
 *
 * @return {PlayObject} The action descriptor of the text style.
 *
 * Preconditions:
 * Select a text layer
 *
 * Examples:
 * setAntiAlias("smooth");
 */
export function setAntiAlias (sourceRef, strAntiAliasType) {
    assert(referenceOf(sourceRef) === "textLayer", "setAntiAlias expects a textLayer reference");
    return new PlayObject(
        "set",
        {
            "null": sourceRef,
            "to": {
                "_enum": "antiAliasType",
                "_value": _antiAlias[strAntiAliasType]
            }
        }
    );
}

const _antiAlias = {
    none: "antiAliasNone",
    sharp: "antiAliasSharp",
    crisp: "antiAliasCrisp",
    strong: "antiAliasStrong",
    smooth: "antiAliasSmooth",
    macLcd: "antiAliasPlatformLCD",
    mac: "antiAliasPlatformGray"
};

/**
 * Set range and change text style
 *
 * @param {ActionDescriptor} sourceRef Layer reference
 * @param {number} from The index of string to set the range from
 * @param {number} to The index of string to set the range to
 * @param {string} face The string of font family name
 * @param {string} weight The string of font style name
 * @param {string} unit The unit of the type.  "pt","px", or "mm"
 * @param {number} size The size of the font.
 *      Points: 0.01pt to 1296.00pt
 *      Pixels: 0.01px to 1296.00px
 *      Millimeters: 0.00mm to 457.19mm
 * @param {array} arrayTextColor The array of RGB color [red,green,blue]. 0 to 255
 *
 * @return {PlayObject} The action descriptor of the text style.
 *
 * Preconditions:
 * Select a text layer
 *
 * Examples:
 * setRangeAndChangeTextStyle(0,1,"Helvetica","Bold","pt",60,[200,100,150]);
 * setRangeAndChangeTextStyle(0,3,"","","pt",20,[200,100,150]);
 */
export function setRangeAndChangeTextStyle (sourceRef, from, to, face, weight, unit, size, arrayTextColor) {
    assert(referenceOf(sourceRef) === "textLayer", "setRangeAndChangeTextStyle expects a textLayer reference");
    return new PlayObject(
        "set",
        {
            "null": sourceRef,
            "to": {
                "_obj": "textLayer",
                "_value": {
                    "textStyleRange": [
                        {
                            "_obj": "textStyleRange",
                            "_value": {
                                "from": from,
                                "to": to,
                                "textStyle": {
                                    "_obj": "textStyle",
                                    "_value": {
                                        "fontName": face,
                                        "fontStyleName": weight,
                                        "size": unitsIn[unit](size),
                                        "color": colorObject(arrayTextColor)
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        }
    );
}

/**
 * Applies the given CC Library text style to the selected layers
 *
 * @param {ActionDescriptor} sourceRef
 * @param {object} style Primary representation of the type style
 *
 * @return {PlayObject}
 */
export function applyTextStyle (sourceRef, style) {
    // NOTE: See warning in setFace
    assert(referenceOf(sourceRef) === "textLayer", "applyTextStyle expects a textLayer reference");
    
    sourceRef = {
        "_ref": "textLayer",
        "_value": "$Trgt",
        "_enum": "$Ordn"
    };

    var styleDescriptor = {};

    if (style.adbeFont && style.adbeFont.postScriptName) {
        styleDescriptor.fontPostScriptName = style.adbeFont.postScriptName;
    }

    if (style.fontSize) {
        styleDescriptor.size = unitsIn[style.fontSize.type](style.fontSize.value);
    }

    if (style.color && style.color.value) {
        assert(style.color.mode === "RGB", "text style being applied is not in RGB colorspace");
        styleDescriptor.color = colorObject(style.color.value);
    }

    // This can be zero!
    if (style.adbeTracking !== undefined) {
        styleDescriptor.tracking = style.adbeTracking / 1000;
    } else if (style.letterSpacing) {
        styleDescriptor.tracking = style.letterSpacing.value;
    }

    if (style.adbeAutoLeading) {
        styleDescriptor.autoLeading = style.adbeAutoLeading;
    }

    if (style.lineHeight) {
        styleDescriptor.leading = unitsIn[style.lineHeight.type](style.lineHeight.value);
        styleDescriptor.autoLeading = false;
    }

    return new PlayObject(
        "set",
        {
            null: {
                _ref: [
                    {
                        _ref: "property",
                        _property: "textStyle"
                    },
                    sourceRef
                ]
            },
            "merge": true,
            "to": {
                "_obj": "textStyle",
                "_value": styleDescriptor
            }
        }
    );
}
