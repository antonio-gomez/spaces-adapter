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
 
/** 
 * Private function to create the Action Descriptor for the given unit
 *
 * @private
 * @param {string} kind
 * @param {number} val
 */
function _unit (kind, val) {
    return {
        _unit: kind + "Unit",
        _value: val
    };
}

export const density = _unit.bind(null, "density");
export const pixels = _unit.bind(null, "pixels");
export const px = pixels;
export const percent = _unit.bind(null, "percent");
export const angle = _unit.bind(null, "angle");

export const inches = _unit.bind(null, "inches");
// export const in = inches;
export const centimeters = _unit.bind(null, "centimeters");
export const cm = centimeters;
export const picas = _unit.bind(null, "picas");
export const degrees = _unit.bind(null, "degrees");

export const number = _unit.bind(null, "number");
export const seconds = _unit.bind(null, "seconds");

// Type uses these
export const points = _unit.bind(null, "points");
export const pt = points;
export const millimeters = _unit.bind(null, "millimeters");
export const mm = millimeters;

// Guides use this
export const distance = _unit.bind(null, "distance");
