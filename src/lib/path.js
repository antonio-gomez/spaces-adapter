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

/**
 * Combines the paths in the current layer using ADD/UNION
 *
 * @return {PlayObject}
 */
export function combinePathsUnion () {
    return new PlayObject(
        "changePathDetails",
        {
            "keyActionMode": 0,
            "keyOriginType": 3
        }
    );
}

/**
 * Combines the paths in the current layer using SUBTRACT
 *
 * @return {PlayObject}
 */
export function combinePathsSubtract () {
    return new PlayObject(
        "changePathDetails",
        {
            "keyActionMode": 1,
            "keyOriginType": 3
        }
    );
}

/**
 * Combines the paths in the current layer using INTERSECT
 *
 * @return {PlayObject}
 */
export function combinePathsIntersect () {
    return new PlayObject(
        "changePathDetails",
        {
            "keyActionMode": 2,
            "keyOriginType": 3
        }
    );
}

/**
 * Combines the paths in the current layer using DIFFERENCE/EXCLUDE
 *
 * @return {PlayObject}
 */
export function combinePathsDifference () {
    return new PlayObject(
        "changePathDetails",
        {
            "keyActionMode": 3,
            "keyOriginType": 3
        }
    );
}

/**
 * Combines the layers using ADD/UNION
 *
 * @return {PlayObject}
 */
export function combineLayersUnion () {
    return new PlayObject(
        "mergeLayersNew",
        {
            "shapeOperation": {
                "_enum": "shapeOperation",
                "_value": "add"
            }
        }
    );
}

/**
 * Combines the layers using SUBTRACT
 *
 * @return {PlayObject}
 */
export function combineLayersSubtract () {
    return new PlayObject(
        "mergeLayersNew",
        {
            "shapeOperation": {
                "_enum": "shapeOperation",
                "_value": "subtract"
            }
        }
    );
}

/**
 * Combines the layers using INTERSECT
 *
 * @return {PlayObject}
 */
export function combineLayersIntersect () {
    return new PlayObject(
        "mergeLayersNew",
        {
            "shapeOperation": {
                "_enum": "shapeOperation",
                "_value": "interfaceIconFrameDimmed"
            }
        }
    );
}

/**
 * Combines the layers using DIFFERENCE/EXCLUDE
 *
 * @return {PlayObject}
 */
export function combineLayersDifference () {
    return new PlayObject(
        "mergeLayersNew",
        {
            "shapeOperation": {
                "_enum": "shapeOperation",
                "_value": "xor"
            }
        }
    );
}
