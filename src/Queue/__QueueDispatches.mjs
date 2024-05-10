// @ts-check

import { __atlaAS_client } from '../__atlaAS_client.mjs';
import { __RouteChangeHandler } from '../renderer/__RouteChangeHandler.mjs';
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
	 * @param {HTMLElement|Element|Event} element
	 */
	queue_push = (element) => {
		const element_dispatch = this.dispatches_value(element);
		if (this.queue.length > 0 && element_dispatch === this.queue[this.queue.length - 1][0]) {
			return;
		}
		this.queue.push([element_dispatch, element]);
	};
	/** @private */
	is_running = false;
	/** @private */
	run_queue = async () => {
		this.is_running = true;
		while (this.queue[0]) {
			const [current_dispatch, current_element] = this.queue[0];
			this.queue.shift();
			if (current_element instanceof Event) {
				__RouteChangeHandler.__.pop_state_handle(current_element);
				continue;
			}
			const renderer = new __atlaAS_client.__._ajax_renderer(
				current_dispatch,
				current_element
			);
			await renderer.render();
		}
		this.is_running = false;
	};
}
