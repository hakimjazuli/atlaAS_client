// @ts-check
import { _AjaxRenderer } from '../renderer/_AjaxRenderer.mjs';

export class __QueueDispatches {
	/** @type {__QueueDispatches} */
	static __;
	/**
	 * @private
	 * @type {Array<HTMLElement>}
	 */
	queue = [];
	constructor() {
		__QueueDispatches.__ = this;
	}
	/**
	 * Description
	 * @param {HTMLElement} element
	 * @returns {void}
	 */
	assign_to_queue = (element) => {
		/** might need to be throttled */
		this.queue.push(element);
		if (!this.is_running) {
			this.run_queue();
		}
	};
	is_running = false;
	run_queue = async () => {
		while (this.queue[0]) {
			new _AjaxRenderer(this.queue[0]).run();
		}
		this.is_running = true;
	};
}
