// @ts-check

import { _RollupSettings, _RollupTarget } from '@html_first/atla-as_builder';

const targets = [new _RollupTarget('prebundled', './builder/index.mjs', `./`)];

export default new _RollupSettings(targets).config;
