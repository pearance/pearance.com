module.exports = function(grunt) {

	'use strict';

// CONFIGURATION {{{
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

	// COMPASS {{{
		compass: {
			options: {
				config: 'config.rb'
			},
			dev: {
				options: {
					environment: 'development',
					// outputStyle: 'expanded',
					force: false,
					debugInfo: false
				}
			},
			prod: {
				options: {
					environment: 'production',
					outputStyle: 'compact',
					force: true,
					debugInfo: false
				}
			}
		},
	//}}}
	// JSHINT {{{
		jshint: {
			options: {
				jshinitrc: '.jshintrc'
			},
			dev: {
				all: [
					'*.js',
					'public/js/{,**/}*.js',
					'!public/js/{,**/}*.min.js'
				]
			}
		},
//}}}
	// NODEMON {{{
		nodemon: {
			options: {
				delayTime: 1,
				watchedExtensions: ['js'],
				ignoredFiles: [
					'node_modules/**',
					'public/**',
				]
			},
			dev: {
				options: {
					nodeArgs: ['--debug'],
					env: {
						PORT: '3000',
						NODE_ENV: 'development',
					},
				}
			}
		},
	//}}}
	// WATCH {{{
		watch: {
			options: {
				livereload: true,
				spawn: false
			},
			css: {
				files: ['source/sass/{,**/}*.{scss,sass}'],
				tasks: ['compass:dev']
			}
			// js: {
			// 	files: '<%= jshint.all %>',
			// 	tasks: ['jshint', 'uglify:dev']
			// },
			// livereload: {
			// 	files: [
			// 		'public/css/{,**/}*.css',
			// 		'public/js/{,**/}*.js',
			// 		'img/{,**/}*.{png,jpg,jpeg,gif,webp,svg}'
			// 	]
			// }
		},
	//}}}
	// CONCURRENT {{{
		concurrent: {
			dev: {
				options: {logConcurrentOutput: true},
				tasks: [
					'nodemon:dev',
					'watch'
				]
			}
		}
	//}}}

	});
//}}}
// LOAD PLUGINS {{{
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
//}}}
// REGISTER TASKS {{{
	grunt.registerTask('dev', [
		'jshint:dev',
		'concurrent:dev'
	]);
//}}}
// http://serverfault.com/questions/182070/ubuntu-iptables-open-port
};
