require.paths.push("./");

var express = require('express'),
    app = module.exports = express.createServer();

app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'foobar' }));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/'));
});

app.listen(3000);
