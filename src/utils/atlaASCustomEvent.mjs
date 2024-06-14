// @ts-check

export class atlaASCustomEvent {
	constructor(methods) {
		this.methods = methods;
	}
	/**
	 * @protected
	 */
	methods;
	/**
	 * @protected
	 */
	register = () => {
		const methods = this.methods;
		for (const method in methods) {
			this[method] = methods[method];
		}
	};
}
