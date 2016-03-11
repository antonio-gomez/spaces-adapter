/*
 * Copyright (c) 2016 Adobe Systems Incorporated. All rights reserved.
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

/**
 * Promisified version of _spaces.ps functions.
 * @private
 */
const _window = Promise.promisifyAll(_spaces.window);

/**
 * Returns the visibility of the current running contextual UI
 *
 * @return {Promise.<boolean>} True if surface is visible to the user
 */
export function getVisibility () {
    return _window.getVisibilityAsync({});
}

/**
 * Sets the latent visibility of the contextual UI
 *
 * @param {boolean} visibility True if the UI will be visible to the user
 * @return {Promise} Resolves when visibility is set by Photoshop
 */
export function setVisibility (visibility) {
    return _window.setVisibilityAsync(visibility, {});
}

/**
 * @typedef {{left: number, right: number, top: number, bottom: number}} Bounds
 */
 
/**
 * Gets the current bounds of the contextual UI, both w.r.t monitor and Photoshop
 * @return {Promise.<{globalBounds: Bounds, bounds: Bounds}>} 
 *       Resolves to bounds of contextual UI w.r.t monitor and Photoshop 
 */
export function getBounds () {
    return _window.getBoundsAsync({});
}

/**
 * Sets the bounds of the contextual UI, either locally or globally based on object passed
 *
 * @param {{bounds: Bounds?, globalBounds: Bounds?}} bounds Either local or global bounds to set
 * @return {Promise} Resolves when bounds are set
 */
export function setBounds (bounds) {
    if (!bounds.bounds && !bounds.globalBounds) {
        throw new Error("window.setBounds requires either bounds or globalBounds objects");
    }

    return _window.setBoundsAsync(bounds, {});
}
