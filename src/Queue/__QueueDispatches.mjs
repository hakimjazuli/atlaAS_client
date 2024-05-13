// @ts-check

import { __atlaAS_client } from '../__atlaAS_client.mjs';
import { __RouteChangeHandler } from '../renderer/__RouteChangeHandler.mjs';
import { Listener } from '../utils/Listener.mjs';
import { _Functions } from '../utils/_Functions.mjs';
import { __AppSettings } from '../vars/__AppSettings.mjs';

export class __QueueDispatches {
	/** @type {__QueueDispatches} */
	static __;
	constructor() {
		__QueueDispatches.__ = this;
	}

	/**
	 * @public
	 * @param {HTMLElement|Element|Event} element
	 * @returns {void}
	 */
	assign_to_queue = (element) => {
		this.queue_push(element);
		if (!this.is_running) {
			this.run_queue();
		}
	};
	/**
	 * @private
	 * @type {[string,HTMLElement|Element|Event][]}
	 */
	queue = [];
	/**
	 * @public
	 * @param {HTMLElement|Element|Event} element
	 */
	dispatches_value = (element) => {
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
	 * @param {HTMLElement|Element|Event} target
	 */
	queue_push = (target) => {
		const element_dispatch = this.dispatches_value(target);
		if (this.queue.length > 0 && element_dispatch === this.queue[this.queue.length - 1][0]) {
			return;
		}
		this.queue.push([element_dispatch, target]);
	};
	/** @private */
	is_running = false;
	/** @private */
	run_queue = async () => {
		this.is_running = true;
		const __app_settings = __AppSettings.__;
		while (this.queue[0]) {
			const [current_dispatch, current_element] = this.queue[0];
			this.queue.shift();
			if (!(current_element instanceof Event)) {
				const debounce_ms = Number(
					current_element.getAttribute(__app_settings.a_debounce) ??
						__app_settings.debounce_default
				).valueOf();
				if (debounce_ms !== 0) {
					await _Functions.timeout(debounce_ms);
				}
			}
			await this.queue_callback(current_element, current_dispatch);
		}
		this.is_running = false;
	};
	/**
	 * @private
	 * @param {HTMLElement|Element|Event} current_element
	 * @param {string} current_dispatch
	 */
	queue_callback = async (current_element, current_dispatch) => {
		const __app_settings = __AppSettings.__;
		if (current_element instanceof Event) {
			await __RouteChangeHandler.__.pop_state_handle(current_element);
			return;
		}
		if (!current_element.hasAttribute(__app_settings.lazy_identifier)) {
			Listener.set_element_loading(current_element);
			const renderer = new __atlaAS_client.__._ajax_renderer(
				current_dispatch,
				current_element
			);
			await renderer.render();
			Listener.set_element_loading(current_element, false);
			return;
		}
		const lazy_elements_on_screen = Array.from(
			document.querySelectorAll(`[${__app_settings.lazy_identifier}]`)
		).filter((element) => _Functions.is_visible(element));
		if (!lazy_elements_on_screen.length) {
			return;
		}
		let fetch_updates = [];
		for (let i = 0; i < lazy_elements_on_screen.length; i++) {
			const element = lazy_elements_on_screen[i];
			fetch_updates.push(async () => {
				Listener.set_element_loading(element);
				const renderer = new __atlaAS_client.__._ajax_renderer(
					element.getAttribute(__app_settings.a_dispatches) ?? '',
					element
				);
				await renderer.render();
				Listener.set_element_loading(element, false);
			});
		}
		await Promise.all(fetch_updates.map(async (fn) => await fn())).catch((error) => {
			console.error(error);
		});
	};
}
