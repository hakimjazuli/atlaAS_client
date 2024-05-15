// @ts-check

export class __AppSettings {
	/** @type {__AppSettings} */
	static __;
	constructor() {
		__AppSettings.__ = this;
	}

	/** @public */
	first_hydration = true;

	/** @type {string[]} */
	separator = [';'];
	/**
	 * for controllers
	 * @type {string}
	 */
	a_controller = 'a-controller';
	/**
	 * for controllers
	 * @type {string}
	 */
	a_debounce = 'a-debounce';
	/**
	 * @type {string}
	 */
	debounce_default = '0';
	/**
	 * for controllers
	 * @type {string}
	 */
	controllers_default = 'self';
	/**
	 * for controllers
	 * @type {string}
	 */
	a_trigger = 'a-trigger';
	/**
	 * for controllers
	 * @type {string}
	 */
	trigger_default = 'click';
	/**
	 * for controllers
	 * @type {string}
	 */
	lazy_trigger = 'lazy';
	/**
	 * for controllers
	 * @type {string}
	 */
	lazy_identifier = 'a-lazy';

	/**
	 * for statuses
	 * @type {string}
	 */
	a_loading = 'a-loading';

	/**
	 * for views
	 * @type {string}
	 */
	a_request_path = 'a-path';
	/**
	 * for views
	 * @type {string}
	 */
	a_view = 'a-view';
	/**
	 * for views
	 * @type {string}
	 */
	a_method = 'a-method';
	/**
	 * for anchor tag
	 * @type {string}
	 */
	a_partial = 'a-';
	/**
	 * for views
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

	load_identifier = 'a:load';
	route_change_identifier = 'a:route_changes';
	route_change_id = 'a-route_change_indicator';

	client_reroute_key = 'reroute';

	atlaAS_client_request_header = 'atlaAS-client-from';

	/**
	 * for element manipulation when loading
	 */
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
