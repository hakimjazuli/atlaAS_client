// @ts-check

import { __AppSettings } from '../vars/__AppSettings.mjs';
import { _Fetcher } from './_Fetcher.mjs';

export class __RouteChangeHandler {
	/** @type {__RouteChangeHandler} */
	static __;
	constructor() {
		this.url = window.location;
		__RouteChangeHandler.__ = this;
	}
	/**
	 * @public
	 * @param {HTMLAnchorElement|string} target
	 */
	handle_route_change = async (target) => {
		const __app_settings = __AppSettings.__;
		let response;
		if (target instanceof HTMLAnchorElement) {
			const path = target.getAttribute(__app_settings.a_request_path) ?? '';
			if (path.includes('#')) {
				this.handle_hash_change(path);
				return;
			}
			response = await _Fetcher.element_fetch(target);
		} else {
			if (target.includes('#')) {
				this.handle_hash_change(target);
				return;
			}
			response = await _Fetcher.base_fetch(target);
		}
		if (response) {
			this.render_route_change(response);
		}
	};
	/**
	 * @private
	 * @type {Window['location']}
	 */
	url;
	/**
	 * @public
	 * @param {Event} event
	 */
	pop_state_handle = async (event) => {
		event.preventDefault();
		const url_ = window.location;
		if (this.url.href !== url_.href) {
			if (url_.hash) {
				this.handle_hash_change(url_.hash);
				return;
			}
			const response = await _Fetcher.base_fetch(url_.href);
			if (response) {
				this.render_route_change(response);
			}
		}
	};
	/**
	 * @private
	 * @param {Window['location']['hash']} scroll_to
	 */
	handle_hash_change = (scroll_to) => {
		if (!scroll_to) {
			return;
		}
		if (scroll_to === 'scroll_top') {
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
			return;
		}
		const scroll_to_elem = document.querySelector(`#${scroll_to}`);
		if (!scroll_to_elem) {
			return;
		}
		scroll_to_elem.scrollIntoView({ behavior: 'smooth' });
	};
	/**
	 * @private
	 * @param {string} response
	 */
	render_route_change = (response) => {
		this.url = window.location;
		__AppSettings.__.notify_load(document, __AppSettings.__.first_hydration);
	};
}
