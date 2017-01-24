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
 * External events map to their event notification mode.
 * @type {Object}
 */
var _EXTERNAL_EVENT_MODE = {
    "externalMouseDown": _spaces.os.externalEventNotificationMode.EXTERNAL_EVENT_NOTIFICATION_LEFT_MOUSEDOWN,
    "externalRMouseDown": _spaces.os.externalEventNotificationMode.EXTERNAL_EVENT_NOTIFICATION_RIGHT_MOUSEDOWN,
    "externalMouseMove": _spaces.os.externalEventNotificationMode.EXTERNAL_EVENT_NOTIFICATION_MOUSEMOVE,
    "externalMouseWheel": _spaces.os.externalEventNotificationMode.EXTERNAL_EVENT_NOTIFICATION_MOUSEWHEEL
};

/**
 * The OS object provides helper methods for dealing with operating
 * system by way of Photoshop.
 *
 * @extends EventEmitter
 * @constructor
 * @private
 */
export class OS extends EventEmitter {
    constructor () {
        super();
    }

    /**
     * OS notifier kinds
     *
     * @const
     * @type {Object.<string, number>}
     */
    static get notifierKind () { return _os.notifierKind; }

    /**
     * OS event kinds
     *
     * @const
     * @type {Object.<string, number>}
     */
    static get eventKind () { return _os.eventKind; }

    /**
     * OS event modifiers
     *
     * @const
     * @type {Object.<string, number>}
     */
    static get eventModifiers () { return _os.eventModifiers; }

    /**
     * OS event keyCodes
     *
     * @const
     * @type {Object.<string, number>}
     */
    static get eventKeyCode () { return _os.eventKeyCode; }

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
     * @return {Promise.<{path: string}>}
     */
    getStandardFolderPath (options) {
        return _os.getStandardFolderPathAsync(options);
    }

    /**
     * Register to receive external events, like "externalMouseDown", from Photoshop.
     * These external event notifications are disabled by default.
     *
     * Example:
     *      os.registerExternalEventNotification("externalMouseMove", "externalMouseDown");
     *      os.addListener("externalMouseMove", callback);
     *      os.addListener("externalMouseDown", callback);
     *
     * @param {...String} events
     * @return {Promise}
     */
    registerExternalEventNotification (...events) {
        return this._setExternalEventNotification(events);
    }

    /**
     * Unregister to stop receiving external events, like "externalMouseMove", from Photoshop.
     *
     * @param {...String} events
     * @return {Promise}
     */
    unregisterExternalEventNotification (...events) {
        return this._setExternalEventNotification(events, false);
    }

    /**
     * Return Photoshop's current notification modes of external events.
     *
     * @return {Promise.<Array.<String>>}
     */
    getExternalEventNotificationMode () {
        return _os.getExternalEventNotificationModeAsync()
            .then(function (mode) {
                return Object.entries(_EXTERNAL_EVENT_MODE).reduce(function (events, event) {
                    if (event[1] & mode) {
                        events.push(event[0]);
                    }

                    return events;
                }, []);
            });
    }

    /**
     * @private
     * @param {Array.<string>} events
     * @param {Boolean=} register
     * @return {Promise}
     */
    _setExternalEventNotification (events, register = true) {
        var nextMode;

        return _os.getExternalEventNotificationModeAsync()
            .then(function (mode) {
                nextMode = mode;

                return events;
            })
            .each(function (event) {
                var mode = _EXTERNAL_EVENT_MODE[event];

                if (!mode) {
                    return Promise.reject("Unsupported external event: " + mode);
                }

                if (register) {
                    nextMode |= mode;
                } else {
                    nextMode ^= mode;
                }
            })
            .then(function () {
                return _os.setExternalEventNotificationModeAsync({ mode: nextMode });
            });
    }

}

/**
 * Construct an OS object with the given options.
 *
 * @param {object=} options
 * @return {OS}
 */
export function makeOS (options = {}) {
    let os = new OS();

    // bind native Photoshop event handler to our handler function
    _spaces.setNotifier(_spaces.notifierGroup.OS, options, os._eventHandler.bind(os));

    return os;
}
