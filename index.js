/**
 * Figlet.js with Browserify
 *
 * This project was released under MIT license.
 *
 * @link      http://websemantics.ca
 * @author    Web Semantics, Inc. Dev Team <team@websemantics.ca>
 * @author    Adnan M.Sagar, PhD. <adnan@websemantics.ca>
 */

var figlet = require('figlet')
var JSON = require('json3')

var figFonts = {}
var figDefaults = {
    font: 'Standard',
    fontPath: './fonts'
}

figlet.defaults = function(opts) {
    if (typeof opts === 'object') {
        for (var prop in opts) {
            if (opts.hasOwnProperty(prop)) {
                figDefaults[prop] = opts[prop];
            }
        }
    }
    return JSON.parse(JSON.stringify(figDefaults));
};

figlet.loadFontSync = function(name) {
   if (figFonts[name]) {
     return figFonts[name].options
   }
   throw new Error('synchronous font loading is not implemented for the browser');
}

figlet.preloadFonts = function(fonts, next) {

 if (typeof jQuery === 'undefined') { /* TODO: create common function for jQuery checks */
     throw new Error('jQuery is required for ajax method to work.')
 }

 jQuery.when.apply(this, fonts.map(function(name){
       return jQuery.get(figDefaults.fontPath + '/' + name + '.flf')
     })).then(function() {
           var args = fonts.length > 1 ? arguments : [arguments];
           for(var i in fonts){
             figFonts[fonts[i]] = {options:figlet.parseFont(fonts[i], args[i][0])}
           }
           if(next)next()
     })
}

module.exports = figlet
