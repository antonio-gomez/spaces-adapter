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

/**
 * Promisified version of _spaces.ps functions.
 * @private
 */
const _ps = Promise.promisifyAll(_spaces.ps);

/**
 * Commit or cancel the current modal tool edit state.
 *
 * @param {boolean=} commit Commits if true; cancels otherwise
 * @param {options=} options
 * @return {Promise} Resolves once the modal state has ended
 */
export function endModalToolState (commit, options) {
    commit = commit || false;
    options = options || {
        invalidateMenus: true
    };
    
    return _ps.endModalToolStateAsync(commit)
        .then(function () {
            return _ps.processQueuedCommandsAsync(options);
        });
}

/**
 * Execute a Photoshop menu command.
 * Should only be used for items that are not yet implemented via ActionDescriptors
 *
 * @param {number} commandID Photoshop menu command ID
 * @return {Promise.<*>} Promise representing execution state of the menu command
 */
export function performMenuCommand (commandID) {
    return _ps.performMenuCommandAsync(commandID);
}

/**
 * Log an analytics event using the Adobe Headlights API.
 * 
 * NOTE: This is an Adobe-private API that must not be used by third-party
 * developers!
 *
 * @private
 * @param {string} category
 * @param {string} subcategory
 * @param {string} event
 * @return {Promise}
 */
export function logHeadlightsEvent (category, subcategory, event) {
    const options = {
        category: category,
        subcategory: subcategory,
        event: event
    };

    return _ps.logHeadlightsEventAsync(options);
}

/**
 * Log an analytics datagroup using Adobe Headlights API
 * Category will be "Scripting"
 * Subcategory will be user's locale
 * Event name will be defined in info with the "eventRecord" key
 * If "eventRecord" is not available, this is a no-op
 *
 * NOTE: This is an Adobe-private API that must not be used by third-party
 * developers!
 *
 * @private
 * @param {object} info Contains the flat group of key value pairs to be logged
 * @param {string} info.eventRecord Name of the data group, is required
 * @param {object=} options
 * @return {Promise}
 */
export function logHeadlightsDataGroup (info, options = {}) {
    return _ps.logHeadlightsDataGroupAsync(info, options);
}

import ui from "./ps/ui";
import descriptor from "./ps/descriptor";

export { ui, descriptor };
