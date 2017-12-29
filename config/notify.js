'use strict';

/**
 * Push messages
 * @module
 * @author Dutchenko Oleg <dutchenko.o.dev@gmail.com>
 * @version 1.0.0
 */

// --------------------------------------------------
// Imports
// --------------------------------------------------

// модули
const chalk = require('chalk');
const nodeNotifier = require('node-notifier');
const stripAnsi = require('strip-ansi');

const icons = require('./notify-icons');

// --------------------------------------------------
// Public
// --------------------------------------------------

/**
 * @namespace notify
 */
const notify = {
	/**
	 * @param {string} [title='']
	 * @param {string} [message='is done!']
	 * @param {string} [icon=icons.done]
	 * @return {Function}
	 * @sourcecode
	 */
	onDone (title = '', message = 'is done', icon = icons.done) {
		console.log(chalk.green(title));
		console.log(chalk.gray(message));
		nodeNotifier.notify({
			icon,
			title,
			type: 'info',
			time: 2500,
			message: stripAnsi(message)
		});
	},

	/**
	 * @param {string} [title='']
	 * @param {string} [message='']
	 * @param {string} [icon=icons.error]
	 * @return {Function}
	 * @sourcecode
	 */
	onError (title = '', message = '', icon = icons.error) {
		title = `Error ${title}`;
		console.log(chalk.red(title));
		console.log(chalk.gray(message));
		nodeNotifier.notify({
			icon,
			title,
			type: 'error',
			time: 2500,
			message: stripAnsi(message)
		});
	},

	/**
	 * @param {string} [title='']
	 * @param {string} [message='']
	 * @param {string} [icon=icons.warn]
	 * @return {Function}
	 * @sourcecode
	 */
	onWarn (title = '', message = '', icon = icons.warn) {
		title = `Warning ${title}`;
		console.log(chalk.yellow(title));
		console.log(chalk.gray(message));
		nodeNotifier.notify({
			icon,
			title,
			type: 'warn',
			time: 2500,
			message: stripAnsi(message)
		});
	},

	/**
	 * @param {string} [title='']
	 * @param {string} [message='Good job!']
	 * @param {string} [icon=icons.resolved]
	 * @return {Function}
	 * @sourcecode
	 */
	onResolved (title = '', message = 'Good job!', icon = icons.resolved) {
		title = `Resolved error ${title}`;
		console.log(chalk.blue(title));
		console.log(chalk.gray(message));
		nodeNotifier.notify({
			icon,
			title,
			type: 'info',
			time: 2500,
			message: stripAnsi(message)
		});
	}
};

// --------------------------------------------------
// Exports
// --------------------------------------------------

module.exports = notify;
