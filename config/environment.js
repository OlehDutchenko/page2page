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
	}
};

// ----------------------------------------
// Exports
// ----------------------------------------

module.exports = environment;
