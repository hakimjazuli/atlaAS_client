// @ts-check

import { __atlaAS_client } from '../__atlaAS_client.mjs';
import { __AppSettings } from '../vars/__AppSettings.mjs';

export class __QueueDispatches {
	/** @type {__QueueDispatches} */
	static __;
	constructor() {
		__QueueDispatches.__ = this;
	}

	/**
	 * Description
	 * @param {HTMLElement} element
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
	 * @type {[string,HTMLElement][]}
	 */
	queue = [];
	/**
	 * @public
	 * @param {HTMLElement} element
	 */
	dispatches_value = (element) => {
		return (
			element.getAttribute(__AppSettings.__.a_dispatches) ??
			__AppSettings.__.dispatches_default
		);
	};
	/**
	 * @private
	 * @param {HTMLElement} element
	 */
	queue_push = (element) => {
		const element_dispatch = this.dispatches_value(element);
		if (element_dispatch === this.queue[this.queue.length - 1][0]) {
			return;
		}
		this.queue.push([element_dispatch, element]);
	};
	/** @private */
	is_running = false;
	/** @private */
	run_queue = async () => {
		this.is_running = true;
		let current_dispatch;
		let current_element;
		while (([current_dispatch, current_element] = this.queue[0])) {
			this.queue.shift();
			const renderer = new __atlaAS_client.__._ajax_renderer(
				current_dispatch,
				current_element
			);
			await renderer.render();
		}
		this.is_running = false;
	};
}
