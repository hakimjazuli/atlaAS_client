// @ts-check

import { __AppSettings } from '../vars/__AppSettings.mjs';
import { __RouteChangeHandler } from './__RouteChangeHandler.mjs';

export class _AjaxRenderer {
	/**
	 * @protected
	 * @type {string}
	 */
	dispatch;
	/**
	 * @protected
	 * @type {HTMLElement|Element}
	 */
	element;
	/**
	 * Description
	 * @param {string} dispatch
	 * @param {HTMLElement|Element} element
	 */
	constructor(dispatch, element) {
		this.dispatch = dispatch;
		this.element = element;
	}
	render = async () => {
		if (this.element instanceof HTMLAnchorElement) {
			await __RouteChangeHandler.__.handle_route_change(this.element);
			return;
		}
		__AppSettings.__.notify_load();
	};
	/** @protected */
	interprete_element_attributes = () => {};
}
