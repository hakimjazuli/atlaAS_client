// @ts-check

/** @typedef {import('./_QueueObject.mjs')._QueueObject} _QueueObject */

export class __Queue {
	/** @type {__Queue} */
	static __;
	constructor() {
		__Queue.__ = this;
	}

	/**
	 * @private
	 * @type {Object.<string,{callback:()=>(any|Promise<any>),debounce:(number|false)}>}
	 */
	queue = {};
	/**
	 * @private
	 * @type {boolean}
	 */
	is_running = false;
	/**
	 * @public
	 * @param {_QueueObject} _queue
	 */
	assign = (_queue) => {
		this.push(_queue);
		if (!this.is_running) {
			this.run();
		}
	};
	/**
	 * @private
	 * @param {_QueueObject} _queue
	 */
	push = (_queue) => {
		const { callback, debounce } = _queue;
		this.queue[_queue.id] = { callback, debounce };
	};
	/**
	 * @private
	 * @param {number} ms
	 */
	timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	/**
	 * @private
	 * @param {CallableFunction} callback
	 */
	is_async = (callback) => callback.constructor.name === 'AsyncFunction';
	/** @private */
	run = async () => {
		this.is_running = true;
		while (Object.keys(this.queue).length !== 0) {
			for (const current_key in this.queue) {
				const { callback, debounce } = this.queue[current_key];
				delete this.queue[current_key];
				if (debounce) {
					await this.timeout(debounce);
				}
				if (this.is_async(callback)) {
					await callback();
					continue;
				}
				callback();
				break;
			}
		}
		this.is_running = false;
	};
}
