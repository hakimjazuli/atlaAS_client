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
	outerHTML = (value) => {
		// @ts-ignore
		this.element.outerHTML = this.is_array_vld(value) ? value.join('') : value;
		return this;
	};
	/**
	 * @param {HTMLElement|NodeList|Array<any>|Document|string|null} value
	 */
	innerHTML = (value) => {
		// @ts-ignore
		this.element.innerHTML = this.is_array_vld(value) ? value.join('') : value;
		return this;
	};
	/**
	 * @param {string} value
	 */
	innerText = (value) => {
		if (this.element instanceof HTMLElement) {
			this.element.innerText = value;
		}
		return this;
	};
	/**
	 * @param {string} value
	 */
	textContent = (value) => {
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
	classList = (class_list_definition) => {
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
	appendlast = (node) => {
		this.element.appendChild(node);
		return this;
	};
	/**
	 * @param {HTMLElement|Element} node
	 */
	insertBefore = (node) => {
		if (!this.element.parentNode) {
			return;
		}
		this.element.parentNode.insertBefore(node, this.element);
		return this;
	};
	/**
	 * @param {Element} node
	 */
	insertAfter = (node) => {
		this.element.insertAdjacentElement('afterend', node);
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
		return this;
	};
	/**
	 * @param {string} custom_attribute
	 * @param {string|boolean} value
	 */
	attr = (custom_attribute, value) => {
		switch (value) {
			case true:
				this.element.setAttribute(custom_attribute, '');
				break;
			case false:
				this.element.removeAttribute(custom_attribute);
				break;
			default:
				this.element.setAttribute(custom_attribute, value);
				break;
		}
		return this;
	};
}
