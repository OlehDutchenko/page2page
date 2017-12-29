'use strict';

/**
 * Running environment
 * @module
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
		let type = argv.p || argv.production;
		return type ? 'production' : 'develop';
	},

	get production () {
		return this.type === 'production';
	},

	get develop () {
		return !this.production;
	},

	get open () {
		return !!(argv.open);
	}
};

// ----------------------------------------
// Exports
// ----------------------------------------

module.exports = environment;
