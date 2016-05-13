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
import { pixels } from "./unit";

/**
 * common objects used in PS references
 *
 * @private
 * @const
 * @type {Object.<string, string>} 
 */
const _layerRef = {
        "_ref": "layer",
        "_enum": "ordinal",
        "_value": "targetEnum" },
    _vectorMaskRef = {
        "_ref": "path",
        "_enum": "path",
        "_value": "vectorMask" },
    _pathRef = {
        "_ref": "path",
        "_enum": "ordinal",
        "_value": "targetEnum" };

/**
 * creates a rectangular work path with the given bounds descriptor 
 *
 * below each unit is a object of type {_value: number, _unit: type}
 * @param {{top: unit, bottom: unit, left: unit, right: unit}} bounds the bounds object 
 * @return {PlayObject}
 */
export function makeBoundsWorkPath (bounds) {
    return new PlayObject("set", {
        "null": {
            "_ref": [{
                "_ref": "path",
                "_property": "workPath"
            }]
        },
        "to": {
            "_obj": "rectangle",
            "_value": bounds
        }
    });
}

/**
 * creates a circular work path with the given bounds descriptor 
 *
 * below each unit is a object of type {_value: number, _unit: type}
 * @param {{top: unit, bottom: unit, left: unit, right: unit}} bounds the bounds object 
 * @return {PlayObject}
 */
export function makeCircularBoundsWorkPath (bounds) {
    var left = bounds.left._value,
        right = bounds.right._value,
        top = bounds.top._value,
        bottom = bounds.bottom._value;

    var cenX = (left + right) / 2,
        cenY = (top + bottom) / 2,
        radius = Math.min(bottom - cenY, right - cenX),
        circleTop = pixels(cenY - radius),
        circleLeft = pixels(cenX - radius),
        circleRight = pixels(cenX + radius),
        circleBottom = pixels(cenY + radius),
        circleBounds = {
            "unitValueQuadVersion": 1,
            "top": circleTop,
            "left": circleLeft,
            "bottom": circleBottom,
            "right": circleRight
        };

    return new PlayObject("set", {
        "null": {
            "_ref": [{
                "_ref": "path",
                "_property": "workPath"
            }]
        },
        "to": {
            "_obj": "ellipse",
            "_value": circleBounds
        }
    });
}

/**
 * Turn the workpath into a vector mask for the current layer
 * 
 * @return {PlayObject}
 */
export function makeVectorMaskFromWorkPath () {
    var maskRef = {
            "_ref": [_vectorMaskRef]
        },
        pathRef = {
            "_ref": [_pathRef]
        };

    return new PlayObject("make", {
        "null": {
            "_ref": [{
                "_ref": "path"
            }
        ] },
        "at": maskRef,
        "using": pathRef
    });
}

/**
 * Delete the current work path
 * 
 * @return {PlayObject}
 */
export function deleteWorkPath () {
    return new PlayObject("delete", {
        "null": {
            "_ref": [{
                "_ref": "path",
                "_property": "workPath"
            }]
        }
    });
}

/**
 * Delete the current vector mask on the current layer
 * 
 * @return {PlayObject}
 */
export function deleteVectorMask () {
    return new PlayObject("delete", {
        "null": {
            "_ref": [_vectorMaskRef, _layerRef]
        }
    });
}

/**
 * Target the vector mask of the current layer
 * 
 * @return {PlayObject}
 */
export function selectVectorMask () {
    return new PlayObject("select", {
        "null": {
            "_ref": [_vectorMaskRef, _layerRef]
        }
    });
}

/**
 * activate the knots of the targeted vector mask
 * 
 * @return {PlayObject}
 */
export function activateVectorMaskEditing () {
    return new PlayObject("activateVectorMaskEditing", {
        "null": {
            "_ref": [_layerRef]
        }
    });
}

/**
 * drops the selection on the current path
 * 
 * @return {PlayObject}
 */
export function dropPathSelection () {
    return new PlayObject("deselect", {
        "null": {
            "_ref": [_pathRef]
        }
    });
}

/**
 * free transform the whole path of the targeted vector mask
 * 
 * @return {PlayObject}
 */
export function enterFreeTransformPathMode () {
    var propertyRef = {
        _ref: "property",
        _property: "freeTransformWholePath"
    };
    
    return new PlayObject("set", {
        "null": {
            "_ref": [propertyRef, _layerRef]
        },
        "_property": "freeTransformWholePath",
        "suppressPlayLevelIncrease": true
    });
}

/**
 * create a reveal all vector mask on current layer
 * 
 * @return {PlayObject}
 */
export function createRevealAllMask () {
    var desc = {
        "null": {
            "_ref": [{
                "_ref": "path"
            }]
        },
        "at": {
            "_ref": [_vectorMaskRef]
        },
        "using": {
            "_enum": "vectorMaskEnabled",
            "_value": "revealAll"
        }
    };
    return new PlayObject("make", desc);
}

/**
 * Copy the Vector Mask from the selected shape layer to a target layer
 *
 * @param {number} layerToClipID Layer id of the target layer.
 *
 * @return {PlayObject}
 */
export function createMaskFromShape (layerToClipID) {
    var dstLayerRef = { "_ref": "layer", "_id": layerToClipID },
        vecLayerMaskref = { "_ref": [_vectorMaskRef, _layerRef] },
        makeMaskDesc = {
            "null": {
                "_ref": [{
                    "_ref": "path"
                }]
            },
            "at": {
                "_ref": [_vectorMaskRef, dstLayerRef]
            },
            "using": vecLayerMaskref
        };

    return new PlayObject("make", makeMaskDesc);
}
