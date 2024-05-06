// @ts-check

import { __RouteChangeHandler } from './__RouteChangeHandler.mjs';

export class _AjaxRenderer {
	/**
	 * @private
	 * @type {HTMLElement}
	 */
	element;
	/**
	 * Description
	 * @param {HTMLElement} element
	 */
	constructor(element) {
		this.element = element;
	}
	render = async () => {
		if (this.element instanceof HTMLAnchorElement) {
			await __RouteChangeHandler.__.handle_route_change(this.element);
			return;
		}
	};
	/** @private */
	interprete_element_attributes = () => {};
}
