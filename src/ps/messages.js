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

import NotifierProxy from "../util/notifierproxy";

/**
 * The Messages object provides helper methods for sending and receiving direct
 * messages from the native plugin.
 */
export class Messages extends NotifierProxy {
    /**
     * @param {object=} options
     * @param {Array.<string|{event: string, universal: boolean}>=} options.events
     */
    constructor (options) {
        super(_spaces.notifierGroup.DIRECT, options);

        /**
         * Promisified version of sendDirectMessage
         *
         * @private
         * @type {function():Promise}
         */
        this._sendDirectMessageAsync = Promise.promisify(_spaces.ps.descriptor.sendDirectMessage, {
            context: _spaces.ps.descriptor
        });
    }

    /**
     * Send a direct message to Photoshop.
     *
     * @param {string} name
     * @param {object} payload
     * @param {object=} options
     * @return {Promise}
     */
    sendDirectMessage (name, payload, options = {}) {
        return this._sendDirectMessageAsync(name, payload, options);
    }
}

/**
 * Construct a Descriptor object with the given options.
 *
 * @param {object=} options
 * @param {?Array.<string|{event: string, universal: boolean}>=} options.events Null to allow all events.
 * @return {Descriptor}
 */
export function makeMessages (options = {}) {
    let messages = new Messages(options);

    messages.unpause();

    return messages;
}
