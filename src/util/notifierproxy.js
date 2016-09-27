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

import EventEmitter from "events";

/**
 * The NotifierProxy class facilitates Photoshop notifier registration and
 * re-emitting of events.
 */
export default class NotifierProxy extends EventEmitter {
    /**
     * @param {string} notifierGroup
     * @param {object=} options
     * @param {Array.<string|{event: string, universal: boolean}>=} options.events
     */
    constructor (notifierGroup, options) {
        super();

        let enabledEvents = null;
        if (!options.hasOwnProperty("events")) {
            /* eslint no-console: 0 */
            console.warn("Listening for all events is a potential performance problem.");
        } else if (options.events && options.events.length > 0) {
            // Used to verify at runtime that listeners are only added for enabled events.
            enabledEvents = options.events.reduce(function (set, event) {
                if (typeof event === "object") {
                    event = event.event;
                }

                return set.add(event);
            }, new Set());
        } else {
            // To allow all events, remove the events property from the batchPlay options
            delete options.events;
        }

        this._notifierGroup = notifierGroup;

        /**
         * Whether or not the notifier is currently active.
         *
         * @private
         * @type {boolean}
         */
        this._paused = true;

        /**
         * Options used to set the notifier.
         *
         * @private
         * @type {object=}
         */
        this._options = options;

        /**
         * Handles notifications from Photoshop by emitting events.
         *
         * @private
         * @type {function}
         */
        this._eventHandler = this._eventHandler.bind(this);

        /**
         * The set of enabled events, or null if all events are enabled.
         *
         * @private
         * @type {?Set.<string>}
         */
        this._enabledEvents = enabledEvents;
    }

    /**
     * Event handler for events from the native bridge.
     *
     * @private
     * @param {*=} err Error information
     * @param {String} eventID typeID for event type
     * @param {Object} payload serialized ActionDescriptor for the event, dependent on event type
     */
    _eventHandler (err, eventID, payload) {
        if (err) {
            this.emit("error", "Failed to handle event: " + err);
            return;
        }

        this.emit("all", eventID, payload);
        this.emit(eventID, payload);
    }

    /**
     * Overrides the method to verify that the listener is being added for an
     * enabled event, lest the client wait for an event that shall never come.
     *
     * Related methods on, once and addOnceListener are implemented with this
     * method.
     *
     * @param {string|RegExp} event
     * @param {*} rest
     * @return {*}
     */
    addListener (event, ...rest) {
        if (typeof event === "string" && this._enabledEvents && !this._enabledEvents.has(event)) {
            throw new Error(`Event ${event} is not enabled in this Descriptor instance.`);
        }

        return super.addListener(event, ...rest);
    }

    /**
     * Adding this because some clients use off instead of removeListener and
     * it's a wolfy87-eventemitter artifact.
     *
     * @param {string} event
     * @param {function} listener
     * @return {Descriptor} Returns a reference to the instance
     */
    off (event, listener) {
        return this.removeListener(event, listener);
    }

    /**
     * Temporarily disable the notifier, and hence temporarily disable emitting
     * events.
     */
    pause () {
        if (this._paused) {
            return;
        }

        this._paused = true;

        // No need to unset the notifier because client wasn't listening for events
        var options = this._options;
        if (options.events && options.events.length === 0) {
            return;
        }

        // Unset the notifier
        _spaces.setNotifier(this._notifierGroup, options, undefined);
    }

    /**
     * Reenable the notifier, and continue emitting events.
     */
    unpause () {
        if (!this._paused) {
            return;
        }

        this._paused = false;

        // Don't set the notifier if the client isn't listening for events
        var options = this._options;
        if (options.events && options.events.length === 0) {
            return;
        }

        // Re-bind native Photoshop event handler to our handler function
        _spaces.setNotifier(this._notifierGroup, this._options, this._eventHandler);
    }

    /**
     * Emit the named event with the given arguments as parameters. Throws if the
     * event is "error" and there are no listeners.
     * 
     * @see EventEmitter.prototype.emitEvent
     * @param {string|RegExp} event Name of the event to emit and execute listeners for
     * @param {Array=} args Optional array of arguments to be passed to each listener
     * @return {object} Current instance for chaining
     */
    emitEvent (event, args) {
        if (event === "error") {
            var listeners = this.getListeners(event);

            if (listeners.length === 0) {
                var message,
                    error;

                if (args.length > 0 && typeof args[0] === "string") {
                    message = args.shift();
                } else {
                    message = "Unhandled error event";
                }

                error = new Error(message);
                error.args = args;
                throw error;
            }
        }

        this.emitEvent.call(event, args);

        return this;
    }
}
