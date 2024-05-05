// @ts-check
import { SetAsGlobal } from '../utils/SetAsGlobal.mjs';

export class __AppSettings {
	/** @type {__AppSettings} */
	static __;
	constructor() {
		SetAsGlobal.bind(this)();
	}
}
