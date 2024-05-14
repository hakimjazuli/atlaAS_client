// @ts-check

export class _$ {
	/**
	 * tracked element
	 * @type {HTMLElement|Element|null}
	 */
	e;
	/** @param {HTMLElement|Element|null} e */
	constructor(e) {
		this.e = e;
	}
	/**
	 * @private
	 */
	ok = () => this.e && this.e.isConnected;
	/**
	 * @param {string} value
	 */
	outerHtml = (value) => {
		if (this.e && this.ok()) {
			this.e.outerHTML = value;
		}
	};
	/**
	 * @param {string} value
	 */
	innerHtml = (value) => {
		if (this.e && this.ok()) {
			this.e.innerHTML = value;
		}
		return this;
	};
	/**
	 * @param {string} value
	 */
	innerText = (value) => {
		if (this.e && this.ok()) {
			if (this.e instanceof HTMLElement) {
				this.e.innerText = value;
			}
		}
		return this;
	};
	/**
	 * @param {string} value
	 */
	textContent = (value) => {
		if (this.e && this.ok()) {
			this.e.textContent = value;
		}
		return this;
	};
	/**
	 * @param {string} value
	 */
	value = (value) => {
		if (this.e && this.ok()) {
			if (this.e instanceof HTMLInputElement) {
				this.e.value = value;
			}
		}
		return this;
	};
	/**
	 * @param {Object.<string,string>} styles_object
	 */
	styles = (styles_object) => {
		if (this.e && this.ok()) {
			if (this.e instanceof HTMLElement) {
				for (const style in styles_object) {
					this.e.style[style] = styles_object[style];
				}
			}
		}
		return this;
	};
	/**
	 * @param {Object.<'add'|'remove',string[]>} class_list_definition
	 */
	classList = (class_list_definition) => {
		if (this.e && this.ok()) {
			for (const add_or_remove in class_list_definition) {
				for (let i = 0; i < class_list_definition[add_or_remove].length; i++) {
					this.e.classList[add_or_remove](class_list_definition[add_or_remove][i]);
				}
			}
		}
		return this;
	};
	/**
	 * @param {HTMLElement|Element} node
	 */
	append = (node) => {
		if (this.e && this.ok()) {
			this.e.appendChild(node);
		}
		return this;
	};
	/**
	 * @param {HTMLElement|Element} node
	 */
	prepend = (node) => {
		if (this.e && this.ok()) {
			this.e.prepend(node);
		}
		return this;
	};
	/**
	 * @param {HTMLElement|Element} node
	 */
	before = (node) => {
		if (this.e && this.ok()) {
			if (!this.e.parentNode) {
				return;
			}
			this.e.parentNode.insertBefore(node, this.e);
		}
		return this;
	};
	/**
	 * @param {Element} node
	 */
	after = (node) => {
		if (this.e && this.ok()) {
			this.e.insertAdjacentElement('afterend', node);
		}
		return this;
	};
	/**
	 * @param {Object.<string,string|boolean>|NamedNodeMap} custom_attribute_n_value
	 */
	attributes = (custom_attribute_n_value) => {
		if (this.e && this.ok()) {
			if (custom_attribute_n_value instanceof NamedNodeMap) {
				for (let i = 0; i < custom_attribute_n_value.length; i++) {
					const { name, value } = custom_attribute_n_value[i];
					if (value === 'true') {
						this.e.setAttribute(name, '');
					} else if (value === 'false') {
						this.e.removeAttribute(name);
					} else {
						this.e.setAttribute(name, value);
					}
				}
			} else {
				for (const key in custom_attribute_n_value) {
					const value = custom_attribute_n_value[key];
					if (value === true) {
						this.e.setAttribute(key, '');
					} else if (value === false) {
						this.e.removeAttribute(key);
					} else {
						this.e.setAttribute(key, value);
					}
				}
			}
		}
		return this;
	};
	/**
	 * @param {Element} node
	 */
	replace = (node) => {
		if (this.e && this.ok()) {
			if (!this.e.parentNode) {
				return;
			}
			this.e.parentNode.replaceChild(node, this.e);
		}
	};
	/**
	 * @param {((element:HTMLElement|Element)=>Promise<any>)} callback
	 */
	script = async (callback) => {
		if (this.e && this.ok()) {
			await callback(this.e);
		}
		return this;
	};
}
