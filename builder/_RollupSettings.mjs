// @ts-check

import terser from '@rollup/plugin-terser';
import scss from 'rollup-plugin-scss';
import cssnano from 'cssnano';
import postcss from 'postcss';
import fs from 'fs';
import resolve from '@rollup/plugin-node-resolve';
import { _RollupTarget } from './_RollupTarget.mjs';

export class _RollupSettings {
	/** @type {string} */
	base_path;
	/**
	 * @param {_RollupTarget[]} targets
	 */
	constructor(targets) {
		this.targets = targets;
		this.base_path = process.cwd();
		this.generate_config();
	}
	/**
	 * @type {_RollupTarget[]}
	 */
	targets;
	/** @type {object[]} */
	config = [];
	/** @private */
	generate_config = () => {
		this.targets.forEach((target) => {
			const compiled_path = `${this.base_path}/${target.export_to_relative}`;
			this.config.push({
				input: [`${this.base_path}/${target.source_path}`],
				output: [
					{
						dir: compiled_path,
						format: 'es',
						entryFileNames: `${target.name}.mjs`,
						plugins: [terser()],
					},
				],
				plugins: [
					resolve({
						resolveOnly: ['@html_first/atla-as_client'],
					}),
					scss({
						output: `${compiled_path}/${target.name}.css`,
						processor: (css) => {
							return postcss([cssnano])
								.process(css, {
									from: undefined,
									map: { inline: false },
								})
								.then((result) => {
									return result.css.replace(/\/(.*?)\//g, '');
								});
						},
					}),
				],
			});
		});
		return this;
	};
}
