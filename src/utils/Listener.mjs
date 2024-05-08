// @ts-check

import { __AppSettings } from '../vars/__AppSettings.mjs';

export class Listener {
	/**
	 * Description
	 * @param {HTMLElement} element
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
	 * @param {HTMLElement} element
	 * @param {()=>any} listener
	 */
	static assign_event = (element, listener) => {
		const a_trigger =
			element.getAttribute(__AppSettings.__.a_trigger) ?? Listener.default_trigger(element);
		Listener.handle_trigger(element, a_trigger, listener);
		new MutationObserver(() => {
			if (element.parentNode === null) {
				element.removeEventListener(a_trigger, listener);
			}
		});
	};
	/**
	 * @private
	 * @param {HTMLElement} element
	 * @param {string} a_trigger
	 * @param {()=>any} listener
	 */
	static handle_trigger = (element, a_trigger, listener) => {
		if (!element.parentElement) {
			return;
		}
		switch (a_trigger) {
			case 'lazy':
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
				break;
		}
	};
	/** @public */
	static set_main_listener = () => {
		Listener.anchor_listener();
		Listener.form_listener();
	};
	/** @private */
	static anchor_listener = () => {
		const anchor_tags = document.querySelectorAll('a[href]');
		if (anchor_tags) {
			for (let i = 0; i < anchor_tags.length; i++) {
				const anchor_tag = anchor_tags[i];
				anchor_tag.setAttribute(
					__AppSettings.__.a_request_path,
					anchor_tag.getAttribute('href') ?? ''
				);
				anchor_tag.removeAttribute('href');
			}
		}
	};
	/** @private */
	static form_listener = () => {
		const form_tags = document.querySelectorAll('form[action]');
		if (form_tags) {
			for (let i = 0; i < form_tags.length; i++) {
				const form_tag = form_tags[i];
				form_tag.setAttribute(
					__AppSettings.__.a_request_path,
					form_tag.getAttribute('action') ?? ''
				);
				form_tag.setAttribute('onsubmit', 'event.preventDefault();');
				let method;
				if ((method = form_tag.getAttribute('method') ?? __AppSettings.__.method_default)) {
					form_tag.removeAttribute('method');
					form_tag.setAttribute(__AppSettings.__.a_method, method);
				}
				form_tag.removeAttribute('action');
			}
		}
	};
}
