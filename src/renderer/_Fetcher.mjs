// @ts-check

import { _Functions } from '../utils/_Functions.mjs';
import { __AppSettings } from '../vars/__AppSettings.mjs';
import { __RouteChangeHandler } from './__RouteChangeHandler.mjs';

export class _Fetcher {
	/**
	 * @public
	 * @param {HTMLElement|Element|HTMLFormElement} element
	 * @returns {Promise<string|false>}
	 */
	static element_fetch = async (element) => {
		try {
			const __app_settings = __AppSettings.__;
			const method = element.getAttribute(__app_settings.a_method)?.toUpperCase();
			const request_path = element.getAttribute(__app_settings.a_request_path) ?? '';
			let form;
			let options = {};
			if (method !== 'GET') {
				if (element instanceof HTMLFormElement) {
					form = new FormData(element);
				} else {
					form = new FormData();
				}
				if (
					element.hasAttribute(__app_settings.a_token_name) &&
					element.hasAttribute(__app_settings.a_token_value)
				) {
					const token_name = element.getAttribute(__app_settings.a_token_name) ?? '';
					const token_val = element.getAttribute(__app_settings.a_token_value) ?? '';
					form.append(`${__app_settings.csrf_starts_with}${token_name}`, token_val);
				}
				options.body = form;
			}
			return await _Fetcher.base_fetch(request_path, options);
		} catch (error) {
			console.error('Fetch error:', error);
			return 'error';
		}
	};
	/**
	 * @public
	 * @param {string} url
	 * @param {Object} options
	 * @param {null|HTMLElement|Element|HTMLFormElement} element
	 * @param {string} method
	 * @returns {Promise<string|false>}
	 */
	static base_fetch = async (url, options = {}, element = null, method = 'get') => {
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
		if (query_param.size) {
			history.pushState({}, '', `${url.split('?')[0]}?${query_param.toString()}`);
		}
		const response = await fetch(url, options);
		if (!response.ok) {
			console.log(
				new Error(
					JSON.stringify({
						status: 'response is not ok',
						response,
						request_path: url,
						element,
						method,
					})
				)
			);
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
