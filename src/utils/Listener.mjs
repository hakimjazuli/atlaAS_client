// @ts-check

import { __QueueDispatches } from '../Queue/__QueueDispatches.mjs';
import { __RouteChangeHandler } from '../renderer/__RouteChangeHandler.mjs';
import { __AppSettings } from '../vars/__AppSettings.mjs';
import { _$ } from '@html_first/element_modifier';
import { __AOnLoadings } from './__AOnLoadings.mjs';

export class Listener {
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
	 * @param {()=>void} listener
	 */
	static assign_event = (element, listener) => {
		const __app_settings = __AppSettings.__;
		const a_trigger =
			element.getAttribute(__app_settings.a_trigger) ?? Listener.default_trigger(element);
		if (a_trigger === __app_settings.lazy_trigger) {
			new _$(element).attributes({ [__app_settings.lazy_identifier]: true });
		}
		Listener.handle_trigger(element, a_trigger, listener);
	};
	/**
	 * @private
	 * @param {HTMLElement|Element} element
	 * @param {string} a_trigger
	 * @param {()=>void} listener
	 */
	static handle_trigger = (element, a_trigger, listener) => {
		if (!element.parentElement) {
			return;
		}
		switch (a_trigger) {
			case __AppSettings.__.lazy_trigger:
				const observer = new IntersectionObserver((entries) => {
					entries.forEach(async (entry) => {
						if (entry.isIntersecting) {
							listener();
							observer.unobserve(element);
						}
					});
				});
				observer.observe(element);
				const mutation_observer = new MutationObserver(() => {
					observer.disconnect();
					mutation_observer.disconnect();
				});
				mutation_observer.observe(element.parentElement, { childList: true });
				break;
			case 'click':
			case 'submit':
			default:
				element.addEventListener(a_trigger, listener);
				new MutationObserver(() => {
					if (element.parentNode === null) {
						element.removeEventListener(a_trigger, listener);
					}
				});
				break;
		}
	};
	/** @public */
	static popstate_listener = () => {
		window.addEventListener('popstate', (event) => __QueueDispatches.__.assign_to_queue(event));
	};
	/** @public */
	static set_main_listeners = () => {
		Listener.anchor_listener();
		Listener.form_listener();
		Listener.register_events();
		if (__AppSettings.__.first_hydration) {
			__AppSettings.__.first_hydration = false;
		}
	};
	/** @private */
	static anchor_listener = () => {
		let anchor_tag;
		while ((anchor_tag = document.querySelector('a[href]'))) {
			Listener.set_defaults(anchor_tag);
			new _$(anchor_tag).attributes({ href: false });
		}
	};
	/** @private */
	static form_listener = () => {
		let form_tag;
		while ((form_tag = document.querySelector('form[action]'))) {
			const set_form_tag_attrs = new _$(form_tag);
			set_form_tag_attrs.attributes({
				onsubmit: 'event.preventDefault();',
			});
			Listener.set_defaults(form_tag);
			set_form_tag_attrs.attributes({ action: false });
		}
	};
	/** @private */
	static register_events = () => {
		const a_trigger = __AppSettings.__.a_trigger;
		let element_with_a_trigger;
		while (
			(element_with_a_trigger = document.querySelector(`[${__AppSettings.__.a_trigger}]`))
		) {
			const element = element_with_a_trigger;
			Listener.assign_event(element_with_a_trigger, () => {
				__QueueDispatches.__.assign_to_queue(element);
			});
			new _$(element_with_a_trigger).attributes({ [a_trigger]: false });
			__AppSettings.__.notify_load(element, 'after');
		}
	};
	/**
	 * @private
	 * @param {Element|HTMLElement} element
	 */
	static set_defaults = (element) => {
		const a_trigger = __AppSettings.__.a_trigger;
		const a_method = __AppSettings.__.a_method;
		const a_dispatches = __AppSettings.__.a_dispatches;
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
			custom_attribute[a_dispatches] = `${__AppSettings.__.dispatches_default};`;
		}
		if (!element.hasAttribute(a_trigger)) {
			custom_attribute[a_trigger] = Listener.default_trigger(element);
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
