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
		/**
		 * no need to check, as this class instance is only parts of the eventListener
		 * check are suppossed to be done in _Triggers.mjs
		 */
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
		const controls = this.controller.split(__app_settings.separator[0]);
		for (let i = 0; i < controls.length; i++) {
			const control_ = controls[i];
			if (control_ === '') {
				continue;
			}
			if (control_ === __app_settings.controllers_default) {
				await this.handle_view(this.element);
				continue;
			}
			const views = document.querySelectorAll(`[${__app_settings.a_view}*="{${control_}}"]`);
			if (views) {
				let promises_handler = [];
				for (let j = 0; j < views.length; j++) {
					const view = views[j];
					promises_handler.push(async () => {
						await this.handle_view(view);
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
	 * @param {HTMLElement|Element} view_
	 */
	handle_view = async (view_) => {
		await Views.set_element_loading(view_);
		const response = await _Fetcher.element_fetch(view_, true);
		if (typeof response === 'string') {
			view_.outerHTML = response;
			__AppSettings.__.notify_load(view_, 'before');
		}
		await Views.set_element_loading(view_, false);
	};
}
