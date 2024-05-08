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
	 * for listeners
	 * @type {string}
	 */
	a_request_path = 'a-path';
	/**
	 * for listeners
	 * @type {string}
	 */
	a_listens_to = 'a-listen';
	load_identifier = 'a:load';
	notify_load = () => {
		window.dispatchEvent(new Event(this.load_identifier));
	};
}
