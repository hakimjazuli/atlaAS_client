// @ts-check

export class __AppSettings {
	/** @type {__AppSettings} */
	static __;
	constructor() {
		__AppSettings.__ = this;
	}
	/**
	 * for dispatchers
	 * @type {string}
	 */
	a_dispatches = 'a-dispatch';
	/**
	 * for dispatchers
	 * @type {string}
	 */
	dispatches_default = 'self';
	/**
	 * for dispatchers
	 * @type {string}
	 */
	a_trigger = 'a-trigger';
	/**
	 * for dispatchers
	 * @type {string}
	 */
	trigger_default = 'click';

	/**
	 * for listeners
	 * @type {string}
	 */
	a_request_path = 'a-path';
	/**
	 * for listeners
	 * @type {string}
	 */
	a_listens_to = 'a-listen';
	/**
	 * for listeners
	 * @type {string}
	 */
	a_method = 'a-method';
	/**
	 * for listeners
	 * @type {string}
	 */
	method_default = 'get';
	load_identifier = 'a:load';
	notify_load = () => {
		window.dispatchEvent(new Event(this.load_identifier));
	};
}
