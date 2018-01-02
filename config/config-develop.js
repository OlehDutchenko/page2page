'use strict';

/**
 * Development config file
 * @module
 * @author Oleg Dutchenko <dutchenko.o.dev@gmail.com>
 * @version 1.0.0
 */

// ----------------------------------------
// Imports
// ----------------------------------------

const gulp = require('gulp');
const path = require('path');
const chalk = require('chalk');
const watchAndTouch = require('gulp-watch-and-touch');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const sortCSSmq = require('sort-css-media-queries');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const WriteFilePlugin = require('write-file-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const environment = require('./environment');
const notify = require('./notify');
const icons = require('./notify-icons');

// ----------------------------------------
// Private
// ----------------------------------------

/**
 * webpack config
 * @const {Object}
 * @private
 * @sourceCode
 */
const webpackConfig = {
	entry: {
		page2page: path.join(process.cwd(), './page2page/page2page.esm.js')
	},
	output: {
		filename: '[name].iife.js',
		path: path.resolve(process.cwd(), './page2page/')
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader'
			}]
		}]
	},
	resolve: {
		modules: [
			'./node_modules/',
			'./page2page/'
		]
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new ProgressBarPlugin({
			format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
			clear: false
		}),
		new WriteFilePlugin()
	],
	devtool: 'inline-source-map',
	watch: true
};

/**
 * Get webpack emitted assets
 * @param {Object} assets
 * @return {Array}
 * @private
 * @sourceCode
 */
function getEmittedAssets (assets) {
	let arr = [];
	for (let chunk in assets) {
		if (assets[chunk].emitted) {
			arr.push(chunk);
		}
	}
	return arr;
};

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
			afterRender (...args) {
				let sources = args[2];
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
		let wasErrors = false;
		let bundler = webpack(webpackConfig);
		bundler.plugin('done', stats => {
			if (stats.hasErrors() || stats.hasWarnings()) {
				wasErrors = true;
				notify.onError('webpack build', stats.toString(), icons.webpack);
			} else if (wasErrors) {
				notify.onResolved('webpack build');
				wasErrors = false;
			}
			let assets = getEmittedAssets(stats.compilation.assets);
			if (assets.length) {
				browserSync.reload();
			}
		});

		return {
			open: environment.open,
			server: {
				baseDir: './examples/'
			},
			middleware: [
				webpackDevMiddleware(bundler, {
					stats: {
						colors: true
					}
				})
			]
		};
	}
};

// ----------------------------------------
// Exports
// ----------------------------------------

module.exports = config;
