// @ts-check

import { _RollupSettings } from './builder/_RollupSettings.mjs';
import { _RollupTarget } from './builder/_RollupTarget.mjs';

const targets = [new _RollupTarget('prebundled', './builder/App.mjs', `./`)];

export default new _RollupSettings(targets).config;
