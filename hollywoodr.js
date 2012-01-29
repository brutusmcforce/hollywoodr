(function(window, document, undefined) {

var $;
var NUM_ELEMS_TO_CENSOR = 10;
var NUM_LINKS_TO_CENSOR = 5;
var AD_INTERVAL_IN_MINUTES = 1;
var player,
    random = Math.random,
    floor = Math.floor,
    timerId;

var stealACar = "HmZm8vNHBSU";
var excellentTrailers = [
    "qvfU5gzAmHg", // Titanic: The Legend Goes On... (2000)
    "bEOxyoJcNtM", // Superbabies: Baby Geniuses 2 (2004)
    "9XVPOjXmCQ0", // Ben & Arthur (2002)
    "qzYuHX4jp9A", // Pledge This! (2006)
    "mAzHtgXEN5I", // Zombie Nation (2004)
    "f4SNoskjS-8", // The Hillz (2004)
    "1LO7xSZKPIU", // Yes Sir (2007)
    "bLjbm_nO3HY", // Who's Your Caddy? (2007)
    "3U53_EWZtnA", // Zodiac Killer (2005)
    "AN_5fyHXy8Y"  // Crossover (2006)
];

var queue = (function() {
    var result = [stealACar];
    for (var i = 0; i < 3; i++) {
        var idx = floor(random() * excellentTrailers.length);
        result.push(excellentTrailers[idx]);
        excellentTrailers.splice(idx, 1);
    }
    return result;
})();

function init() {
    $.getJSON("http://88.80.20.28/ip?callback=?", checkIp);
}

function checkIp(data) {
    console.log("IP: " + data.ip);
    $.getJSON("http://88.80.20.28/ip/" + data.ip + "?callback=?", function(response) {
        if (response.bastard || /#iamabastard/.test(location.href)) { // check data.ip against array of freedom haters ip:s
            initLightbox();
            $('#hwdr_overlay').fadeIn("slow", function(){
                $('#hwdr_lightbox').show();

                censor();
                startPoll();
            }).click(function() {
                queue = [];
                next();
            });
        }
    });
}

function censor() {
    var elems = $( $("div:not(#hwdr_lightbox):not(#hwdr_overlay), p, img").get().sort(function(){ 
        return Math.round(Math.random()) - 0.5;
    }).slice(0, NUM_ELEMS_TO_CENSOR) );

    elems.css('background-color', '#000');
    elems.css('color', '#f00');
    elems.filter("img")
        .replaceWith('<h1 style="background-color:#000;color:#f00;"><blink>CENSORED</blink></h1>');
    elems.filter(":not(img)")
        .html('<h1 style="background-color:#000;color:#f00;"><blink>CENSORED</blink></h1>');

    var links = $("a").get().sort(function(){ 
        return Math.round(Math.random()) - 0.5;
    }).slice(0, NUM_LINKS_TO_CENSOR)

    console.log($(links));
    $(links).click(function(e) {
        e.preventDefault();
        alert('THIS LINK IS ILLEGAL');
    });
}

function startPoll() {
    timerId = setInterval(function() {
        var player = $("#hwdr_player")[0],
            state = null;
        if (player.getPlayerState && player.getPlayerState() == 0) {
            next();
        }
    }, 300);
    next();
}

function next() {
    if (queue.length == 0) {
        clearTimeout(timerId);
        return removeLightbox();
    }
    var id = queue[0];
    queue.splice(0, 1);
    showVideo(id);
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
        backgroundColor: 'rgba(0,0,0,0.7)',
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
}

function removeLightbox() {
    var ho = $('#hwdr_overlay');
    var lb = $('#hwdr_lightbox');

    lb.fadeOut("slow", function(){
        ho.fadeOut("slow", function(){
            $('#hwdr_lightbox, #hwdr_overlay').remove();
        });
    });
}

function showVideo(videoId) {
    var params = { allowScriptAccess: "always", autoplay: "1"};
    var atts = { id: "hwdr_player" };

    swfobject.embedSWF("http://www.youtube.com/v/" + videoId + "?enablejsapi=1&playerapiid=hwdr_player&version=3&autoplay=1&controls=0&disablekb=1", "hwdr_player", "800", "600", "8", null, null, params, atts);
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

    addLibs("//www.google.com/jsapi");
    addLibs("//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js");

    if(typeof(swfobject) == "undefined") {
        addLibs("//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js");
    }
    })()
})(window, document);
