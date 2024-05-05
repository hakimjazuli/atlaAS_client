// @ts-check
import { Observer } from '../utils/Observer.mjs';
import { SetAsGlobal } from '../utils/SetAsGlobal.mjs';

export class __ShouldRender extends Observer {
	/** @type {__ShouldRender} */
	static __;
	constructor() {
		super();
		SetAsGlobal.bind(this)();
	}
}
