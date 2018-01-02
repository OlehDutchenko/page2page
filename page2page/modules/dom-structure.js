'use strict';

/**
 * Prepare DOM structure
 * @module
 */

// ----------------------------------------
// Public
// ----------------------------------------

/**
 * @param {p2p} p2p
 */
function domStructure (p2p) {
	p2p.$container.classList.add('p2p');
	// p2p.$container.style.position = 'relative';
	// p2p.$container.style.height = '100%';
}

// ----------------------------------------
// Exports
// ----------------------------------------

export default domStructure;
