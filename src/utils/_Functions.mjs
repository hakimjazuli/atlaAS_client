// @ts-check

export class _Functions {
	/**
	 * Description
	 * @param {number} ms
	 */
	static timeout = (ms) => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};
	/**
	 * Description
	 * @param {Element} element
	 */
	static is_visible = (element) => {
		const rect = element.getBoundingClientRect();
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
	};
}
