// @ts-check

import { __AppSettings } from '../vars/__AppSettings.mjs';
import { _$ } from './_$.mjs';

export class __ProgressBar {
	/** @type {__ProgressBar} */
	static __;
	constructor() {
		this.create_progress_bar();
		this.__ = this;
	}
	create_progress_bar = () => {
		const __app_settings = __AppSettings.__;
		let progress_bar = document.querySelector(`#${__app_settings.route_change_indicator}`);
		if (progress_bar) {
			this.progress_bar = progress_bar;
			return;
		}
		const progress_bar_element = document.createElement('progress');
		new _$(progress_bar_element)
			.attr('id', __app_settings.route_change_indicator)
			.attr('aria-busy', 'true')
			.style({
				position: 'fixed',
				zIndex: '9999',
				width: '100vw',
				top: '0',
			});
		new _$(document.body).insertAfter(progress_bar_element);
	};
}
