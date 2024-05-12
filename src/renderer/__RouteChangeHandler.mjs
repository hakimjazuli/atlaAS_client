// @ts-check

import { _$ } from '../utils/_$.mjs';
import { __ProgressBar } from '../utils/__ProgressBar.mjs';
import { __AppSettings } from '../vars/__AppSettings.mjs';
import { _Fetcher } from './_Fetcher.mjs';

export class __RouteChangeHandler {
	/** @type {__RouteChangeHandler} */
	static __;
	constructor() {
		this.url = new URL(window.location.href + '#' + window.location.hash);
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
			if (this.url.href === path) {
				return;
			}
			history.pushState({}, '', path);
			this.url.href = window.location.origin + path;
			if (path.includes('#')) {
				this.handle_hash_change(path);
			} else {
				response = await _Fetcher.element_fetch(target);
			}
		} else {
			if (this.url.href === target) {
				return;
			}
			history.pushState({}, '', target);
			this.url.href = window.location.origin + target;
			if (target.includes('#')) {
				this.handle_hash_change(target);
			} else {
				response = await _Fetcher.base_fetch(target);
			}
		}
		if (response) {
			this.render_route_change(response);
		}
	};
	/**
	 * @private
	 * @type {URL}
	 */
	url;
	/**
	 * @public
	 * @param {Event} event
	 */
	pop_state_handle = async (event) => {
		event.preventDefault();
		const url_ = window.location;
		if (this.url.href === url_.href) {
			return;
		}
		this.url = new URL(url_.href + '#' + url_.hash);
		if (this.url.hash) {
			this.handle_hash_change(this.url.hash);
			return;
		}
		const response = await _Fetcher.base_fetch(this.url.href);
		if (response) {
			this.render_route_change(response);
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
		const scroll_to_elem = document.getElementById(scroll_to);
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
		const old_element = document[mode];
		const set_attrbs = new _$(old_element);
		for (let i = 0; i < old_element.attributes.length; i++) {
			const { name, value } = old_element.attributes[i];
			if (!new_head_body.hasAttribute(name)) {
				old_element.removeAttribute(name);
				continue;
			}
			if (new_head_body.getAttribute(name) !== value) {
				set_attrbs.attributes({ [name]: value });
			}
		}
		for (let i = 0; i < new_head_body.attributes.length; i++) {
			const { name, value } = new_head_body.attributes[i];
			if (old_element.hasAttribute(name) && old_element.getAttribute(name) !== value) {
				set_attrbs.attributes({ [name]: value });
			}
		}
	};
	/**
	 * @private
	 * @param {Document['head']} new_head
	 */
	handle_head = (new_head) => {
		const old_scripts = document.head.querySelectorAll('script');
		const old_head = document.head;
		this.attr_h_b_(new_head, 'head');
		const new_head_elements = Array.from(new_head.children);
		const old_head_elements = Array.from(old_head.children);
		old_head_elements.forEach((old_element) => {
			const old_element_outer = old_element.outerHTML;
			let keep_old = false;
			for (let i = 0; i < new_head_elements.length; i++) {
				const new_element = new_head_elements[i];
				if (new_element.outerHTML == old_element_outer) {
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
				if (old_element.outerHTML == new_element_outer) {
					add_new = false;
					break;
				}
			}
			if (add_new) {
				old_head.appendChild(new_element);
			}
		});
		this.handle_scripts('head', old_scripts);
	};
	/**
	 * @private
	 * @param {Document['body']} new_body
	 */
	handle_body = (new_body) => {
		const old_scripts = document.body.querySelectorAll('script');
		this.attr_h_b_(new_body, 'body');
		const a_keep = __AppSettings.__.a_keep;
		const render_kept_element = new_body.querySelectorAll(`[${a_keep}]`);
		if (render_kept_element) {
			for (let i = 0; i < render_kept_element.length; i++) {
				const over_write_elem = render_kept_element[i];
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
		new _$(document.body).innerHtml(new_body.innerHTML);
		new __ProgressBar();
		this.handle_scripts('body', old_scripts);
	};
	/**
	 * @private
	 * @param {'head'|'body'} mode
	 * @param {NodeListOf<HTMLScriptElement>} old_scripts
	 */
	handle_scripts = (mode, old_scripts) => {
		const new_scripts_parent = document[mode];
		const new_scripts = new_scripts_parent.querySelectorAll(`${mode} script`);
		if (!new_scripts) {
			return;
		}
		const old_script_container = document.createElement('div');
		if (old_scripts) {
			let innerHTML_for_div = '';
			old_scripts.forEach((old_script) => {
				innerHTML_for_div += old_script.outerHTML;
			});
			old_script_container.innerHTML = innerHTML_for_div;
		}
		for (let i = 0; i < new_scripts.length; i++) {
			const new_script = new_scripts[i];
			if (new_script instanceof HTMLScriptElement) {
				this.re_run_script(new_script, old_script_container, new_scripts_parent);
			}
		}
		old_script_container.remove();
	};
	/**
	 * Description
	 * @param {HTMLScriptElement} new_script
	 * @param {HTMLElement} old_script_container
	 * @param {HTMLElement} new_scripts_parent
	 */
	re_run_script = (new_script, old_script_container, new_scripts_parent) => {
		if (
			new_script.hasAttribute('src') &&
			new_script.hasAttribute(__AppSettings.__.a_keep) &&
			old_script_container.querySelector(`[src="${new_script.getAttribute('src')}"]`)
		) {
			return;
		}
		const new_script_container = document.createElement('script');
		const set_attributes_new = new _$(new_script_container);
		set_attributes_new.attributes(new_script.attributes).innerHtml(new_script.innerHTML);
		new_scripts_parent.appendChild(new_script_container);
		new_script.remove();
	};
}
