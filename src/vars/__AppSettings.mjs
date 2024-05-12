// @ts-check

export class __AppSettings {
	/** @type {__AppSettings} */
	static __;
	constructor() {
		__AppSettings.__ = this;
	}
	/**
	 * absolute selector
	 * @param {Element} element
	 * @returns {()=>(Element|null)}
	 */
	get_element = (element) => {
		return () =>
			document.querySelector(
				`[${this.a_request_path}="${element.getAttribute(this.a_request_path)}"]`
			);
	};
	/** @public */
	first_hydration = true;

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
	a_debounce = 'a-debounce';
	/**
	 * @type {string}
	 */
	debounce_default = '0';
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
	 * for dispatchers
	 * @type {string}
	 */
	lazy_trigger = 'lazy';
	/**
	 * for dispatchers
	 * @type {string}
	 */
	lazy_identifier = 'a-lazy';

	/**
	 * for dispatchers and listeners
	 * @type {string}
	 */
	a_loading = 'a-loading';

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

	/**
	 * element to keep during route change
	 * @type {string}
	 */
	a_keep = 'a-keep';

	/**
	 * indicator_element that are only visible when is loading
	 * @type {string}
	 */
	a_indicator = 'a-indicator';

	load_identifier = 'a:load';
	route_change_identifier = 'a:route_changes';
	route_change_id = 'a-route_change_indicator';

	client_reroute_key = 'reroute';

	atlaAS_client_request_header = 'atlaAS-client-from';

	/**
	 * for element manipulation when
	 */
	a_on_loaded_attributes = 'a-on_loaded';
	a_on_loading_attributes = 'a-on_loading';

	/**
	 * Description
	 * @param {HTMLAnchorElement|HTMLFormElement|HTMLElement|Element|Document} affected_node
	 * @param {'before'|'after'} mode
	 */
	notify_load = (affected_node, mode) => {
		window.dispatchEvent(
			new CustomEvent(this.load_identifier, {
				detail: { affected_node, mode, first_hydration: this.first_hydration },
			})
		);
	};
}
