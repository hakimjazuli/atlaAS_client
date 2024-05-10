// @ts-check

export class _Functions {
	/**
	 * Description
	 * @param {number} ms
	 */
	static timeout = (ms) => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};
}
