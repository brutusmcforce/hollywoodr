(function(window, document, undefined) {

var $;

function init() {
    alert("all might to hypnotoad");
}

// Include JQuery programatically
(function() {
    // Don't let the script run forever
    var attempts = 30;

    // If jQuery exists, save it and delete it to know when mine is loaded
    var old_jQuery;
    if (typeof(jQuery) != "undefined") {
        if (typeof(jQuery.noConflict) == "function") {
            old_jQuery = jQuery;
            delete jQuery;
        }
    }

    var addLibs = function() {
        var head = document.getElementsByTagName("head");
        if (head.length == 0) {
            if (attempts-- > 0) setTimeout(addLibs, 100);
            return;
        }

        var node = document.createElement("script");
        node.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js";
        head[0].appendChild(node);
        checkLibs();
    }

    var checkLibs = function() {
        // Library isn't done loading
        if (typeof(jQuery) == "undefined" || typeof(jQuery) != "function" || jQuery("*") === null) {
            if (attempts-- > 0) setTimeout(checkLibs, 100);
            return;
        }
        $ = jQuery.noConflict(true);
        $(init);
        if (typeof old_jQuery == "undefined")
            jQuery = old_jQuery;
    }

    addLibs();
})()
})(window, document);
