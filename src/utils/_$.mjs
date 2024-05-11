// @ts-check

export class _$ {
	/**
	 * @type {HTMLElement|Element}
	 */
	element;
	/** @param {HTMLElement|Element} element */
	constructor(element) {
		this.element = element;
	}
	/**
	 * @private
	 * Checks if the given element is a valid array-like object or NodeList.
	 * @param {HTMLElement|NodeList|Array<any>|Document|null} elem - The element or object to be checked. If `null`, the `document` object will be used.
	 * @returns {boolean} `true` if the element is a valid array-like object (non-empty array or NodeList), `false` otherwise.
	 */
	is_array_vld = (elem = null) => {
		if (elem === null) {
			elem = document;
		}
		let select;
		if (!elem) {
			select = false;
		} else {
			if (elem instanceof HTMLElement) {
				if (elem.tagName !== 'SELECT' && elem.children.length > 1) {
					select = true;
				} else {
					select = false;
				}
			} else {
				select = false;
			}
		}
		return (Array.isArray(elem) && elem.length !== 0) || select || elem instanceof NodeList;
	};
	/**
	 * @param {HTMLElement|HTMLInputElement|NodeList|Array<any>|Document|null} value
	 */
	outer_html = (value) => {
		// @ts-ignore
		this.element.outerHTML = this.is_array_vld(value) ? value.join('') : value;
		return this;
	};
	/**
	 * @param {HTMLElement|NodeList|Array<any>|Document|string|null} value
	 */
	inner_html = (value) => {
		// @ts-ignore
		this.element.innerHTML = this.is_array_vld(value) ? value.join('') : value;
		return this;
	};
	/**
	 * @param {string} value
	 */
	inner_text = (value) => {
		if (this.element instanceof HTMLElement) {
			this.element.innerText = value;
		}
		return this;
	};
	/**
	 * @param {string} value
	 */
	text_content = (value) => {
		this.element.textContent = value;
		return this;
	};
	/**
	 * @param {string} value
	 */
	value = (value) => {
		if (this.element instanceof HTMLInputElement) {
			this.element.value = value;
		}
		return this;
	};
	/**
	 * @param {Object.<string,string>} styles_object
	 */
	style = (styles_object) => {
		if (this.element instanceof HTMLElement) {
			for (const style in styles_object) {
				this.element.style[style] = styles_object[style];
			}
		}
		return this;
	};
	/**
	 * @param {Object.<'add'|'remove',string[]>} class_list_definition
	 */
	class_list = (class_list_definition) => {
		for (const add_or_remove in class_list_definition) {
			for (let i = 0; i < class_list_definition[add_or_remove].length; i++) {
				this.element.classList[add_or_remove](class_list_definition[add_or_remove][i]);
			}
		}
		return this;
	};
	/**
	 * @param {HTMLElement|Element} node
	 */
	append_last = (node) => {
		this.element.appendChild(node);
		return this;
	};
	/**
	 * @param {HTMLElement|Element} node
	 */
	prepend_first = (node) => {
		this.element.prepend(node);
		return this;
	};
	/**
	 * @param {HTMLElement|Element} node
	 */
	before = (node) => {
		if (!this.element.parentNode) {
			return;
		}
		this.element.parentNode.insertBefore(node, this.element);
		return this;
	};
	/**
	 * @param {Element} node
	 */
	after = (node) => {
		this.element.insertAdjacentElement('afterend', node);
		return this;
	};
	/**
	 * @param {Object.<string,string|boolean>} custom_attribute_n_value
	 */
	attrs = (custom_attribute_n_value) => {
		for (const key in custom_attribute_n_value) {
			const value = custom_attribute_n_value[key];
			if (value === true) {
				this.element.setAttribute(key, '');
			} else if (value === false) {
				this.element.removeAttribute(key);
			} else {
				this.element.setAttribute(key, value);
			}
		}
		return this;
	};
	/**
	 * @param {Element} node
	 */
	replace = (node) => {
		if (!this.element.parentNode) {
			return;
		}
		this.element.parentNode.replaceChild(node, this.element);
	};
}
