// @ts-check

import { __RouteChangeHandler } from '../renderer/__RouteChangeHandler.mjs';
import { __AppSettings } from '../vars/__AppSettings.mjs';
import { _$ } from '@html_first/element_modifier';
import { __AOnLoadings } from './__AOnLoadings.mjs';
import { __Queue } from '../queue/__Queue.mjs';
import { _QueueObject } from '@html_first/simple_queue';
import { __atlaAS_client } from '../__atlaAS_client.mjs';
import { _Functions } from './_Functions.mjs';
import { Controller } from './Controller.mjs';
import { _Triggers } from './_Triggers.mjs';

export class Views {
	/**
	 * @public
	 * @param {HTMLElement|Element} element
	 * @returns {string}
	 */
	static default_trigger = (element) => {
		if (element instanceof HTMLAnchorElement) {
			return 'click';
		} else if (element instanceof HTMLFormElement) {
			return 'submit';
		}
		return __AppSettings.__.trigger_default;
	};
	/**
	 * @private
	 * @param {HTMLElement|Element} element
	 * @param {()=>void} view_event
	 */
	static assign_event = (element, view_event) => {
		const __app_settings = __AppSettings.__;
		const a_trigger = (
			element.getAttribute(__app_settings.a_trigger) ?? Views.default_trigger(element)
		).split(__app_settings.separator[0]);
		if (a_trigger[0] === __app_settings.lazy_trigger) {
			new _$(element).attributes({ [__app_settings.lazy_identifier]: true });
		}
		Views.handle_trigger(element, a_trigger, view_event);
	};
	/**
	 * @private
	 * @param {HTMLElement|Element} element
	 * @param {()=>void} view_event
	 */
	static handle_trigger = (element, a_trigger, view_event) => {
		if (!element.parentElement) {
			return;
		}
		const trigger_mode = a_trigger[0];
		a_trigger.shift();
		if (trigger_mode in _Triggers) {
			_Triggers[trigger_mode](element, view_event, ...a_trigger);
		} else {
			_Triggers.default(element, view_event, ...a_trigger);
		}
	};
	/** @public */
	static popstate_listener = () => {
		window.addEventListener('popstate', (event) =>
			__Queue.__.assign(
				new _QueueObject(__AppSettings.__.route_change_identifier, async () => {
					await __RouteChangeHandler.__.pop_state_handle(event);
				})
			)
		);
	};
	/** @public */
	static set_main_listeners = () => {
		Views.anchor_view();
		Views.form_view();
		Views.register_events();
		if (__AppSettings.__.first_hydration) {
			__AppSettings.__.first_hydration = false;
		}
	};
	/** @private */
	static anchor_view = () => {
		let anchor_tag;
		while ((anchor_tag = document.querySelector('a[href]'))) {
			Views.set_defaults(anchor_tag);
			new _$(anchor_tag).attributes({ href: false });
		}
	};
	/** @private */
	static form_view = () => {
		let form_tag;
		while ((form_tag = document.querySelector('form[action]'))) {
			const set_form_tag_attrs = new _$(form_tag);
			set_form_tag_attrs.attributes({
				onsubmit: 'event.preventDefault();',
			});
			Views.set_defaults(form_tag);
			set_form_tag_attrs.attributes({ action: false });
		}
	};
	/** @private */
	static register_events = () => {
		const __app_settings = __AppSettings.__;
		const a_trigger = __app_settings.a_trigger;
		let element_with_a_trigger;
		while ((element_with_a_trigger = document.querySelector(`[${__app_settings.a_trigger}]`))) {
			const element = element_with_a_trigger;
			const controll_attr =
				element.getAttribute(__app_settings.a_controller) ??
				__app_settings.controllers_default;
			const debounce =
				element.getAttribute(__app_settings.a_debounce) ?? __app_settings.debounce_default;
			Views.assign_event(element, () => {
				__Queue.__.assign(
					new _QueueObject(
						controll_attr,
						async () => await Controller.logic(element, controll_attr),
						Number(debounce).valueOf()
					)
				);
			});
			new _$(element_with_a_trigger).attributes({ [a_trigger]: false });
			__app_settings.notify_load(element, 'after');
		}
	};
	/**
	 * @private
	 * @param {Element|HTMLElement} element
	 */
	static set_defaults = (element) => {
		const a_trigger = __AppSettings.__.a_trigger;
		const a_method = __AppSettings.__.a_method;
		const a_dispatches = __AppSettings.__.a_controller;
		const set_element_attr = new _$(element);
		/** @type {Object.<string,string|boolean>} */
		let custom_attribute = {};
		if (element instanceof HTMLAnchorElement) {
			custom_attribute[__AppSettings.__.a_request_path] = element.getAttribute('href') ?? '';
		} else if (element instanceof HTMLFormElement) {
			custom_attribute[__AppSettings.__.a_request_path] =
				element.getAttribute('action') ?? '';
		}
		if (!element.hasAttribute(a_dispatches)) {
			custom_attribute[a_dispatches] = `${__AppSettings.__.controllers_default};`;
		}
		if (!element.hasAttribute(a_trigger)) {
			custom_attribute[a_trigger] = Views.default_trigger(element);
		}
		let method;
		if ((method = element.getAttribute('method') ?? __AppSettings.__.method_default)) {
			custom_attribute[a_method] = method;
		}
		set_element_attr.attributes(custom_attribute);
	};
	/**
	 * @param {Element|HTMLElement|Document['body']} target
	 * @param {boolean} loading_status
	 */
	static set_element_loading = async (target, loading_status = true) => {
		if (!target) {
			return;
		}
		const __app_settings = __AppSettings.__;
		if (target.hasAttribute(__app_settings.a_on_loading_attributes)) {
			await this.handle_on_loading(target, loading_status);
		}
		let element;
		while ((element = target.querySelector(`[${__app_settings.a_on_loading_attributes}]`))) {
			await this.handle_on_loading(element, loading_status);
		}
	};
	/**
	 * @private
	 * @param {HTMLElement|Element} target
	 * @param {boolean} loading_status
	 */
	static handle_on_loading = async (target, loading_status) => {
		const a_on_loading_attributes = __AppSettings.__.a_on_loading_attributes;
		const set_target_attr = new _$(target);
		if (!loading_status) {
			set_target_attr.attributes({ [a_on_loading_attributes]: false });
			return;
		}
		set_target_attr.attributes({ [a_on_loading_attributes]: true });
		const json = target.getAttribute(a_on_loading_attributes) ?? '';
		const method = __AOnLoadings.__[json];
		if (method) {
			await method(set_target_attr);
		}
	};
}
