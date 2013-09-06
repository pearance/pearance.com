module.exports = function(grunt) {

	'use strict';

	// CONFIGURATION
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		compass: {
			dev: {
				options: {
					sassDir: 'source/sass',
					cssDir: 'public/stylesheets',
					imagesDir: 'public/images',
					javascriptsDir: 'public/javascripts',
					fontsDir: 'public/stylesheets/fonts',
					importPath: 'public/components/',
					relativeAssets: 'false', // 'true' breaks spritemap url() refs in CSS TODO: needs confirmation
					debugInfo: true
				}
			}
		},



		nodemon: {
			options: {
				delayTime: 1,
				watchedExtensions: ['js'],
				ignoredFiles: [
					'node_modules/**',
					'public/**',
					'Gruntfile'
				]
			},

			dev: {
				options: {
					debug: true,
					nodeArgs: ['--debug'],
					env: {
						PORT: '3000',
						NODE_ENV: 'development',
					},
				}
			}
		},



		watch: {
			compass: {
				options: {livereload: false},
				files: ['source/sass/*.{scss,sass}'],
				tasks: ['compass']
			},
			css: {
				files: ['*.css']
			},
			livereload: {
				options: {livereload: true},
				files: ['public/stylesheets/*.css']
			}
		},



		jshint: {
			options: {
				'node': true,
				'browser': true,
				'esnext': true,
				'bitwise': true,
				'camelcase': true,
				'curly': true,
				'eqeqeq': true,
				'immed': true,
				'indent': 2,
				'latedef': true,
				'newcap': true,
				'noarg': true,
				'quotmark': 'single',
				'regexp': true,
				'undef': true,
				'unused': false,
				'strict': true,
				'trailing': true,
				'smarttabs': true,
				'-W110': true // allowed mixed tabs and spaces
			},
			all: [
				'Gruntfile.js',
				'*.js',
				'public/javascripts/**/*.js',
			]
		},



		concurrent: {
			dev: {
				options: {logConcurrentOutput: true},
				tasks: ['nodemon', 'watch']
			}
		}

	});



	// LOAD PLUGINS
	// TODO: try line below after installing matchdep to possibly automate
	// require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');



	// REGISTER TASKS
	grunt.registerTask('dev', [
		'jshint',
		'concurrent:dev'
	]);
};
