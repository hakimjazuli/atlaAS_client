// @ts-check

import { __AppSettings } from '../vars/__AppSettings.mjs';
import { _$ } from './_$.mjs';

export class __ProgressBar {
	/** @protected */
	attr = {
		id: __AppSettings.__.route_change_id,
		ariaBusy: 'true',
	};
	/** @protected */
	style = {
		position: 'fixed',
		margin: '0',
		padding: '0',
		zIndex: '9999',
		width: '100%',
		top: '0',
		left: '0',
		visibility: 'none',
	};

	/** @type {__ProgressBar} */
	static __;
	constructor() {
		this.create_progress_bar();
		this.__ = this;
	}
	create_progress_bar = () => {
		const __app_settings = __AppSettings.__;
		let progress_bar = document.getElementById(__app_settings.route_change_id);
		if (progress_bar) {
			this.progress_bar = progress_bar;
			return;
		}
		const progress_bar_element = document.createElement('progress');
		new _$(progress_bar_element).attributes(this.attr).style(this.style);
		new _$(document.body).prepend(progress_bar_element);
	};
}
