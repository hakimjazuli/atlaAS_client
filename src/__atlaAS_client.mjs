// @ts-check

import { __Queue } from './queue/__Queue.mjs';
import { __RouteChangeHandler } from './renderer/__RouteChangeHandler.mjs';
import { Views } from './utils/Views.mjs';
import { __ProgressBar } from './utils/__ProgressBar.mjs';
import { __AppSettings } from './vars/__AppSettings.mjs';

export class __atlaAS_client {
	/** @type {__atlaAS_client} */
	static __;
	/** @type {typeof import('./renderer/AjaxRenderer.mjs').AjaxRenderer} */
	_ajax_renderer;
	/** @type {import('./utils/__ProgressBar.mjs').__ProgressBar} */
	__progress_bar;
	/** @type {typeof import('./utils/_Triggers.mjs')._Triggers} */
	_triggers;

	/**
	 * @param {typeof import('./vars/__AppSettings.mjs').__AppSettings} __app_settings
	 * @param {typeof import('./renderer/AjaxRenderer.mjs').AjaxRenderer} ajax_renderer
	 * @param {typeof import('./utils/__ProgressBar.mjs').__ProgressBar} __progress_bar
	 * @param {typeof import('./utils/_Triggers.mjs')._Triggers} _triggers
	 * @param {import('./utils/__AOnLoadings.mjs').__AOnLoadings} aon_loading
	 * @param {import('./utils/__AOnRaw.mjs').__AOnRaw} aon_raw
	 */
	constructor(__app_settings, ajax_renderer, __progress_bar, _triggers, aon_loading, aon_raw) {
		new __app_settings();
		this._ajax_renderer = ajax_renderer;
		this._triggers = _triggers;
		new __Queue();
		new __RouteChangeHandler();
		this.__progress_bar = new __progress_bar();
		__atlaAS_client.__ = this;
	}
	run = () => {
		Views.popstate_listener();
		const observer_main = Views.set_main_listeners;
		window.addEventListener(__AppSettings.__.load_identifier, observer_main);
		observer_main();
	};
}
