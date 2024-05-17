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
		return new URL(`${window.location.origin}${local_url}`).searchParams;
	};
	/**
	 * @param {string} url
	 */
	static push_state = (url) => {
		if (url !== `${window.location.href}`) {
			history.pushState({}, '', url);
		}
	};
}
