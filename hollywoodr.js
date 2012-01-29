(function(window, document, undefined) {

var $;
var NUM_ELEMS_TO_CENSOR = 10;

function init() {
    initLightbox();
    showVideo("http://www.youtube.com/v/HmZm8vNHBSU?version=3&amp;hl=en_US&amp;rel=0");
    censor();
}

function censor() {
    var elems = $("div:not(#hwdr_lightbox), p, img").get().sort(function(){ 
        return Math.round(Math.random()) - 0.5;
    }).slice(0, NUM_ELEMS_TO_CENSOR)

    $(elems).css('background-color', '#000');
    $(elems).css('color', '#f00');
    $(elems).each(function() {
        $(this).html('<h1 style="color:#f00;"><blink>CENSORED</blink></h1>');
    });
}

function initLightbox() {
    var topPos = $(window).scrollTop() + 50;

    $('body')
        .append('<div id="hwdr_overlay"></div>')
        .append('<div id="hwdr_lightbox"><div id="hwdr_player"></div></div>');

    var ho = $('#hwdr_overlay').css({
        position: 'fixed',
        top: '0',
        left: '0',
        bottom: '0',
        right: '0',
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: '100%',
        zIndex: '999'
    }).hide();

    var lb = $('#hwdr_lightbox').css({
        position: 'fixed',
        top: '50%',
        left: '50%',
        marginLeft: '-400px',
        marginTop: '-300px',
        zIndex: '1000',
        width: '800px',
        height: '600px',
        textAlign: 'center'
    }).hide();

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
