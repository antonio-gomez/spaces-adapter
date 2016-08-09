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

/* global _spaces, console */
import EventEmitter from "events";
import Promise from "bluebird";

/**
 * Promisified version of low-level os functions
 */
var _os = Promise.promisifyAll(_spaces.os);

/**
 * Promisified version of low-level keyboard focus functions
 */
var _keyboardFocus = Promise.promisifyAll(_spaces.os.keyboardFocus);

/**
 * Promisified version of low-level keyboard focus functions
 */
var _clipboard = Promise.promisifyAll(_spaces.os.clipboard);

/**
 * The OS object provides helper methods for dealing with operating
 * system by way of Photoshop.
 *
 * @extends EventEmitter
 * @constructor
 * @private
 */
class OS extends EventEmitter {
    constructor () {
        super();

        /**
         * OS notifier kinds
         *
         * @const
         * @type {Object.<string, number>}
         */
        this.notifierKind = _os.notifierKind;

        /**
         * OS event kinds
         *
         * @const
         * @type {Object.<string, number>}
         */
        this.eventKind = _os.eventKind;

        /**
         * OS event modifiers
         *
         * @const
         * @type {Object.<string, number>}
         */
        this.eventModifiers = _os.eventModifiers;

        /**
         * OS event keyCodes
         *
         * @const
         * @type {Object.<string, number>}
         */
        this.eventKeyCode = _os.eventKeyCode;
    }

    /**
     * Event handler for events from the native bridge.
     *
     * @private
     * @param {*=} err Error information
     * @param {String} event Name of the event
     * @param {*} payload
     */
    _eventHandler (err, event, payload) {
        if (err) {
            this.emit("error", "Failed to handle OS event: " + err);
            return;
        }

        this.emit("all", event, payload);
        this.emit(event, payload);
    }

    /**
     * Determine whether or not CEF currently has keyboard focus.
     *
     * @param {object=} options Options passed directly to the low-level call
     * @return {Promise} Resolves once the status of focus has been determined.
     */
    hasKeyboardFocus (options) {
        options = options || {};

        return _keyboardFocus.isActiveAsync(options);
    }

    /**
     * Request that keyboard focus be transferred from Photoshop to CEF.
     *
     * @param {object=} options Options passed directly to the low-level aquire call
     * @return {Promise} Resolves once focus has been transferred.
     */
    acquireKeyboardFocus (options) {
        options = options || {};

        return _keyboardFocus.acquireAsync(options);
    }

    /**
     * Request that keyboard focus be transferred from CEF to Photoshop.
     *
     * @param {object=} options Options passed directly to the low-level release call
     * @return {Promise} Resolves once focus has been transferred.
     */
    releaseKeyboardFocus (options) {
        options = options || {};

        return _keyboardFocus.releaseAsync(options);
    }

    /**
     * @return {Promise}
     */
    postEvent (eventInfo, options) {
        options = options || {};

        return _os.postEventAsync(eventInfo, options);
    }

    /**
     * @param {Array.<string>=} formats
     * @return {Promise.<{data: *, format: string}>}
     */
    clipboardRead (formats) {
        const options = {
            formats: formats || ["string"]
        };

        return _clipboard.readAsync(options);
    }

    /**
     * @param {*} data
     * @param {string=} format
     * @return {Promise}
     */
    clipboardWrite (data, format) {
        const options = {
            data: data,
            format: format || "string"
        };

        return _clipboard.writeAsync(options);
    }

    /**
     * Set the tooltip label, or invalidate the tooltip if the label is empty.
     *
     * @param {string} label
     * @return {Promise}
     */
    setTooltip (label) {
        return _os.setTooltipAsync({
            label: label
        });
    }

    /**
     * Resets the mouse cursor, letting it catch up without a mouse move event
     *
     * @param {object} options Currently unused
     * @return {Promise}
     */
    resetCursor (options) {
        options = options || {};
        return _os.resetCursorAsync(options);
    }

    /**
     * Gets a temporary file location, with a given name if provided
     *
     * @param {string=} name File name for the temporary file
     *
     * @return {Promise.<string>} Resolves to the temporary path
     */
    getTempFilename (name) {
        const options = {
            name: name || ""
        };

        return _os.getTempFilenameAsync(options);
    }

    /**
     * Returns the current mouse location synchronously
     * Synchronous as it is ran in V8 and does not communicate with Photoshop
     *
     * @return {Array.<number>} X and Y locations of the mouse
     */
    getMouseLocation () {
        return _spaces.os.getMouseLocation();
    }

    /**
     * Return information about attached displays
     *
     * @param {object} options
     * @param {boolean=} options.physicalResolution gets physical resolution data
     *
     * @return {Array.<Object>} List of attached displays
     */
    getDisplayConfiguration (options) {
        options = options || { physicalResolution: true };

        return _spaces.os.getDisplayConfigurationAsync(options);
    }

    /**
     * Write contents to a file.
     *
     * @param {object} options
     * @param {string} options.filePath
     * @param {string} options.contents
     * @param {string=} options.format Describes the data type of the contents. Default is "utf8".
     *                                 Use "binary" for base64 encoded contents.
     *
     * @return {Promise}
     */
    writeFile (options) {
        return _os.writeFileAsync(options);
    }

    /**
     * Read contents from a file.
     *
     * @param {object} options
     * @param {string} options.filePath
     * @param {string=} options.format Describes the expected format of the returned contents. By default it returns
     *                                 a "utf8" string. Use "binary" to return a base64 encoded string.
     *
     * @return {Promise.<string>} Contents of the file
     */
    readFile (options) {
        return _os.readFileAsync(options);
    }

    /**
     * Get standard folder path. For example, the path of the Application Support folder.
     *
     * @param {object} options
     * @param {string} options.kind "UserApplicationSupport" is the only supported kind currently.
     * @return {Promise.<string>}
     */
    getStandardFolderPath (options) {
        return _os.getStandardFolderPathAsync(options);
    }
}

/**
 * The OS singleton
 * @type {OS}
 */
const theOS = new OS();

// bind native Photoshop event handler to our handler function
_spaces.setNotifier(_spaces.notifierGroup.OS, {}, theOS._eventHandler.bind(theOS));

export default theOS;
