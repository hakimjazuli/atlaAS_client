// @ts-check

export class _RollupTarget {
	/** @type {string} */
	name;
	/** @type {string} */
	source_path;
	/** @type {string} */
	export_to_relative;
	/**
	 *
	 * @param {string} name
	 * @param {string} source_path
	 * @param {string} export_to_relative
	 */
	constructor(name, source_path, export_to_relative) {
		this.name = name;
		this.source_path = source_path;
		this.export_to_relative = export_to_relative;
	}
}
