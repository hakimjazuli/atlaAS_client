// @ts-check

import { __atlaAS_client } from '../__atlaAS_client.mjs';
import { __AppSettings } from '../vars/__AppSettings.mjs';
import { _Fetcher } from './_Fetcher.mjs';
import { __RouteChangeHandler } from './__RouteChangeHandler.mjs';

export class AjaxRenderer {
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
	 * @public
	 * @param {string} dispatch
	 * @param {HTMLElement|Element} element
	 */
	constructor(dispatch, element) {
		this.dispatch = dispatch;
		this.element = element;
	}
	/** @public */
	render = async () => {
		const __app_settings = __AppSettings.__;
		if (
			this.element instanceof HTMLAnchorElement &&
			!this.element.hasAttribute(__app_settings.a_partial)
		) {
			await __RouteChangeHandler.__.handle_route_change(this.element);
			return;
		}
		await this.dispatcher();
	};
	/** @private */
	dispatcher = async () => {
		const __app_settings = __AppSettings.__;
		const dispatches_to = this.dispatch.split(__app_settings.separator[0]);
		for (let i = 0; i < dispatches_to.length; i++) {
			const dispatch_to = dispatches_to[i];
			if (dispatch_to === '') {
				continue;
			}
			if (dispatch_to === __app_settings.dispatches_default) {
				await this.handle_listener(this.element);
				continue;
			}
			const listeners = document.querySelectorAll(
				`[${__app_settings.a_listens_to}*="{${dispatch_to}}"]`
			);
			if (listeners) {
				let promises_handler = [];
				for (let i = 0; i < listeners.length; i++) {
					const listener = listeners[i];
					promises_handler.push(async () => {
						listener.setAttribute(__app_settings.a_loading, '');
						await this.handle_listener(listener);
						listener.removeAttribute(__app_settings.a_loading);
					});
				}
				await Promise.all(promises_handler.map(async (listener) => await listener())).catch(
					(error) => {
						console.error(error);
					}
				);
			}
		}
	};
	/**
	 * @public
	 * @param {HTMLElement|Element} element
	 */
	handle_listener = async (element) => {
		const response = await _Fetcher.element_fetch(element);
		if (typeof response === 'string') {
			element.outerHTML = response;
		}
		__AppSettings.__.notify_load(element, 'after');
	};
}