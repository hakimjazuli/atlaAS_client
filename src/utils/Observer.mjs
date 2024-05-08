// @ts-check

import { __AppSettings } from '../vars/__AppSettings.mjs';

export class Observer {
	static set_main_listener = () => {
		const anchor_tags = document.querySelectorAll('a[href]');
		if (anchor_tags) {
			for (let i = 0; i < anchor_tags.length; i++) {
				const anchor_tag = anchor_tags[i];
				anchor_tag.setAttribute(
					__AppSettings.__.a_request_path,
					anchor_tag.getAttribute('href') ?? ''
				);
				anchor_tag.removeAttribute('href');
			}
		}
		const form_tags = document.querySelectorAll('form[action]');
		if (form_tags) {
			for (let i = 0; i < form_tags.length; i++) {
				const form_tag = form_tags[i];
				form_tag.setAttribute(
					__AppSettings.__.a_request_path,
					form_tag.getAttribute('action') ?? ''
				);
				form_tag.removeAttribute('action');
			}
		}
	};
}
