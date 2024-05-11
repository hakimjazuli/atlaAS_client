// @ts-check

import { _$ } from '../utils/_$.mjs';
import { __ProgressBar } from '../utils/__ProgressBar.mjs';
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
		history.pushState({}, '', window.location.href);
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
			this.url = url_;
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
		const parser = new DOMParser();
		const html_document = parser.parseFromString(response, 'text/html');
		this.handle_head(html_document.head);
		this.handle_body(html_document.body);
		__AppSettings.__.notify_load(document, 'after');
	};
	/**
	 * @private
	 * @param {Document['head']|Document['body']} new_head_body
	 * @param {'head'|'body'} mode
	 */
	attr_h_b_ = (new_head_body, mode) => {
		for (let i = 0; i < new_head_body.attributes.length; i++) {
			const { name, value } = new_head_body.attributes[i];
			new _$(document[mode]).attrs({ [name]: value });
		}
	};
	/**
	 * @private
	 * @param {Document['head']} new_head
	 */
	handle_head = (new_head) => {
		const old_head = document.head;
		this.attr_h_b_(new_head, 'head');
		const new_head_elements = Array.from(new_head.children);
		const old_head_elements = Array.from(old_head.children);
		old_head_elements.forEach((old_element) => {
			const old_element_outer = old_element.outerHTML;
			let keep_old = false;
			for (let i = 0; i < new_head_elements.length; i++) {
				const new_element = new_head_elements[i];
				if (new_element.outerHTML === old_element_outer) {
					keep_old = true;
					break;
				}
			}
			if (!keep_old) {
				old_head.removeChild(old_element);
			}
		});
		new_head_elements.forEach((new_element) => {
			const new_element_outer = new_element.outerHTML;
			let add_new = true;
			for (let i = 0; i < old_head_elements.length; i++) {
				const old_element = old_head_elements[i];
				if (old_element.outerHTML === new_element_outer) {
					add_new = false;
					break;
				}
			}
			if (add_new) {
				old_head.appendChild(new_element);
			}
		});
		this.handle_scripts('head');
	};
	/**
	 * @private
	 * @param {Document['body']} new_body
	 */
	handle_body = (new_body) => {
		this.attr_h_b_(new_body, 'body');
		const a_keep = __AppSettings.__.a_keep;
		const over_write_elems = new_body.querySelectorAll(`[${a_keep}]`);
		if (over_write_elems) {
			for (let i = 0; i < over_write_elems.length; i++) {
				const over_write_elem = over_write_elems[i];
				if (over_write_elem.hasAttribute(a_keep)) {
					const kept_elem = document.body.querySelector(
						`[${a_keep}="${over_write_elem.getAttribute(a_keep)}"]`
					);
					/** this is where view transition api might need to be placed */
					if (kept_elem) {
						new _$(over_write_elem).replace(kept_elem);
					}
				}
			}
		}
		if (new_body) {
			new _$(document.body).inner_html(new_body.innerHTML);
		}
		new __ProgressBar();
		this.handle_scripts('body');
	};
	/**
	 * @private
	 * @param {'head'|'body'} mode
	 */
	handle_scripts = (mode) => {
		const parent = document[mode];
		const scripts_ = document.querySelectorAll(`${mode} scripts`);
		for (let i = 0; i < scripts_.length; i++) {
			const script_ = scripts_[i];
			if (script_.hasAttribute(__AppSettings.__.a_keep)) {
				continue;
			}
			const src = script_.getAttribute('src');
			if (typeof src !== 'string') {
				continue;
			}
			if (document.querySelector(`script[src="${src}"]`) instanceof HTMLScriptElement) {
				continue;
			}
			const new_script = document.createElement('script');
			const set_attrbs = new _$(new_script);
			for (let i = 0; i < script_.attributes.length; i++) {
				const { name, value } = script_.attributes[i];
				set_attrbs.attrs({
					[name]: value,
				});
			}
			set_attrbs.inner_html(script_.innerHTML);
			script_.remove();
			parent.appendChild(new_script);
		}
	};
}
