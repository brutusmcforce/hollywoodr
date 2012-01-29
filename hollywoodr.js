(function(window, document, undefined) {

var $;

function init() {
    initLightbox();
    showVideo("http://www.youtube.com/v/HmZm8vNHBSU?version=3&amp;hl=en_US&amp;rel=0");
}

function initLightbox() {
    var topPos = $(window).scrollTop() + 50;

    $('body')
        .append('<div id="hwdr_overlay"></div>')
        .append('<div id="hwdr_lightbox"><object width="100%" height="100%" id="hwdr_player"><param name="movie" value=""></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><param name="enablejsapi" value="1"></param><embed src="" type="application/x-shockwave-flash" width="100%" height="100%" allowscriptaccess="always" allowfullscreen="true"></embed></object></div>');

    $('#hwdr_overlay').css('position', 'absolute');
    $('#hwdr_overlay').css('top', '0');
    $('#hwdr_overlay').css('left', '0');
    $('#hwdr_overlay').css('background-color', '#000');
    $('#hwdr_overlay').css('width', '100%');
    $('#hwdr_overlay').css('height', '100%');
    $('#hwdr_overlay').css('z-index', '999');
    $('#hwdr_overlay').hide();

    $('#hwdr_lightbox').css('top', topPos + 'px');
    $('#hwdr_lightbox').css('position', 'absolute');
    $('#hwdr_lightbox').css('top', '0');
    $('#hwdr_lightbox').css('left', '0');
    $('#hwdr_lightbox').css('z-index', '1000');
    $('#hwdr_lightbox').css('width', '800px');
    $('#hwdr_lightbox').css('height', '600px');
    $('#hwdr_lightbox').css('text-align', 'center');
    $('#hwdr_lightbox').hide();

    player = document.getElementById("hwdr_player");
    player.addEventListener("onStateChange", function(state) {
        alert(state);
    });
}

function showVideo(url) {
    $('#hwdr_lightbox param[name="movie"]').val(url);
    $('#hwdr_lightbox embed').attr('src', url + '&amp;autoplay=1&amp;controls=0');
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
