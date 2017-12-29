'use strict';

/**
 * Production gulpfile config
 * @module
 */

// ----------------------------------------
// Imports
// ----------------------------------------

const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const sortCSSmq = require('sort-css-media-queries');
const cssnano = require('cssnano');

// ----------------------------------------
// Public
// ----------------------------------------

/**
 * configs
 * @const {Object}
 */
const config = {
	sass: {
		includePaths: [
			'./node_modules/'
		]
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
		}),
		cssnano({
			zindex: false,
			autoprefixer: false,
			reduceIdents: false,
			discardUnused: false
		})
	],

	sourcemaps: '/'
};

// ----------------------------------------
// Exports
// ----------------------------------------

module.exports = config;
