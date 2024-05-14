// @ts-check

import { __AppSettings } from '../vars/__AppSettings.mjs';
import { _$ } from '@html_first/element_modifier';

export class __ProgressBar {
	/**
	 * @protected
	 * @param {HTMLProgressElement} progress_bar_element
	 */
	set_attributes = (progress_bar_element) => {
		new _$(progress_bar_element)
			.attributes({
				id: __AppSettings.__.route_change_id,
				ariaBusy: 'true',
			})
			.styles({
				position: 'fixed',
				margin: '0',
				padding: '0',
				zIndex: '9999',
				width: '100%',
				top: '0',
				left: '0',
				visibility: 'hidden',
			});
	};
	/** @type {__ProgressBar} */
	static __;
	constructor() {
		this.create_progress_bar();
		this.__ = this;
	}
	/** @protected */
	create_progress_bar = () => {
		const __app_settings = __AppSettings.__;
		let progress_bar = document.getElementById(__app_settings.route_change_id);
		if (progress_bar) {
			this.progress_bar = progress_bar;
			return;
		}
		const progress_bar_element = document.createElement('progress');
		this.set_attributes(progress_bar_element);
		new _$(document.body).prepend(progress_bar_element);
	};
}
