// vim:fdm=marker:
//   _ __   ___  __ _ _ __ __ _ _ __   ___ ___
//  | '_ \ / _ \/ _` | '__/ _` | '_ \ / __/ _ \
//  | |_) |  __/ (_| | | | (_| | | | | (_|  __/
//  | .__/ \___|\__,_|_|  \__,_|_| |_|\___\___|
//  |_|_(_) |_ ___   (_)___
//  / __| | __/ _ \  | / __|
//  \__ \ | ||  __/_ | \__ \
//  |___/_|\__\___(_)/ |___/
//                 |__/

/* REQUIRED MODULES {{{
----------------------------------------------------------------------------- */
var express         = require('express');
var http            = require('http');
var path            = require('path');
var ejs             = require('ejs');
var stylus          = require('stylus');
var nib             = require('nib');
var site            = express();










//}}}
/* DEVELOPMENT ENVIRONMENT {{{
----------------------------------------------------------------------------- */
site.configure('development', function(){
  var stylusMiddleware = stylus.middleware({
  src: __dirname + '/source',
  dest: __dirname + '/public',
  debug: true,
  compile: function(str, path) {
    return stylus(str)
      .set('filename', path)
      .set('warn', true)
      .set('compress', true)
      .use(nib())
      .import('nib');
    }
  });
  site.use(stylusMiddleware);
  site.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});










//}}}
/* PRODUCTION ENVIRONMENT {{{
----------------------------------------------------------------------------- */
site.configure('production', function(){
  site.use(express.errorHandler());
});










//}}}
/* ALL ENVIRONMENTS {{{
----------------------------------------------------------------------------- */
site.set('port', process.env.PORT || 3000);
site.set("host", process.env.IP);
site.set('views', __dirname + '/views');
site.engine('.html', require('ejs').__express);
site.set('view engine', 'ejs');
site.use(express.favicon());
site.use(express.logger('dev'));
site.use(express.static(__dirname + '/public')); // for static public assets










//}}}
/* ROUTES {{{
----------------------------------------------------------------------------- */
site.get('/', function (req, res) {
  res.render('index',{
		title : 'Home'
  });
});










//}}}
/* SERVER {{{
----------------------------------------------------------------------------- */
http.createServer(site).listen(site.get("port"), site.get("host"), function () {
  console.log("Environment Info:", process.env.NODE_ENV || site.settings.env);
  console.log("Express server listening on host and port: " + site.get("host") + ":" + site.get("port"));
  return;
});










//}}}
/* WRAP {{{
----------------------------------------------------------------------------- */
// TODO: https://github.com/FeeFighters/samurai-example-nodejs
// TODO: http://autotelicum.github.io/Smooth-CoffeeScript/interactive/interactive-coffeescript.html
// }}}
