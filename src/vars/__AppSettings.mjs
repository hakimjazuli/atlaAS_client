// @ts-check

export class __AppSettings {
	/** @type {__AppSettings} */
	static __;
	constructor() {
		__AppSettings.__ = this;
	}
	/** @type {string[]} */
	separator = [';'];
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
	 * for anchor tag
	 * @type {string}
	 */
	a_partial = 'a-';
	/**
	 * for listeners
	 * @type {string}
	 */
	method_default = 'get';

	/**
	 * for form inputs element
	 * @type {string}
	 */
	a_token_name = 'a-token_name';
	/**
	 * for form inputs element
	 * @type {string}
	 */
	a_token_value = 'a-token_value';

	load_identifier = 'a:load';
	notify_load = () => {
		window.dispatchEvent(new Event(this.load_identifier));
	};
}
