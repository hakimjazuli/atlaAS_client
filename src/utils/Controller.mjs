// @ts-check

import { __atlaAS_client } from '../__atlaAS_client.mjs';
import { __AppSettings } from '../vars/__AppSettings.mjs';
import { Views } from './Views.mjs';
import { _Functions } from './_Functions.mjs';

export class Controller {
	/**
	 * @public
	 * @param {HTMLElement|Element} element
	 * @param {string} dispatch
	 */
	static logic = async (element, dispatch) => {
		if (!element.hasAttribute(__AppSettings.__.lazy_identifier)) {
			await this.standard(element, dispatch);
			return;
		}
		await this.lazy();
	};
	/**
	 * @private
	 * @param {HTMLElement|Element} element
	 * @param {string} dispatch
	 */
	static standard = async (element, dispatch) => {
		await Views.set_element_loading(element);
		const renderer = new __atlaAS_client.__._ajax_renderer(dispatch, element);
		await renderer.render();
		await Views.set_element_loading(element, false);
	};
	static lazy = async () => {
		const __app_settings = __AppSettings.__;
		const lazy_elements_on_screen = Array.from(
			document.querySelectorAll(`[${__app_settings.lazy_identifier}]`)
		).filter((element) => _Functions.is_visible(element));
		if (!lazy_elements_on_screen.length) {
			return;
		}
		let fetch_updates = [];
		for (let i = 0; i < lazy_elements_on_screen.length; i++) {
			const lazy_element = lazy_elements_on_screen[i];
			fetch_updates.push(async () => {
				await Views.set_element_loading(lazy_element);
				const renderer = new __atlaAS_client.__._ajax_renderer(
					lazy_element.getAttribute(__app_settings.a_controller) ?? '',
					lazy_element
				);
				await renderer.render();
				await Views.set_element_loading(lazy_element, false);
			});
		}
		await Promise.all(fetch_updates.map(async (fn) => await fn())).catch((error) => {
			console.error(error);
		});
	};
}
