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
	 * @param {string} value
	 */
	outerHtml = (value) => {
		this.element.outerHTML = value;
	};
	/**
	 * @param {string} value
	 */
	innerHtml = (value) => {
		this.element.innerHTML = value;
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
	append = (node) => {
		this.element.appendChild(node);
		return this;
	};
	/**
	 * @param {HTMLElement|Element} node
	 */
	prepend = (node) => {
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
	 * @param {Object.<string,string|boolean>|NamedNodeMap} custom_attribute_n_value
	 */
	attributes = (custom_attribute_n_value) => {
		if (custom_attribute_n_value instanceof NamedNodeMap) {
			for (let i = 0; i < custom_attribute_n_value.length; i++) {
				const { name, value } = custom_attribute_n_value[i];
				if (value === 'true') {
					this.element.setAttribute(name, '');
				} else if (value === 'false') {
					this.element.removeAttribute(name);
				} else {
					this.element.setAttribute(name, value);
				}
			}
		} else {
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
	/**
	 * @param {(element:HTMLElement|Element)=>any} callback
	 */
	run = (callback) => {
		callback(this.element);
		return this;
	};
}
