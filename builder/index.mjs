// @ts-check

import {
	__atlaAS_client,
	__AppSettings /** preferably to be extended first */,
	AjaxRenderer /** preferably to be extended first */,
	__ProgressBar /** preferably to be extended first */,
	_Triggers /** preferably to be extended first for custom a-trigger instructions */,
} from '@html_first/atla-as_client';
import { AOnLoadings } from './AOnLoadings.mjs' /** NEEDED to be extended first to use a-on_loading instructions */;
import { AOnRaw } from './AOnRaw.mjs' /** NEEDED to be extended first to use a-raw instructions */;

const a_client = new __atlaAS_client(
	__AppSettings,
	AjaxRenderer,
	__ProgressBar,
	_Triggers,
	AOnLoadings,
	AOnRaw
);
a_client.run();
