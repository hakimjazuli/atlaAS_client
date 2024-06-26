// @ts-check

import { atlaASCustomEvent } from './atlaASCustomEvent.mjs';

/**
 * @callback __AOnLoadings_methods
 * @param {import('@html_first/element_modifier')._$} modifier
 * @returns {Promise<void>}
 */

export class __AOnLoadings extends atlaASCustomEvent {
	/**
	 * @type {__AOnLoadings}
	 */
	static __;
	/**
	 * @param {Object.<string,__AOnLoadings_methods>} methods
	 */
	constructor(methods) {
		super(methods);
		__AOnLoadings.__ = this;
		this.register();
	}
}
