// @ts-check

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
					form.append(`csrf_${token_name}`, token_val);
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
		const url_ = url.split('/');
		options = Object.assign(
			{
				method,
				Credential: 'includes',
				headers: {
					[__AppSettings.__.atlaAS_client_request_header]: window.location.href,
				},
			},
			options
		);
		/** @type {string[]} */
		let query_param = [];
		if (method === 'get') {
			if (url_[1]) {
				query_param = url_[1].split('&');
			}
			if ('body' in options && 'form' in options.body && options.body instanceof FormData) {
				for (const query in options.body) {
					if (!query.startsWith('csrf_')) {
						query_param.push(options.body[query]);
					}
				}
			}
		}
		if (query_param.length != 0) {
			history.pushState({}, '', `${url_[0]}?${query_param.join('&')}`);
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
				if (url_changed[__AppSettings.__.client_reroute_key]) {
					await __RouteChangeHandler.__.handle_route_change(
						url_changed[__AppSettings.__.client_reroute_key]
					);
				}
				return false;
			case 'text/html; charset=UTF-8':
			default:
				return await response.text();
		}
	};
}
