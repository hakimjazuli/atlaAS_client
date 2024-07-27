// @ts-check

import { Views } from '../utils/Views.mjs';
import { _$ } from '@html_first/element_modifier';
import { __AppSettings } from '../vars/__AppSettings.mjs';
import { _Fetcher } from './_Fetcher.mjs';
import { __RouteChangeHandler } from './__RouteChangeHandler.mjs';
import { __AOnRaw } from '../utils/__AOnRaw.mjs';

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
		switch (controls[0]) {
			case __app_settings.controllers_default:
				await this.handle_view(this.element);
				return;
			case __app_settings.raw_controller:
				const res = await fetch(
					this.element.getAttribute(__app_settings.a_request_path) ?? ''
				);
				let method_;
				if (controls[1] in __AOnRaw.__) {
					method_ = __AOnRaw.__[controls[1]];
				} else if (
					window[__app_settings.raw_identifier] &&
					controls[1] in window[__app_settings.raw_identifier]
				) {
					method_ = window[__app_settings.raw_identifier][controls[1]];
				}
				if (method_) {
					await method_(await res.text(), new _$(this.element));
				}
				return;
		}
		for (let i = 0; i < controls.length; i++) {
			const control_ = controls[i];
			if (control_ === '') {
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
		const set_attr = new _$(view_);
		Views.set_element_loading(set_attr);
		await Views.handle_on_loadings(view_);
		const response = await _Fetcher.element_fetch(view_, true);
		if (typeof response === 'string') {
			new _$(view_).outerHTML(response);
			__AppSettings.__.notify_load(view_, 'before');
		} else {
			this.render_failed_fetch(view_);
		}
		Views.set_element_loading(set_attr, false);
	};
	/**
	 * @private
	 * @param {HTMLElement|Element} view_element
	 */
	render_failed_fetch = async (view_element) => {
		const __app_settings = __AppSettings.__;
		new _$(view_element)
			.attributes({ [__app_settings.a_failed_attr]: true })
			.innerText(
				view_element.getAttribute(__app_settings.a_failed_text) ??
					__app_settings.a_failed_text_default
			);
	};
}
