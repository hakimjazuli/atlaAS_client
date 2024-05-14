// @ts-check

export class _QueueObject {
	/**
	 * @param {string} id
	 * @param {()=>(any|Promise<any>)} callback
	 * @param {number|false} [debounce]
	 * - in ms
	 */
	constructor(id, callback, debounce = false) {
		this.id = id;
		this.callback = callback;
		this.debounce = debounce;
	}
	/** @type {string} */
	id;
	/** @type {()=>(any|Promise<any>)} */
	callback;
	/** @type {number|false} */
	debounce;
}
