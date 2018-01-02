'use strict';

/**
 * Page class
 * @module
 */

// ----------------------------------------
// Imports
// ----------------------------------------

import getRandomInt from './get-random-int';

// ----------------------------------------
// Private
// ----------------------------------------

const pagesCache = {};

// ----------------------------------------
// Public
// ----------------------------------------

class Page {
	constructor ($page, index) {
		if (pagesCache[$page.dataset.pageUid]) {
			return pagesCache[$page.dataset.pageUid];
		}

		this.$page = $page;
		this.index = index++;
		this.pageIndex = index;

		let anchor = $page.dataset.p2pAnchor;
		if (!anchor || anchor === '__LIST__') {
			anchor = `page-${index}`;
		}
		this.anchor = anchor;
		this.slides = [];

		this.$page.classList.add(Page.classes.page);
		this.$page.setAttribute('data-p2p-anchor', anchor);
		this.$page.dataset.pageUid = 'p' + getRandomInt();
		pagesCache[this.$page.dataset.pageUid] = this;
	}

	activate () {
		this.$page.classList.add(Page.classes.active);
	}

	deactivate () {
		this.$page.classList.remove(Page.classes.active);
	}

	static get classes () {
		return {
			page: 'p2p-page',
			active: 'p2p-page--is-active'
		};
	}
}

// ----------------------------------------
// Exports
// ----------------------------------------

export default Page;
