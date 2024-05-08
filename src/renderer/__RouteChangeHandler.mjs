// @ts-check

import { __AppSettings } from '../vars/__AppSettings.mjs';

export class __RouteChangeHandler {
	/** @type {__RouteChangeHandler} */
	static __;
	constructor() {
		__RouteChangeHandler.__ = this;
	}
	/**
	 * Description
	 * @param {HTMLAnchorElement} element
	 */
	handle_route_change = async (element) => {
		__AppSettings.__.notify_load();
	};
}
