// @ts-check
import { __atlaAS_client } from '../__atlaAS_client.mjs';
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
		this.queue.push(element);
		if (!this.is_running) {
			this.run_queue();
		}
	};
	/** @private */
	is_running = false;
	/** @private */
	run_queue = async () => {
		while (this.queue[0]) {
			new __atlaAS_client.__._ajax_renderer(this.queue[0]).render();
		}
		this.is_running = true;
	};
}
