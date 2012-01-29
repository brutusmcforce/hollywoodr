(function(window, document, undefined) {

var $;
var NUM_ELEMS_TO_CENSOR = 10;
var AD_INTERVAL_IN_MINUTES = 1;

var ads = [
    'http://www.youtube.com/watch?v=nDzblNKjsO0',
    'http://www.youtube.com/v/HmZm8vNHBSU?version=3&amp;hl=en_US&amp;rel=0'
]

var stealACar = "HmZm8vNHBSU";
var excellentTrailers = [
    "qvfU5gzAmHg", // Titanic: The Legend Goes On... (2000)
    "bEOxyoJcNtM", // Superbabies: Baby Geniuses 2 (2004)
    "9XVPOjXmCQ0", // Ben & Arthur (2002)
    "qzYuHX4jp9A", // Pledge This! (2006)
    "mAzHtgXEN5I", // Zombie Nation (2004)
    "f4SNoskjS-8", // The Hillz (2004)
    "tihG_2BSUqg", // Disaster Movie (2008)
    "1LO7xSZKPIU", // Yes Sir (2007)
    "bLjbm_nO3HY", // Who's Your Caddy? (2007)
    "3U53_EWZtnA", // Zodiac Killer (2005)
    "AN_5fyHXy8Y"  // Crossover (2006)
];

function init() {
    initLightbox();
    showVideo("http://www.youtube.com/v/" + stealACar + "?version=3&amp;hl=en_US&amp;rel=0");
    censor();
    advertise();
}

function censor() {
    var elems = $("div:not(#hwdr_lightbox):not(#hwdr_overlay), p, img").get().sort(function(){ 
        return Math.round(Math.random()) - 0.5;
    }).slice(0, NUM_ELEMS_TO_CENSOR)

    $(elems).css('background-color', '#000');
    $(elems).css('color', '#f00');
    $(elems).html('<h1 style="color:#f00;"><blink>CENSORED</blink></h1>');
}

function advertise() {
    var timer = setInterval(showAdvertisement, AD_INTERVAL_IN_MINUTES * 60000);

    function showAdvertisement() {
        console.log('lol');
        showVideo(Math.floor(Math.random() * ads.length));
    }
}

function initLightbox() {
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
        removeLightbox();
    });
}

function removeLightbox() {
    var ho = $('#hwdr_overlay');
    var lb = $('#hwdr_lightbox');

    lb.fadeTo(100, 0, function(){
        lb.remove();
        ho.fadeTo(250, 0, function(){
            ho.remove();
        });
    });
}

function showVideo(url) {
    var params = { allowScriptAccess: "always", autoplay: "1"};
    var atts = { id: "hwdr_player" };

    swfobject.embedSWF(url + "&enablejsapi=1&playerapiid=hwdr_player&version=3&autoplay=1&controls=0",
                       "hwdr_player", "800", "600", "8", null, null, params, atts);

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
