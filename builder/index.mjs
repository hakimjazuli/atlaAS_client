// @ts-check
import {
	__atlaAS_client,
	__AppSettings,
	AjaxRenderer,
	__ProgressBar,
	__AOnLoadings,
	_Triggers,
} from '../index.mjs';

const a_client = new __atlaAS_client(
	__AppSettings,
	AjaxRenderer,
	__ProgressBar,
	__AOnLoadings,
	_Triggers
);
a_client.run();
