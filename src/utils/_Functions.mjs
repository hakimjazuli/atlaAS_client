// @ts-check

export class _Functions {
	/**
	 * @param {number} ms
	 */
	static timeout = (ms) => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};
	/**
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
	/**
	 * @param {string} local_url
	 * @returns {URLSearchParams}
	 */
	static get_query_param = (local_url) => {
		return new URL(`${window.location.origin}${local_url}`).searchParams;
	};
}
