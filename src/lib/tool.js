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
import { colorObject } from "./color";

/**
 * Sets the current tool to given tool
 *
 * @param {string} tool
 * @return {PlayObject}
 */
export function setTool (tool) {
    return new PlayObject(
        "select",
        {
            "null": {
                "_ref": tool
            }
        }
    );
}

/**
 * Sets the tool options. Preconditions: tool is currently selected.
 * 
 * @param {string} tool
 * @param {Object} options
 *
 * @return {PlayObject}
 */
export function setToolOptions (tool, options) {
    return new PlayObject(
        "set",
        {
            "null": {
                _ref: tool
            },
            "to": {
                _obj: "currentToolOptions",
                _value: options
            }
        }
    );
}

/**
 * Sets the global preference of whether vector tools modify layer selection or not
 * This translates to the Select: [Active Layers vs All Layers] option in the toolbar.
 * 
 * @param {boolean} allLayers If true, will set the Select mode to All Layers, false for Active Layers
 * 
 * @return {PlayObject}
 */
export function setDirectSelectOptionForAllLayers (allLayers) {
    return new PlayObject(
        "set",
        {
            "null": {
                _ref: [
                    {
                        "_property": "generalPreferences",
                        "_ref": "property"
                    },
                    {
                        "_enum": "ordinal",
                        "_ref": "application",
                        "_value": "targetEnum"
                    }
                ]
            },
            "to": {
                _obj: "generalPreferences",
                _value: {
                    "legacyPathDrag": true,
                    "vectorSelectionModifiesLayerSelection": allLayers
                }
            }
        }
    );
}

/**
 * Tool Mode possible values
 *
 * @type {Object.<string, number>}
 */
export const toolModes = {
    SHAPE: 0,
    PATH: 1
};

/**
 * sets the mode of shape tools  0=vtmShapeLayer, 1=vtmPath, 2=vtmFill
 *
 * @param {number} toolMode The type that we are applying to the tool 
 * 
 * @return {PlayObject}
 */
export function setShapeToolMode (toolMode) {
    return new PlayObject(
        "set",
        {
            "null": {
                _ref: [
                    {
                        _ref: "property",
                        _property: "vectorToolMode"
                    },
                    {
                        _ref: "application",
                        _enum: "ordinal",
                        _value: "targetEnum"
                    }
                ]
            },
            "to": toolMode
        }
    );
}

/**
 * Sets the default values of the shape tool
 *      
 * @param {string} toolName the name of the tool we're using "ellipseTool" or "rectangleTool"
 * @param {Color} strokeColor a 3 item array represetning the [r,g,b] value of the stroke
 * @param {number} strokeWidth the width of the stroke
 * @param {number} strokeOpacity the opacity of the stroke
 * @param {Color} fillColor a 3 item array represetning the [r,g,b] value of the fill
 *
 * @return {PlayObject}
 */
export function defaultShapeTool (toolName, strokeColor, strokeWidth, strokeOpacity, fillColor) {
    return new PlayObject(
        "set",
        {
            null: { _ref: toolName },
            "to": {
                _obj: "null",
                _value: {
                    "geometryToolMode": {
                        _enum: "geometryToolMode",
                        _value: "shape" },
                    "makeShapeLayers": true,
                    "shapeStyle": {
                        _obj: "shapeStyle",
                        _value: {
                            "strokeStyle": {
                                _obj: "strokeStyle",
                                _value: {
                                    "strokeStyleLineDashSet": [],
                                    "strokeStyleContent": {
                                        _obj: "solidColorLayer",
                                        _value: {
                                            "color": colorObject(strokeColor)
                                        }
                                    },
                                    "strokeStyleLineWidth": {
                                        _unit: "pixelsUnit",
                                        _value: strokeWidth
                                    },
                                    "strokeStyleLineAlignment": {
                                        _enum: "strokeStyleLineAlignment",
                                        _value: "strokeStyleAlignInside"
                                    },
                                    "strokeStyleVersion": 2,
                                    "strokeEnabled": true,
                                    "strokeStyleOpacity": strokeOpacity,
                                    "strokeStyleResolution": 72
                                }
                            },
                            "fillContents": {
                                _obj: "solidColorLayer",
                                _value: {
                                    "color": colorObject(fillColor)
                                }
                            }
                        }
                    }
                }
            }
        }
    );
}

/**
 * Resets the mode of type tools back to a default font
 * 
 * @param {string} alignment  alignment of the style ("left") 
 * @param {string} fontName the font name ("Myriad Pro")
 * @param {number} pointSize the pointSize of the font
 * @param {Color} textColor a 3 item array represetning the [r,g,b] value of the text
 *
 * @return {PlayObject}
 */
export function resetTypeTool (alignment, fontName, pointSize, textColor) {
    return new PlayObject(
        "set",
        {
            "null": {
                "_ref": "typeCreateOrEditTool"
            },
            "to": {
                _obj: "null",
                _value: {
                    "textToolParagraphOptions": {
                        _obj: "textToolParagraphOptions",
                        _value: {
                            "paragraphStyle": {
                                _obj: "paragraphStyle",
                                _value: {
                                    "algin": alignment
                                }
                            }
                        }
                    },
                    "textToolCharacterOptions": {
                        _obj: "textToolCharacterOptions",
                        _value: {
                            "textStyle": {
                                _obj: "textStyle",
                                _value: {
                                    "fontName": fontName,
                                    "size": {
                                        _unit: "pointsUnit",
                                        _value: pointSize
                                    },
                                    "color": colorObject(textColor)
                                }
                            }
                        }
                    }
                }
            }
        },
        {
            canExecuteWhileModal: true
        }
    );
}
