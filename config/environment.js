'use strict';

/**
 * Running environment
 * @module
 * @author Oleg Dutchenko <dutchenko.o.dev@gmail.com>
 * @version 1.0.0
 */

// ----------------------------------------
// Imports
// ----------------------------------------

const argv = require('yargs').argv;

// ----------------------------------------
// Public
// ----------------------------------------

/**
 * environment
 * @const {Object}
 * @prop {string} type
 * @prop {boolean} production
 * @prop {boolean} develop
 * @prop {boolean} open
 */
const environment = {
	get type () {
		let type = argv.build;
		return type ? 'build' : 'develop';
	},

	get build () {
		return this.type === 'build';
	},

	get develop () {
		return !this.build;
	},

	get open () {
		return !!(argv.open);
	}
};

// ----------------------------------------
// Exports
// ----------------------------------------

module.exports = environment;
