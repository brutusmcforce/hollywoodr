(function(window, document, undefined) {

var $;

function init() {
    initLightbox();
    showVideo("http://www.youtube.com/v/HmZm8vNHBSU?version=3&amp;hl=en_US&amp;rel=0");
    censor();
}

function censor() {
    var elems = $("div:not(#hwdr_lightbox), p").get().sort(function(){ 
        return Math.round(Math.random()) - 0.5;
    }).slice(0,10)

    $(elems).css('background-color', '#000');
    $(elems).css('color', '#f00');
    $(elems).each(function() {
        $(this).html("<h1><blink>CENSORED</blink></h1>");
    });
}

function initLightbox() {
    var topPos = $(window).scrollTop() + 50;

    $('body')
        .append('<div id="hwdr_overlay"></div>')
        .append('<div id="hwdr_lightbox"><div id="hwdr_player"></div></div>');

    var ho = $('#hwdr_overlay');
    ho.css('position', 'absolute');
    ho.css('top', '0');
    ho.css('left', '0');
    ho.css('background-color', '#000');
    ho.css('width', '100%');
    ho.css('height', '100%');
    ho.css('z-index', '999');
    ho.hide();

    var lb = $('#hwdr_lightbox');

    lb.css('top', topPos + 'px');
    lb.css('position', 'absolute');
    lb.css('z-index', '1000');
    lb.css('width', '800px');
    lb.css('height', '600px');
    lb.css('text-align', 'center');
    lb.css('top', (($(window).height() - lb.outerHeight()) / 2) + $(window).scrollTop() + 'px');
    lb.css('left', (($(window).width() - lb.outerWidth()) / 2) + $(window).scrollLeft() + 'px');
    lb.hide();

    ho.click(function(e){
        e.preventDefault();
        lb.fadeTo(100, 0, function(){
            $(this).remove();
            ho.fadeTo(250, 0, function(){
                $(this).remove();
            });
        });
    });
}

function showVideo(url) {
    var params = { allowScriptAccess: "always", autoplay: "1"};
    var atts = { id: "hwdr_player" };

    swfobject.embedSWF(url + "&enablejsapi=1&playerapiid=hwdr_player&version=3&autoplay=1&controls=0",
                       "hwdr_player", "640", "480", "8", null, null, params, atts);

    $('#hwdr_overlay').fadeTo(500, 0.75, function(){
        $('#hwdr_lightbox').fadeTo(250, 1);
    });
}

(function() {
    var attempts = 30;

    var old_jQuery;
    if (typeof(jQuery) != "undefined") {
        if (typeof(jQuery.noConflict) == "function") {
            old_jQuery = jQuery;
            delete jQuery;
        }
    }

    var addLibs = function(url) {
        var head = document.getElementsByTagName("head");
        if (head.length == 0) {
            if (attempts-- > 0) setTimeout(addLibs, 100);
            return;
        }

        var node = document.createElement("script");
        node.src = url;

        head[0].appendChild(node);

        checkLibs();
    }

    var checkLibs = function() {
        if (typeof(jQuery) == "undefined" || typeof(jQuery) != "function" || jQuery("*") === null) {
            if (attempts-- > 0) setTimeout(checkLibs, 100);
            return;
        }
        $ = jQuery.noConflict(true);
        if (typeof old_jQuery == "undefined")
            jQuery = old_jQuery;

        $(init);
    }

    addLibs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js");

    if(typeof(swfobject) == "undefined") {
        addLibs("http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js");
    }
    })()
})(window, document);
