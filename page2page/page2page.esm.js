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

// ----------------------------------------
// Public
// ----------------------------------------

/**
 * Initialize plugin
 * @param {HTMLElement} [$element=document.querySelector('.page2page')]
 * @param {Object} [userConfig={}]
 * @return {p2p} page2page plugin instance
 */
function page2page($element = document.querySelector('.page2page'), userConfig = {}) {
	const instanceConfig = Object.assign(defaultConfig, userConfig);

	/**
	 * page2page plugin instance
	 * @namespace p2p
	 */
	const p2p = {
		/**
		 * Root element
		 * @protected
		 * @type {HTMLElement}
		 * @memberOf p2p
		 */
		get $element () {
			return $element;
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
			}
		}
	};

	return p2p;
}

// ----------------------------------------
// Exports
// ----------------------------------------

window.page2page = page2page;
