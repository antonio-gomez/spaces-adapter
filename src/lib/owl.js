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

import PlayObject from "../playObject";
import { wrapper } from "./reference";

const referenceBy = wrapper("application");

/**
 * Gets the list of all OWL panel IDs
 *
 * @return {PlayObject}
 */
export function getPanelList () {
    return new PlayObject("owlAction", {
        "null": referenceBy.current,
        "owlCommand": "getPanelList"
    });
}

/**
 * Gets information about the OWL containment hierarchy 
 * leading up to the given panel
 *
 * @param {string} panelID
 *
 * @return {PlayObject}
 */
export function getPanelInfo (panelID) {
    return new PlayObject("owlAction", {
        "null": referenceBy.current,
        "owlCommand": "getPanelInfo",
        "owlPanelID": panelID
    });
}

/**
 * Shows the given panel ID, adding it to the visible panels if necessary
 *
 * @param {string} panelID
 *
 * @return {PlayObject}
 */
export function showPanel (panelID) {
    return new PlayObject("owlAction", {
        "null": referenceBy.current,
        "owlCommand": "show",
        "owlPanelID": panelID
    });
}

/**
 * Hides the given panel ID, completely hiding it's parent panel as well
 *
 * @param {string} panelID
 *
 * @return {PlayObject}
 */
export function closePanel (panelID) {
    return new PlayObject("owlAction", {
        "null": referenceBy.current,
        "owlCommand": "close",
        "owlPanelID": panelID
    });
}

/**
 * Highlights the panel if it's currently being displayed, no-op if it's not
 *
 * @param {string} panelID
 *
 * @return {PlayObject}
 */
export function identifyPanel (panelID) {
    return new PlayObject("owlAction", {
        "null": referenceBy.current,
        "owlCommand": "identify",
        "owlPanelID": panelID
    });
}

/**
 * Returns the current globalBounds of visible document area
 *
 * @return {PlayObject}
 */
export function getDocumentArea () {
    return new PlayObject("owlAction", {
        "null": referenceBy.current,
        "owlCommand": "getDocumentArea"
    });
}

/**
 * Gets document presets in PS
 *
 * @return {PlayObject}
 */
export function getDocumentPresets () {
    var descriptor = {
        "null": {
            _ref: [
                {
                    _ref: null,
                    _property: "newDocPresetJSON"
                },
                {
                    _ref: "application",
                    _enum: "ordinal",
                    _value: "targetEnum"
                }
            ]
        }
    };

    return new PlayObject("get", descriptor);
}

/**
 * Get the global bounds of the application frame.
 *
 * @return {PlayObject}
 */
export function getApplicationFrameInfo () {
    return new PlayObject("owlAction", {
        "null": referenceBy.current,
        "owlCommand": "getApplicationFrameInfo"
    });
}

/**
 * Gets the information on all the tools from Photoshop
 *
 * @return {PlayObject}
 */
export function getToolList () {
    return new PlayObject("uiInfo", {
        "null": referenceBy.current,
        "command": "getToolList"
    });
}

/**
 * Gets the user specified information on all the tools from Photoshop
 *
 * @return {PlayObject}
 */
export function getCurrentToolbarSpecification () {
    return new PlayObject("uiInfo", {
        "null": referenceBy.current,
        "command": "getCurrentToolbarSpecification"
    });
}

/**
 * Gets information on the given tool
 *
 * @param {string} toolID OSType of the tool e.g. `$pntb`
 *
 * @return {PlayObject}
 */
export function getToolInfo (toolID) {
    return new PlayObject("uiInfo", {
        "null": referenceBy.current,
        "command": "getToolInfo",
        "toolKey": toolID
    });
}

/**
 * Gets menu commands in PS
 *
 * @return {PlayObject}
 */
export function getMenuCommands () {
    var descriptor = {
        "null": {
            _ref: [
                {
                    _ref: null,
                    _property: "menuBarInfo"
                },
                {
                    _ref: "application",
                    _enum: "ordinal",
                    _value: "targetEnum"
                }
            ]
        }
    };

    return new PlayObject("get", descriptor);
}

/**
 * Get a list of all available views.
 *
 * @return {PlayObject}
 */
export function getViewList () {
    return new PlayObject("uiInfo", {
        "null": referenceBy.current,
        "command": "getViewList"
    });
}

/**
 * Returns information on a view with the given viewID in the given panel
 * including it's bounds, whether it's shown or not and it's control state
 *
 * @param {string} panel Panel ID, for options bar, this is "options"
 * @param {string} viewID view ID, extracted from the Eve descriptors
 *
 * @return {PlayObject}
 */
export function getViewInfo (panel, viewID) {
    return new PlayObject("uiInfo", {
        "null": referenceBy.current,
        "command": "getViewInfo",
        "panel": panel,
        "viewID": viewID
    });
}

/**
 * Returns information on whether the command with the given command ID is 
 * currently enabled in Photoshop
 *
 * @param {number} commandID
 * @return {PlayObject}
 */
export function getCommandEnabled (commandID) {
    return new PlayObject("uiInfo", {
        "null": referenceBy.current,
        "command": "getCommandEnabled",
        "commandID": commandID
    });
}
