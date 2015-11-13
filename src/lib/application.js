/*
 * Copyright (c) 2015 Adobe Systems Incorporated. All rights reserved.
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

define(function (require, exports) {
    "use strict";

    var PlayObject = require("../playObject"),
        referenceBy = require("./reference").wrapper("application");

    /**
     * PlayObject that returns the system font list.
     *
     * @param {boolean} englishOnly Whether to use native or English-only font names.
     * @return {PlayObject}
     */
    var getFontList = function (englishOnly) {
        var native = !englishOnly;
        
        return new PlayObject("get", {
            "null": {
                "_ref": [
                    {
                        "_ref": "property",
                        "_property": "fontList"
                    },
                    {
                        "_ref": "application",
                        "_enum": "ordinal",
                        "_value": "targetEnum"
                    }
                ]
            },
            "fontNativeFullName": native,
            "fontNativeFamilyName": native,
            "fontNativeStyleName": native
        });
    };

    exports.getFontList = getFontList;
    exports.referenceBy = referenceBy;
});
