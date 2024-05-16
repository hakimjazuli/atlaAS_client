// @ts-check
/**
 * @callback _Triggers_method
 * @param {HTMLElement|Element} control_element
 * @param {()=>void} view_event
 * @param {...(string)} a_trigger
 */

import { _Functions } from './_Functions.mjs';

export class _Triggers {
	/**
	 * @type {_Triggers_method}
	 */
	static lazy = (control_element, view_event) => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(async (entry) => {
				if (entry.isIntersecting) {
					view_event();
					observer.unobserve(control_element);
				}
			});
		});
		observer.observe(control_element);
		const mutation_observer = new MutationObserver(() => {
			observer.disconnect();
			mutation_observer.disconnect();
		});
		// @ts-ignore
		mutation_observer.observe(control_element.parentElement, { childList: true });
	};
	/**
	 * @type {_Triggers_method}
	 * set times to minus to never stop util element no longer connected;
	 */
	static tick = (control_element, view_event, ...a_trigger) => {
		let [timeout_ms, times] = a_trigger;
		let times_ = Number(times) ?? 1;
		const interval = setInterval(() => {
			view_event();
			if (times_ > 0) {
				times_--;
			}
			if (times_ == 0 || !control_element.parentElement) {
				clearInterval(interval);
			}
		}, new Number(timeout_ms).valueOf());
	};
	/**
	 * @type {_Triggers_method}
	 */
	static default = (control_element, view_event, ...a_trigger) => {
		control_element.addEventListener(a_trigger[0], view_event);
		new MutationObserver(() => {
			if (!control_element.parentElement) {
				control_element.removeEventListener(a_trigger[0], view_event);
			}
		});
	};
}
