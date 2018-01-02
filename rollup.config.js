'use strict';

/**
 * rollup config file
 * @module
 * @author Oleg Dutchenko <dutchenko.o.dev@gmail.com>
 * @version 1.0.0
 */

// ----------------------------------------
// Imports
// ----------------------------------------

const minify = require('rollup-plugin-minify');
const babel = require('rollup-plugin-babel');

// ----------------------------------------
// Public
// ----------------------------------------

const config = {
	input: './page2page/page2page.esm.js',
	plugins: [
		babel(),
		minify({
			iife: {
				dest: './page2page/page2page.iife.min.js',
				mangle: true,
				sourceMapUrl: 'page2page.iife.min.js.map'
			}
		})
	],
	output: {
		file: './page2page/page2page.iife.js',
		name: 'page2page',
		format: 'iife'
	}
};

// ----------------------------------------
// Exports
// ----------------------------------------

module.exports = config;
