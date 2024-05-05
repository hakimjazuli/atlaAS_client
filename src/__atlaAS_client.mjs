// @ts-check
import { SetAsGlobal } from './utils/SetAsGlobal.mjs';

export class __atlaAS_client {
	/** @type {__atlaAS_client} */
	static __;
	/**
	 * @param {typeof import('./vars/__AppSettings.mjs').__AppSettings} __app_settings
	 */
	constructor(__app_settings) {
		new __app_settings();
		SetAsGlobal.bind(this)();
	}
}
