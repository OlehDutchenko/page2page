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

// ----------------------------------------
// Public
// ----------------------------------------

/**
 * configs
 * @const {Object}
 */
const config = {
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

	sourcemaps: null
};

// ----------------------------------------
// Exports
// ----------------------------------------

module.exports = config;
