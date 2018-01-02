'use strict';

/**
 * @fileOverview page2page entry module
 * @author Oleg Dutchenko <dutchenko.o.dev@gmail.com>
 * @version 1.0.0
 */

// ----------------------------------------
// Imports
// ----------------------------------------

import defaultConfig from './modules/default-config';
import domStructure from './modules/dom-structure';
import Page from './modules/Page';

// ----------------------------------------
// Public
// ----------------------------------------

/**
 * Initialize plugin
 * @param {HTMLElement|jQuery} [$element=document.querySelector('.page2page')]
 * @param {Object} [userConfig={}]
 * @return {p2p|null} page2page plugin instance
 */
function page2page ($element = document.querySelector('.p2p'), userConfig = {}) {
	// if $element is jQuery Element
	if ($element && $element.jquery) {
		$element = $element[0];
	}

	// if $element not HTMLElement - exit
	if (!($element instanceof window.HTMLElement)) {
		console.warn(`p2p.$element must be an HTMLElement,\nreceive ${$element}`);
		return null;
	}

	const instanceConfig = Object.assign(defaultConfig, userConfig); // merge configs
	const tempPages = {__LIST__: null}; // temp pages data

	/**
	 * page2page plugin instance
	 * @namespace p2p
	 */
	const p2p = {
		/**
		 * <html> element
		 * @protected
		 * @type {HTMLElement}
		 * @memberOf p2p
		 */
		get $html () {
			return document.documentElement;
		},

		/**
		 * <body> element
		 * @protected
		 * @type {HTMLElement}
		 * @memberOf p2p
		 */
		get $body () {
			return document.body;
		},

		/**
		 * Container element
		 * @protected
		 * @type {HTMLElement}
		 * @memberOf p2p
		 */
		get $container () {
			return $element;
		},

		/**
		 * Get pages data
		 * @return {Object}
		 */
		get $pages () {
			if (tempPages.__LIST__ === null) {
				let list = this.$container.querySelectorAll(this.config.pageSelector);
				tempPages.__LIST__ = [];

				list.forEach(($page, i) => {
					let page = new Page($page, i);
					tempPages.__LIST__.push(page);

					let {anchor} = page;
					if (!tempPages.hasOwnProperty(anchor)) {
						tempPages[anchor] = page;
					}
				});
			}
			return tempPages;
		},

		/**
		 * Plugin configuration
		 * @memberOf p2p
		 * @namespace config
		 */
		config: {
			/**
			 * Use CSS3 features
			 * @protected
			 * @type {boolean}
			 * @memberOf p2p.config
			 */
			get css3 () {
				return instanceConfig.css3 === true;
			},

			/**
			 * Pages selector
			 * @protected
			 * @type {string}
			 * @memberOf p2p.config
			 */
			get pageSelector () {
				return instanceConfig.pageSelector;
			},

			/**
			 * Page slides selector
			 * @protected
			 * @type {string}
			 * @memberOf p2p.config
			 */
			get pageSlideSelector () {
				return instanceConfig.pageSlideSelector;
			},

			/**
			 * Scrolling speed from page to page.
			 * Minimum value is 150
			 * @type {number}
			 * @memberOf p2p.config
			 */
			scrollingSpeed: instanceConfig.scrollingSpeed > 150 ? +instanceConfig.scrollingSpeed : 150
		}
	};

	Page.p2p = p2p;
	domStructure(p2p);

	return p2p;
}

// ----------------------------------------
// Exports
// ----------------------------------------

window.page2page = page2page;
