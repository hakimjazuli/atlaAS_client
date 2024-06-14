// @ts-check

export class __AppSettings {
	/**
	 * @type {__AppSettings}
	 */
	static __;
	constructor() {
		__AppSettings.__ = this;
	}

	is_first_hydration = true;

	/**
	 * @type {string[]}
	 */
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
	 * - confirmation befor triggering atlaAS request;
	 */
	a_confirm = 'a-confirm';
	/**
	 * for controllers
	 * @type {string}
	 */
	trigger_default = 'click';
	/**
	 * for controllers
	 * @type {string}
	 * - a-trigger value for lazy;
	 */
	lazy_trigger = 'lazy';
	/**
	 * for controllers
	 * @type {string}
	 * - automatically generated to identify lazy trigger;
	 */
	lazy_identifier = 'a-lazy';

	/**
	 * for statuses
	 * @type {string}
	 * - automatically generated during request initialization, until request finished;
	 */
	a_loading = 'a-loading';

	/**
	 * for views
	 * @type {string}
	 * - request end point;
	 * - use enclose string with curly braces to be replaced with a-val name value;
	 */
	a_request_path = 'a-path';
	/**
	 * for views
	 * @type {string}
	 */
	a_view = 'a-view';
	/**
	 * for views
	 * @type {string} :  on ms
	 * upon reaching the timeout it will cancel atlaAS request;
	 */
	a_timeout = 'a-timeout';
	/**
	 * for views
	 * @type {string}
	 */
	a_method = 'a-method';
	/**
	 * for anchor tag
	 * @type {string}
	 * - turn anchor tag to partial requester;
	 */
	a_partial = 'a-';
	/**
	 * for views
	 * @type {string}
	 */
	method_default = 'get';
	/**
	 * for views
	 * @type {string}
	 * - temporary text when request is failed;
	 */
	a_failed_text = 'a-failed_text';
	/**
	 * for views
	 * @type {string}
	 */
	a_failed_text_default = 'fetch failed';
	/**
	 * for views automatic attribute
	 * @type {string}
	 */
	a_failed_attr = 'a-failed';

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
	 * @type {string}
	 * detect input element value to be used as on call a-path value;
	 */
	a_value_lookup = 'a-val';

	/**
	 * element to keep during route change
	 * @type {string}
	 */
	a_keep = 'a-keep';

	/**
	 * @type {string}
	 * - custom event upon render;
	 */
	load_identifier = 'a:load';
	/**
	 * @type {string}
	 * - custom event upon raw request on a-controller;
	 * - event id for element manipulation when using raw controller;
	 */
	raw_identifier = 'a-raw';
	/**
	 * @type {string}
	 * - custom event upon raw request on a-controller;
	 */
	raw_controller = 'raw';

	route_change_identifier = 'a:route_changes';
	route_change_id = 'a-route_change_indicator';

	client_reroute_key = 'reroute';

	csrf_starts_with = 'csrf_';

	atlaAS_client_request_header = 'atlaAS-client-from';

	/**
	 * event id for element manipulation when loading;
	 */
	a_on_loading_attributes = 'a-on_loading';

	/**
	 * @param {HTMLAnchorElement|HTMLFormElement|HTMLElement|Element|Document} affected_node
	 * @param {'before'|'after'} mode
	 */
	notify_load = (affected_node, mode) => {
		window.dispatchEvent(
			new CustomEvent(this.load_identifier, {
				detail: { affected_node, mode, is_first_hydration: this.is_first_hydration },
			})
		);
	};
}
