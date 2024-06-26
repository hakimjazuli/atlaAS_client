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
import { _AsyncCounter } from '../queue/_AsyncCounter.mjs';

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
	 * @param {()=>_AsyncCounter} view_event
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
	 * @param {HTMLElement|Element} controll_element
	 * @param {string[]} a_trigger
	 * @param {()=>_AsyncCounter} view_event
	 */
	static handle_trigger = (controll_element, a_trigger, view_event) => {
		if (!controll_element.parentElement) {
			return;
		}
		const trigger_mode = a_trigger[0];
		const _trigger = __atlaAS_client.__._triggers;
		if (trigger_mode in _trigger) {
			a_trigger.shift();
			_trigger[trigger_mode](controll_element, view_event, ...a_trigger);
		} else {
			_trigger.default(controll_element, view_event, ...a_trigger);
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
		if (__AppSettings.__.is_first_hydration) {
			__AppSettings.__.is_first_hydration = false;
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
			const async_counter = new _AsyncCounter();
			Views.assign_event(
				element,
				/** @type {import('./_Triggers.mjs')._view_event_callback} */
				(
					event = null,
					stop_at = -1 /** so function can be called as many time, by default */
				) => {
					__Queue.__.assign(
						new _QueueObject(
							controll_attr,
							async () => {
								if (async_counter.count == stop_at) {
									return;
								}
								await Controller.logic(element, controll_attr);
								/** no point to increment, if the function can be called indefitely  */
								if (stop_at >= 0) {
									async_counter.count++;
								}
							},
							Number(debounce).valueOf()
						)
					);
					return async_counter;
				}
			);
			new _$(element_with_a_trigger).attributes({ [a_trigger]: false });
			__app_settings.notify_load(element_with_a_trigger, 'after');
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
		}
		if (element instanceof HTMLFormElement) {
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
	 */
	static handle_on_loadings = async (target) => {
		if (!target) {
			return;
		}
		const a_on_loading_attributes = __AppSettings.__.a_on_loading_attributes;
		if (target.hasAttribute(a_on_loading_attributes)) {
			await this.handle_on_loading_single(target);
		}
		let element;
		while ((element = target.querySelector(`[${a_on_loading_attributes}]`))) {
			await this.handle_on_loading_single(element);
		}
	};
	/**
	 * @private
	 * @param {HTMLElement|Element} target
	 */
	static handle_on_loading_single = async (target) => {
		const a_on_loading_attributes = __AppSettings.__.a_on_loading_attributes;
		const set_target_attr = new _$(target);
		const method = target.getAttribute(a_on_loading_attributes) ?? '';
		const method_ = __AOnLoadings.__[method] ?? window[a_on_loading_attributes][method];
		if (method_) {
			await method_(set_target_attr);
		}
	};
	/**
	 * @param {_$} set_attribute
	 * @param {boolean} loading
	 * @returns {any}
	 */
	static set_element_loading = (set_attribute, loading = true) => {
		if (loading) {
			set_attribute.attributes({
				[__AppSettings.__.a_loading]: true,
			});
			return;
		}
		set_attribute.attributes({
			[__AppSettings.__.a_loading]: false,
		});
	};
}
