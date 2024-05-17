// @ts-check

import { _AsyncCounter } from '../queue/_AsyncCounter.mjs';

/**
 * @callback _view_event_callback
 * @param {Event|null} [event]
 * @param {number} [stop_count]
 */

/**
 * @callback _Triggers_method
 * @param {HTMLElement|Element} control_element
 * @param {_view_event_callback} view_event
 * @param {...(string)} a_trigger
 */

export class _Triggers {
	/**
	 * @type {_Triggers_method}
	 */
	static lazy_tick = (control_element, view_event, ...triggers) => {
		const event = () => _Triggers.tick(control_element, view_event, ...triggers);
		_Triggers.lazy(control_element, event);
	};
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
		let [waiting_period, times] = a_trigger;
		let times_ = Number(times) ?? 1;
		const interval = setInterval(() => {
			const async_counter = view_event(null, times_);
			if (async_counter.count == times_ || !control_element.parentElement) {
				clearInterval(interval);
			}
		}, new Number(waiting_period).valueOf());
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
