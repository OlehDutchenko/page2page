'use strict';

/**
 * Build config file
 * @module
 * @author Oleg Dutchenko <dutchenko.o.dev@gmail.com>
 * @version 1.0.0
 */

// ----------------------------------------
// Imports
// ----------------------------------------

const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const sortCSSmq = require('sort-css-media-queries');
const cssnano = require('cssnano');
const jsBeautify = require('js-beautify');

// ----------------------------------------
// Private
// ----------------------------------------

/**
 * Beautify markup
 * @param {string} markup
 * @returns {string}
 * @private
 * @sourceCode
 */
function beautify (markup) {
	function pattern (pattern, placeholder, markup) {
		let list = [];
		let arr = pattern.exec(markup);

		while (arr !== null) {
			list.push(arr[0]);
			markup = markup.replace(pattern, placeholder);
			arr = pattern.exec(markup);
		}

		return {list, markup};
	}

	let scriptsPattern = /<script(.)*>(|.|\n)*<\/script>/;
	let scriptsPlaceholder = '<script-placeholder></script-placeholder>';
	let scriptsRegExp = new RegExp(scriptsPlaceholder.replace(/\//g, '/'));

	let stylesPattern = /<style(.)*>(|.|\n)*<\/style>/;
	let stylesPlaceholder = '<style-placeholder></style-placeholder>';
	let stylesRegExp = new RegExp(stylesPlaceholder.replace(/\//g, '/'));

	let presPattern = /<pre(.)*>(|.|\n)*<\/pre>/;
	let presPlaceholder = '<pre-placeholder></pre-placeholder>';
	let presRegExp = new RegExp(presPlaceholder.replace(/\//g, '/'));

	let scriptsCut = pattern(scriptsPattern, scriptsPlaceholder, markup);
	let scripts = scriptsCut.list;
	markup = scriptsCut.markup;

	let stylesCut = pattern(stylesPattern, stylesPlaceholder, markup);
	let styles = stylesCut.list;
	markup = stylesCut.markup;

	let presCut = pattern(presPattern, presPlaceholder, markup);
	let pres = presCut.list;
	markup = presCut.markup;

	markup = jsBeautify.html(markup, {
		indent_level: 0,
		eol: '\n',
		indent_with_tabs: true,
		preserve_newlines: true,
		max_preserve_newlines: 1,
		jslint_happy: false,
		space_after_anon_function: false,
		brace_style: 'collapse',
		keep_array_indentation: false,
		keep_function_indentation: false,
		space_before_conditional: true,
		break_chained_methods: false,
		eval_code: false,
		indent_inner_html: true,
		unescape_strings: false,
		wrap_line_length: 0,
		wrap_attributes: 'auto',
		wrap_attributes_indent_size: 4,
		end_with_newline: true,
		extra_liners: [
			'body',
			'noscript',
			'/body'
		],
		unformatted: [
			'pre',
			'code',
			'script',
			'style'
		]
	});

	scripts.forEach(code => (markup = markup.replace(scriptsRegExp, code)));
	styles.forEach(code => (markup = markup.replace(stylesRegExp, code)));
	pres.forEach(code => (markup = markup.replace(presRegExp, code)));

	return markup;
}

// ----------------------------------------
// Public
// ----------------------------------------

/**
 * configs
 * @const {Object}
 */
const config = {
	ejs: {
		layouts: './examples/ejs/_layouts',
		widgets: './examples/ejs/_widgets',
		includes: './examples/ejs/_includes',
		requires: './examples/ejs/_requires',
		extname: '.html',
		localsName: 'app',
		afterRender: beautify
	},

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

	sourcemaps: '/',

	bs () {
		return {};
	}
};

// ----------------------------------------
// Exports
// ----------------------------------------

module.exports = config;
