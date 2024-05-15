// @ts-check

import { Views } from '../utils/Views.mjs';
import { _$ } from '@html_first/element_modifier';
import { __AppSettings } from '../vars/__AppSettings.mjs';
import { _Fetcher } from './_Fetcher.mjs';
import { __RouteChangeHandler } from './__RouteChangeHandler.mjs';

export class AjaxRenderer {
	/**
	 * @protected
	 * @type {string}
	 */
	controller;
	/**
	 * @protected
	 * @type {HTMLElement|Element}
	 */
	element;
	/**
	 * @public
	 * @param {string} controller
	 * @param {HTMLElement|Element} element
	 */
	constructor(controller, element) {
		this.controller = controller;
		this.element = element;
	}
	/** @public */
	render = async () => {
		const __app_settings = __AppSettings.__;
		if (
			this.element instanceof HTMLAnchorElement &&
			!this.element.hasAttribute(__app_settings.a_partial)
		) {
			const loading_element = document.getElementById(__app_settings.route_change_id);
			if (loading_element) {
				new _$(loading_element).styles({
					visibility: 'visible',
				});
			}
			await __RouteChangeHandler.__.handle_route_change(this.element);
			return;
		}
		await this.controll();
	};
	/** @private */
	controll = async () => {
		const __app_settings = __AppSettings.__;
		const dispatches_to = this.controller.split(__app_settings.separator[0]);
		for (let i = 0; i < dispatches_to.length; i++) {
			const dispatch_to = dispatches_to[i];
			if (dispatch_to === '') {
				continue;
			}
			if (dispatch_to === __app_settings.controllers_default) {
				await this.handle_view(this.element);
				continue;
			}
			const views = document.querySelectorAll(
				`[${__app_settings.a_view}*="{${dispatch_to}}"]`
			);
			if (views) {
				let promises_handler = [];
				for (let i = 0; i < views.length; i++) {
					const view = views[i];
					promises_handler.push(async () => {
						await Views.set_element_loading(view);
						await this.handle_view(view);
						await Views.set_element_loading(view, false);
					});
				}
				await Promise.all(promises_handler.map(async (view_) => await view_())).catch(
					(error) => {
						console.error(error);
					}
				);
			}
		}
	};
	/**
	 * @private
	 * @param {HTMLElement|Element} element
	 */
	handle_view = async (element) => {
		if (!element.parentNode) {
			return;
		}
		const response = await _Fetcher.element_fetch(element);
		if (typeof response === 'string') {
			element.outerHTML = response;
			__AppSettings.__.notify_load(element, 'before');
		}
	};
}
