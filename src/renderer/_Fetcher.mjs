// @ts-check

import { _Functions } from '../utils/_Functions.mjs';
import { __AppSettings } from '../vars/__AppSettings.mjs';
import { __RouteChangeHandler } from './__RouteChangeHandler.mjs';

export class _Fetcher {
	/**
	 * @public
	 * @param {HTMLElement|Element|HTMLFormElement} view_element
	 * @param {boolean} query_only
	 * @returns {Promise<string|false>}
	 */
	static element_fetch = async (view_element, query_only) => {
		if (!view_element.hasAttribute(__AppSettings.__.a_timeout)) {
			return await this.element_fetch_(view_element, query_only);
		}
		return _Functions.timeout_check(
			async () => this.element_fetch_(view_element, query_only),
			Number(view_element.getAttribute(__AppSettings.__.a_timeout))
		);
	};
	/**
	 * @private
	 * @param {HTMLElement|Element|HTMLFormElement} view_element
	 * @param {boolean} query_only
	 * @returns {Promise<string|false>}
	 */
	static element_fetch_ = async (view_element, query_only) => {
		try {
			const __app_settings = __AppSettings.__;
			let method =
				view_element.getAttribute(__app_settings.a_method) ?? __app_settings.method_default;
			method = method.toUpperCase();
			const request_path = view_element.getAttribute(__app_settings.a_request_path) ?? '';
			let form;
			let options = {};
			if (method !== 'GET') {
				if (view_element instanceof HTMLFormElement) {
					form = new FormData(view_element);
				} else {
					form = new FormData();
				}
				if (
					view_element.hasAttribute(__app_settings.a_token_name) &&
					view_element.hasAttribute(__app_settings.a_token_value)
				) {
					const token_name = view_element.getAttribute(__app_settings.a_token_name) ?? '';
					const token_val = view_element.getAttribute(__app_settings.a_token_value) ?? '';
					form.append(`${__app_settings.csrf_starts_with}${token_name}`, token_val);
				}
				options.body = form;
			}
			return await _Fetcher.base_fetch(
				request_path,
				query_only ? 'query_only' : true,
				options
			);
		} catch (error) {
			console.error('Fetch error:', error);
			return 'error';
		}
	};
	/**
	 * @public
	 * @param {string} url
	 * @param {true|'query_only'|false} push_state
	 * @param {Object} [options]
	 * @param {null|HTMLElement|Element|HTMLFormElement} [element]
	 * @param {string} [method]
	//  * @returns {Promise<string|false>}
	 */
	static base_fetch = async (url, push_state, options = {}, element = null, method = 'get') => {
		const lookup_element = document.body;
		if (!lookup_element.hasAttribute(__AppSettings.__.a_timeout)) {
			return await this.base_fetch_(url, push_state, options, element, method);
		}
		return _Functions.timeout_check(
			async () => this.base_fetch_(url, push_state, options, element, method),
			Number(lookup_element.getAttribute(__AppSettings.__.a_timeout))
		);
	};
	/**
	 * @public
	 * @param {string} url
	 * @param {true|'query_only'|false} push_state
	 * @param {Object} [options]
	 * @param {null|HTMLElement|Element|HTMLFormElement} [element]
	 * @param {string} [method]
	 * @returns {Promise<string|false>}
	 */
	static base_fetch_ = async (url, push_state, options = {}, element = null, method = 'get') => {
		const __app_settings = __AppSettings.__;
		const query_param = _Functions.get_query_param(url);
		options = Object.assign(
			{
				method,
				Credential: 'includes',
				headers: {
					[__app_settings.atlaAS_client_request_header]: window.location.href,
				},
			},
			options
		);
		if (method === 'get' && 'body' in options && options.body instanceof FormData) {
			for (const query in options.body) {
				if (!query.startsWith(__app_settings.csrf_starts_with)) {
					query_param.append(query, options.body[query]);
				}
			}
		}
		switch (push_state) {
			case true:
				_Functions.push_state(
					`${url.split('?')[0]}${query_param.size ? '?' + query_param.toString() : ''}`
				);
				break;
			case 'query_only':
				_Functions.push_state(
					`${window.location.origin}${window.location.pathname}${
						query_param.size ? '?' + query_param.toString() : ''
					}`
				);
				break;
			case false:
				break;
		}
		const response = await fetch(url, options);
		if (!response.ok) {
			console.error({
				response: response,
				request_path: url,
				method,
			});
		}
		const content_type = response.headers.get('Content-Type');
		switch (content_type) {
			case 'application/json':
				const url_changed = await response.json();
				if (url_changed[__app_settings.client_reroute_key]) {
					await __RouteChangeHandler.__.handle_route_change(
						url_changed[__app_settings.client_reroute_key]
					);
				}
				return false;
			case 'text/html; charset=UTF-8':
			default:
				return await response.text();
		}
	};
}
