// @ts-check

import { __atlaAS_client } from '../__atlaAS_client.mjs';
import { __RouteChangeHandler } from '../renderer/__RouteChangeHandler.mjs';
import { _Functions } from '../utils/_Functions.mjs';
import { __AppSettings } from '../vars/__AppSettings.mjs';

export class __QueueDispatches {
	/**
	 * @private
	 * @type {__QueueDispatches}
	 */
	static __;
	constructor() {
		__QueueDispatches.__ = this;
	}

	/**
	 * @public
	 * @param {HTMLElement|Element|Event} element
	 * @returns {void}
	 */
	static assign_to_queue = (element) => {
		__QueueDispatches.queue_push(element);
		if (!__QueueDispatches.is_running) {
			__QueueDispatches.run_queue();
		}
	};
	/**
	 * @private
	 * @type {[string,HTMLElement|Element|Event][]}
	 */
	static queue = [];
	/**
	 * @public
	 * @param {HTMLElement|Element|Event} element
	static  */
	static dispatches_value = (element) => {
		const __app_settings = __AppSettings.__;
		if (element instanceof Event) {
			return __app_settings.route_change_identifier;
		}
		return (
			element.getAttribute(__app_settings.a_dispatches) ??
			`${__app_settings.dispatches_default};`
		);
	};
	/**
	 * @private
	 * @param {HTMLElement|Element|Event} element
	 */
	static queue_push = (element) => {
		const element_dispatch = __QueueDispatches.dispatches_value(element);
		if (
			__QueueDispatches.queue.length > 0 &&
			element_dispatch === __QueueDispatches.queue[__QueueDispatches.queue.length - 1][0]
		) {
			return;
		}
		__QueueDispatches.queue.push([element_dispatch, element]);
	};
	/** @private */
	static is_running = false;
	/** @private */
	static run_queue = async () => {
		__QueueDispatches.is_running = true;
		const __app_settings = __AppSettings.__;
		while (__QueueDispatches.queue[0]) {
			const [current_dispatch, current_element] = __QueueDispatches.queue[0];
			__QueueDispatches.queue.shift();
			const handler__ = async () => {
				if (current_element instanceof Event) {
					document.body.setAttribute(__app_settings.a_loading, '');
					await __RouteChangeHandler.__.pop_state_handle(current_element);
					return;
				}
				current_element.setAttribute(__app_settings.a_loading, '');
				const renderer = new __atlaAS_client.__._ajax_renderer(
					current_dispatch,
					current_element
				);
				await renderer.render();
				current_element.removeAttribute(__app_settings.a_loading);
			};
			if (!(current_element instanceof Event)) {
				const debounce_ms = Number(
					current_element.getAttribute(__app_settings.a_debounce) ??
						__app_settings.debounce_default
				).valueOf();
				if (debounce_ms !== 0) {
					await _Functions.timeout(debounce_ms);
				}
				await handler__();
			}
		}
		__QueueDispatches.is_running = false;
	};
}
