'use strict';

/**
 * notify icons
 * @module
 * @author Oleg Dutchenko <dutchenko.o.dev@gmail.com>
 * @version 1.0.0
 */

// ----------------------------------------
// Imports
// ----------------------------------------

const path = require('path');

// ----------------------------------------
// Public
// ----------------------------------------

const icons = {
	done: path.join(process.cwd(), './config/notify-icons/done.png'),
	ejs: path.join(process.cwd(), './config/notify-icons/ejs.png'),
	error: path.join(process.cwd(), './config/notify-icons/error.png'),
	resolved: path.join(process.cwd(), './config/notify-icons/good-job.png'),
	postcss: path.join(process.cwd(), './config/notify-icons/postcss.png'),
	sass: path.join(process.cwd(), './config/notify-icons/sass.png'),
	warn: path.join(process.cwd(), './config/notify-icons/warn.png'),
	webpack: path.join(process.cwd(), './config/notify-icons/webpack.png')
};

// ----------------------------------------
// Exports
// ----------------------------------------

module.exports = icons;
