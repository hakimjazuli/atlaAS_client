// @ts-check

import { __AppSettings } from '../vars/__AppSettings.mjs';
import { _Fetcher } from './_Fetcher.mjs';

export class __RouteChangeHandler {
	/** @type {__RouteChangeHandler} */
	static __;
	constructor() {
		__RouteChangeHandler.__ = this;
	}
	/**
	 * Description
	 * @param {HTMLAnchorElement|string} target
	 */
	handle_route_change = async (target) => {
		let response;
		if (target instanceof HTMLAnchorElement) {
			response = await _Fetcher.element_fetch(target);
		} else {
			response = await _Fetcher.base_fetch(target);
		}
		if (response) {
			this.render_route_change(response);
		}
		__AppSettings.__.notify_load();
	};
	pop_state_handle = async () => {
		const response = await _Fetcher.base_fetch(window.location.href);
		if (response) {
			this.render_route_change(response);
		}
		__AppSettings.__.notify_load();
	};
	/**
	 * @private
	 * @param {string} response
	 */
	render_route_change = (response) => {};
}
