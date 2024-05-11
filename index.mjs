// @ts-check
import './src/style/atlaAS.scss';

import { __atlaAS_client } from './src/__atlaAS_client.mjs';
import { __AppSettings } from './src/vars/__AppSettings.mjs';
import { AjaxRenderer } from './src/renderer/AjaxRenderer.mjs';
import { _$ } from './src/utils/_$.mjs';
import { __ProgressBar } from './src/utils/__ProgressBar.mjs';

/** @typedef {import('./src/utils/_OnloadCallback.mjs')._OnloadCallback} _OnloadCallback */

export { __atlaAS_client, __AppSettings, AjaxRenderer, _$, __ProgressBar };
