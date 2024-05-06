// @ts-check
import { __QueueDispatches } from './Queue/__QueueDispatches.mjs';
import { _AjaxRenderer } from './renderer/_AjaxRenderer.mjs';
import { __RouteChangeHandler } from './renderer/__RouteChangeHandler.mjs';
import { Observer } from './utils/Observer.mjs';

export class __atlaAS_client {
	/** @type {__atlaAS_client} */
	static __;
	/** @type {typeof _AjaxRenderer} */
	_ajax_renderer;
	/**
	 * @param {typeof import('./vars/__AppSettings.mjs').__AppSettings} __app_settings
	 * @param {typeof import('./renderer/_AjaxRenderer.mjs')._AjaxRenderer} _ajax_renderer
	 */
	constructor(__app_settings, _ajax_renderer) {
		new __app_settings();
		this._ajax_renderer = _ajax_renderer;
		new __QueueDispatches();
		new __RouteChangeHandler();
		__atlaAS_client.__ = this;
	}
	run = () => {
		Observer.set_window_event_listener();
	};
}
