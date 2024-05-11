// @ts-check

import { __QueueDispatches } from './Queue/__QueueDispatches.mjs';
import { __RouteChangeHandler } from './renderer/__RouteChangeHandler.mjs';
import { Listener } from './utils/Listener.mjs';
import { __ProgressBar } from './utils/__ProgressBar.mjs';
import { __AppSettings } from './vars/__AppSettings.mjs';

export class __atlaAS_client {
	/** @type {__atlaAS_client} */
	static __;
	/** @type {typeof import('./renderer/AjaxRenderer.mjs').AjaxRenderer} */
	static _ajax_renderer;
	/** @type {import('./utils/__ProgressBar.mjs').__ProgressBar} */
	static __progress_bar;

	/**
	 * @param {typeof import('./vars/__AppSettings.mjs').__AppSettings} __app_settings
	 * @param {typeof import('./renderer/AjaxRenderer.mjs').AjaxRenderer} ajax_renderer
	 * @param {typeof import('./utils/__ProgressBar.mjs').__ProgressBar} __progress_bar
	 */
	constructor(__app_settings, ajax_renderer, __progress_bar) {
		new __app_settings();
		this._ajax_renderer = ajax_renderer;
		new __QueueDispatches();
		new __RouteChangeHandler();
		this.__progress_bar = new __progress_bar();
		__atlaAS_client.__ = this;
	}
	static run = () => {
		Listener.popstate_listener();
		const observer_main = Listener.set_main_listeners;
		window.addEventListener(__AppSettings.__.load_identifier, observer_main);
		observer_main();
	};
	/**
	 * @public
	 * @param {import('./utils/_OnloadCallback.mjs')._OnloadCallback} onload_callback
	 */
	static onload = (onload_callback) => {
		window.addEventListener(__AppSettings.__.load_identifier, onload_callback);
	};
}
