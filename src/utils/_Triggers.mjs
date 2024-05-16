// @ts-check
/**
 * @callback _Triggers_method
 * @param {HTMLElement|Element} element
 * @param {()=>void} view_event
 * @param {...string} a_trigger
 */

import { _Functions } from './_Functions.mjs';

export class _Triggers {
	/**
	 * @type {_Triggers_method}
	 */
	static lazy = (element, view_event) => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(async (entry) => {
				if (entry.isIntersecting) {
					view_event();
					observer.unobserve(element);
				}
			});
		});
		observer.observe(element);
		const mutation_observer = new MutationObserver(() => {
			observer.disconnect();
			mutation_observer.disconnect();
		});
		// @ts-ignore
		mutation_observer.observe(element.parentElement, { childList: true });
	};
	/**
	 * @type {_Triggers_method}
	 * set times to minus to never stop util element no longer connected;
	 */
	static tick = (element, view_event, ...a_trigger) => {
		let [timeout_ms, times] = a_trigger;
		// @ts-ignore
		times = Number(timeout_ms).valueOf() ?? 1;
		// @ts-ignore
		while (times !== 0 && element.isConnected) {
			setTimeout(view_event, Number(timeout_ms).valueOf());
			// @ts-ignore
			if (times > 0) {
				// @ts-ignore
				times--;
			}
		}
	};
	/**
	 * @type {_Triggers_method}
	 */
	static default = (element, view_event, ...a_trigger) => {
		element.addEventListener(a_trigger[0], view_event);
		new MutationObserver(() => {
			if (element.parentNode === null) {
				element.removeEventListener(a_trigger[0], view_event);
			}
		});
	};
}
