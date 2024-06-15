// @ts-check

import { atlaASCustomEvent } from './atlaASCustomEvent.mjs';

/**
 * @callback __AOnRaw_methods
 * @param {string} response_string
 * @param {import('@html_first/element_modifier')._$} modifier
 * @returns {Promise<void>}
 */

export class __AOnRaw extends atlaASCustomEvent {
	/**
	 * @type {__AOnRaw}
	 */
	static __;
	/**
	 * @param {Object.<string,__AOnRaw_methods>} methods
	 */
	constructor(methods) {
		super(methods);
		__AOnRaw.__ = this;
		this.register();
	}
}
