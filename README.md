# atlaAS_client

an attempt to simplify HATEOAS rendering paradigm

## Assumption

this library assumes you are familiar with

-   js oop or classes syntax: for intellisense and extending our classes;
-   js bundling: to bundle to client;
-   JSDOC: to read our documented source files;

## How to install

1. install package from npm

```shell
npm i @html_first/atla-as_client
```

2. set build entry point `entry_point.mjs`

```js
// @ts-check
import { __atlaAS_client } from '@html_first/atla-as_client';
import { __AppSettings } from '@html_first/atla-as_client'; /** preferably if you extends it first */
import { AjaxRenderer } from '@html_first/atla-as_client'; /** preferably if you extends it first */
import { __ProgressBar } from '@html_first/atla-as_client'; /** preferably if you extends it first */
import { __AOnLoadings } from '@html_first/atla-as_client'; /** you HAVE TO extend this first */

const a_client = new __atlaAS_client(__AppSettings, AjaxRenderer, __ProgressBar, __AOnLoadings);
a_client.run();
```

3. extending \_\_AOnLoadings into `AOnLoadings.mjs` like this

```js
// @ts-check

import { __AOnLoadings } from '@html_first/atla-as_client/';

/** @typedef {import('@html_first/atla-as_client/').__AOnLoadings_method} __AOnLoadings_method */

export class AOnLoadings extends __AOnLoadings {
	/**
	 * this class methods used for handling a-on_loading html attributes
	 * during a-loading transition
	 * @type {__AOnLoadings_method}
	 */
	test = ($) => {
		$.styles({
			visibility: 'hidden',
		});
	};
}
```

4. bundling
    > - you either use your own prefered bundler to bundle `entry_point.mjs` to then loaded into
    >   your html

```html
<script type="module" src="/path/to/your/bundled.mjs" defer a-keep></script>
```

4.  -   or you can use our rollup dev-dependency bundler

## build using our rollup dev-dependency bundler

1. setup `/rollup.config.mjs`

```js
// @ts-check

import { _RollupSettings, _RollupTarget } from '@html_first/atla-as_client';

const export_base_path = `/path/to/your/bundled.mjs`;
const targets = [
	new _RollupTarget('bundled', '/path/to/your/entry_point.mjs', `${export_base_path}./js/`),
];

export default new _RollupSettings(targets).config;
```

2. then run

```shell
rollup -c
```

3. or to watch changes

```shell
rollup -c -w
```

4. you might want to add that to your npm script, for simplicity

## Uses in html

1.  html attributes
    > -   a-dispatch
    >     > -   test
    > -   a-debounce
    >     > -   test
    > -   a-trigger
    >     > -   test
    > -   a-lazy
    >     > -   test
    > -   a-loading
    >     > -   test
    > -   a-path
    >     > -   test
    > -   a-listen
    >     > -   test
    > -   a-method
    >     > -   test
    > -   a-token_name
    >     > -   test
    > -   a-token_value
    >     > -   test
    > -   a-on_loading
    >     > -   test

## On client script behaviours

## Library Naming Convenience

-   classes that **ARE** prefixed with "**\_\_**" are globals, no need to be instantiated after the
    `/public/index.php` script;
-   classes that **ARE** prefixed "**\_**" are meant to be used in your app;
-   classes that **ARE NOT** prefixed with any "**\_**" are meant for framework internals;
