'use strict';

/**
 * Development gulpfile config
 * @module
 */

// ----------------------------------------
// Imports
// ----------------------------------------

const gulp = require('gulp');
const watchAndTouch = require('gulp-watch-and-touch');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const sortCSSmq = require('sort-css-media-queries');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const WriteFilePlugin = require('write-file-webpack-plugin');

const environment = require('../environment');
const webpackConfig = require('../../webpack.config');
const notify = require('../notify');
const icons = require('../notify-icons');

// ----------------------------------------
// Public
// ----------------------------------------

/**
 * configs
 * @const {Object}
 */
const config = {
	get ejs () {
		const watcher = watchAndTouch(gulp);
		return {
			layouts: './examples/ejs/_layouts',
			widgets: './examples/ejs/_widgets',
			includes: './examples/ejs/_includes',
			requires: './examples/ejs/_requires',
			extname: '.html',
			localsName: 'app',
			afterRender (markup, ...args) {
				let sources = args[1];
				let filePath = sources.shift();
				watcher(filePath, filePath, sources);
			}
		};
	},

	get sass () {
		const watcher = watchAndTouch(gulp);
		return {
			includePaths: [
				'./node_modules/'
			],
			afterRender (result, file) {
				let filePath = file.path;
				let sources = result.stats.includedFiles;
				watcher(filePath, filePath, sources);
			}
		};
	},

	postcss: [
		autoprefixer({
			browsers: [
				'> 1%',
				'last 2 versions',
				'ie 11'
			],
			cascade: false
		}),
		mqpacker({
			sort: sortCSSmq
		})
	],

	sourcemaps: null,

	bs (browserSync) {
		let options = {
			open: environment.open,
			server: {
				baseDir: './examples/'
			}
		};

		// let wasErrors = false;
		// let getEmittedAssets = (assets) => {
		// 	let arr = [];
		// 	for (let chunk in assets) {
		// 		if (assets[chunk].emitted) {
		// 			arr.push(chunk);
		// 		}
		// 	}
		// 	return arr;
		// };
		//
		// webpackConfig.plugins.push(new WriteFilePlugin());
		// let bundler = webpack(webpackConfig);
		//
		// bundler.plugin('done', stats => {
		// 	if (stats.hasErrors() || stats.hasWarnings()) {
		// 		wasErrors = true;
		// 		notify.onError('webpack build', stats.toString(), icons.webpack);
		// 	} else if (wasErrors) {
		// 		notify.onResolved('webpack build');
		// 		wasErrors = false;
		// 	}
		// 	let assets = getEmittedAssets(stats.compilation.assets);
		// 	if (assets.length) {
		// 		browserSync.reload();
		// 	}
		// });

		return options;
	}
};

// ----------------------------------------
// Exports
// ----------------------------------------

module.exports = config;
