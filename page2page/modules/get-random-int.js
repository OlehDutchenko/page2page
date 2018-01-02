'use strict';

/**
 * Random integer
 * @module
 */

// ----------------------------------------
// Private
// ----------------------------------------

const min = 1000;
const max = 9999;

// ----------------------------------------
// Public
// ----------------------------------------

function getRandomInt () {
	return (Math.floor(Math.random() * (max - min + 1)) + min) + '-' + (new Date().getTime());
}

// ----------------------------------------
// Exports
// ----------------------------------------

export default getRandomInt;
