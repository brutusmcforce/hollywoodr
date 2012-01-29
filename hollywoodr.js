(function(window, document, undefined) {

var bind = (function() {
    if (document.addEventListener) {
        return function(elem, ev, callback) {
            elem.addEventListener(ev, callback);
        }
    } else if (document.attachEvent) {
        return function(elem, ev, callback) {
            elem.attachEvent("on" + ev, callback);
        }
    }
})();

function showDreadfulTripe() {
    var elem = document.createElement("div");
    elem.style.position = "fixed";
    elem.style.background = "black";
    elem.style.top = "0px";
    elem.style.left = "0px";
    elem.style.bottom = "0px";
    elem.style.right = "0px";
    elem.innerHTML = '<object width="100%" height="100%"><param name="movie" value="http://www.youtube.com/v/HmZm8vNHBSU?version=3&amp;hl=en_US&amp;rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/HmZm8vNHBSU?version=3&amp;hl=en_US&amp;rel=0&amp;autoplay=1&amp;controls=0" type="application/x-shockwave-flash" width="100%" height="100%" allowscriptaccess="always" allowfullscreen="true"></embed></object>';
    document.body.appendChild(elem);
}

bind(window, "load", function() {
    console.log("tripetripe");
    showDreadfulTripe();
});
})(window, document);
