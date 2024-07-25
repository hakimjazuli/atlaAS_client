// @ts-check

import { __AppSettings } from '../vars/__AppSettings.mjs';

export class _Functions {
	/**
	 * @param {number} ms
	 */
	static timeout = (ms) => {
		return new Promise((_, reject) => {
			setTimeout(() => {
				reject(new Error('Operation timed out'));
			}, ms);
		});
	};
	/**
	 * @param {()=>Promise<any>} callback
	 * @param {number} timeoute_duration
	 */
	static timeout_check = async (callback, timeoute_duration) => {
		let result;
		try {
			result = await Promise.race([callback(), _Functions.timeout(timeoute_duration)]);
		} catch (error) {
			result = false;
		}
		return result;
	};
	/**
	 * @param {Element} element
	 */
	static is_visible = (element) => {
		const rect = element.getBoundingClientRect();
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
	};
	/**
	 * @param {string} local_url
	 * @returns {URLSearchParams}
	 */
	static get_query_param = (local_url) => {
		try {
			return new URL(local_url).searchParams;
		} catch (error) {
			return new URL(`${window.location.origin}${local_url}`).searchParams;
		}
	};
	/**
	 * @param {string} url
	 */
	static push_state = (url) => {
		if (url !== `${window.location.href}`) {
			history.pushState({}, '', url);
		}
	};
	/**
	 * @param {string} a_path
	 * @returns {string}
	 */
	static interprete_path = (a_path) => {
		const regex = /\{([^}]+)\}/g;
		let match;
		while ((match = regex.exec(a_path)) !== null) {
			let real_element = document.querySelector(
				`input[${__AppSettings.__.a_value_lookup}='${match[1]}']`
			);
			if (
				real_element instanceof HTMLInputElement ||
				real_element instanceof HTMLSelectElement
			) {
				const real_value = real_element.value;
				a_path = a_path.replace(match[0], real_value);
			}
		}
		return a_path;
	};
}
