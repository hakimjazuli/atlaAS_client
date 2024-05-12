// @ts-check

import { __QueueDispatches } from '../Queue/__QueueDispatches.mjs';
import { __RouteChangeHandler } from '../renderer/__RouteChangeHandler.mjs';
import { __AppSettings } from '../vars/__AppSettings.mjs';
import { _$ } from './_$.mjs';

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
			element.setAttribute(__app_settings.lazy_identifier, '');
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
			anchor_tag.removeAttribute('href');
		}
	};
	/** @private */
	static form_listener = () => {
		let form_tag;
		while ((form_tag = document.querySelector('form[action]'))) {
			form_tag.setAttribute('onsubmit', 'event.preventDefault();');
			Listener.set_defaults(form_tag);
			form_tag.removeAttribute('action');
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
			element_with_a_trigger.removeAttribute(a_trigger);
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
		const set_attr = new _$(element);
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
		set_attr.attributes(custom_attribute);
	};
}
