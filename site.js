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
(function () { // Strict Begin

	'use strict';

	var express         = require('express');
	var http            = require('http');
	var path            = require('path');
	var klei            = require('klei-dust');
	var dust            = require('dustjs-linkedin');
	var site            = express();










	//}}}
	/* ALL ENVIRONMENTS {{{
	----------------------------------------------------------------------------- */

 // assign the dust engine to .dust files

	site.configure(function() {
		site.engine('html', klei.dust);
		site.set('view engine', 'html');
		site.set('view options', {layout: false});
		site.set('views', __dirname + '/views');
		site.set('template_engine', 'dust');
		site.set('port', process.env.PORT || 3000);

		klei.setOptions({
			extension: 'html',
			cache: false,
			useHelpers: true
		});

		site.use(express.logger('dev'));
		site.use(express.bodyParser());
		site.use(express.methodOverride());
		site.use(site.router);
		site.use(express.static(path.join(__dirname, 'public')));
		site.use(express.favicon(path.join(__dirname, 'public/img/favicon.ico')));
	});











	//}}}
	/* DEVELOPMENT ENVIRONMENT {{{
	----------------------------------------------------------------------------- */
	site.configure('development', function(){
		site.use(express.errorHandler({ dumpExceptions: true, showStack: true  }));
		site.enable('verbose errors');
	});










	//}}}
	/* PRODUCTION ENVIRONMENT {{{
	----------------------------------------------------------------------------- */
	site.configure('production', function(){
		site.disable('verbose errors');
	});










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
	http.createServer(site).listen(site.get('port'), site.get('host'), function () {
		console.log('Environment:', process.env.NODE_ENV || site.settings.env);
		console.log('Express server listening on port: ' + site.get('port'));
		return;
	});










	//}}}
	/* WRAP {{{
	----------------------------------------------------------------------------- */
	// TODO: https://github.com/FeeFighters/samurai-example-nodejs
	// TODO: http://autotelicum.github.io/Smooth-CoffeeScript/interactive/interactive-coffeescript.html

}()); // Stict End
// }}}
