# atlaAS_client

-   an attempt to simplify HATEOAS rendering paradigm;
-   it's designed to be used in the conjunction with our php sister library
    *https://github.com/hakimjazuli/atlaAS* in mind;
-   however you can still uses this library with any kind of HATEOAS backend (_with few tweaks_);

## Assumption

this library assumes you are familiar with

-   js oop or classes syntax: for intellisense and extending our classes;
-   js bundling: to bundle to client;
-   JSDOC: to read our documented source files;

**why?**

-   you wouldn't get type hinting for _\_\_AOnLoadings_ otherwise;
-   OPTIONS (**if you still don't want to build it your self**):

    > -   download a copy of `bundled.mjs` from
    >     [here available soon](https://github.com/hakimjazuli/atlaAS_client)
    > -   add on window object `window['a-on_loading']` = `Object.<string,(callback:_$)=>void`>
    >     > -   where \_$ is an object of this
    >         [\_\$ class](https://www.npmjs.com/package/@html_first/element_modifier)
    > -   add css to modify `#a-route_change_indicator` and mark it as `!important`

```html
<style>
	   #a-route_change_indicator{
	 position: 'new_value' !important,
	margin: 'new_value' !important,
	padding: 'new_value' !important,
	zIndex: 'new_value' !important,
	width: 'new_value' !important,
	top: 'new_value' !important,
	left: 'new_value' !important,
	visibility: 'new_value' !important,
	   }
</style>
```

## How to install

1. install package from npm

```shell
npm i @html_first/atla-as_client
```

2. extending \_\_AOnLoadings into `AOnLoadings.mjs` like this

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

3. set build entry point `entry_point.mjs`

```js
// @ts-check
import {
	__atlaAS_client,
	__AppSettings /** preferably to be extended first */,
	AjaxRenderer /** preferably to be extended first */,
	__ProgressBar /** preferably to be extended first */,
	__AOnLoadings /** NEEDED to be extended first to use a-on_loading instructions */,
	_Triggers /** preferably to be extended first for custom a-trigger instructions */,
} from '@html_first/atla-as_client';

const a_client = new __atlaAS_client(
	__AppSettings,
	AjaxRenderer,
	__ProgressBar,
	__AOnLoadings,
	_Triggers
);
a_client.run();
```

4. bundling
    > - you either use your own prefered bundler to bundle `entry_point.mjs` to then load it into
    >   your html

```html
<script type="module" src="/path/to/your/bundled.mjs" defer a-keep></script>
```

4.  -   or you can use our rollup dev-dependency bundler

## Bundling using our rollup dev-dependency bundler

1. setup `/rollup.config.mjs`

```js
// @ts-check

/**
 * both file are separated from index.mjs,
 * because otherwise rollup keep bundling implicit dependency
 */
import { _RollupSettings } from '@html_first/atla-as_client/builder/_RollupSettings.mjs';
import { _RollupTarget } from '@html_first/atla-as_client/builder/_RollupTarget.mjs';

const export_base_path = `/path/to/your/bundled.mjs/folder/`;

const targets = [
	new _RollupTarget('bundled', '/path/to/your/entry_point.mjs', `${export_base_path}./js/`),
];

export default new _RollupSettings(targets).config;
```

2. then on terminal, run

```shell
rollup -c
```

3. or if you want to watch for changes

```shell
rollup -c -w
```

4. you might want to add that to your `package.json` `.scripts`, for simplicity

## Uses in html

### best practice (with adhering no-script fallback):

the best practice is still using normal html request tag (anchor: `a` or form: `form`) so in the
event of javascript is disabled by the client, site is still can function, without client side
routing; while ofcourse you have to handle things on your backend more carefully;

-   anchor tag attributes:
    > -   `href`
    >     > -   url end point;
    > -   `a-`
    >     > -   absent: anchor tag will act as normal link;
    >     > -   present: turn anchor tag into partial renderer;
-   form tag attributes:
    > -   `action`
    >     > -   url end point;
    > -   `method`
    >     > -   http request method;

### controller & view

-   `controllers`: are element that are used to trigger ajax;
    > -   it have list of `views` that it will send instruction to request an ajax to server;
-   `views`: are element that used (its outerHTML, or innerHTML in case of fails) to display the
    ajax response;
    > -   it have information of which `end point` it should request to;

### custom html attributes:

-   `[a-controller]`
    > -   only for `controllers`;
    > -   value:
    >     > -   `viewValue1;viewValue2;...viewValueN`;
    >     > -   `self;`: automatically generated on `a` and `form` if element has no `a-controller`
    >     >     attribute ;
-   `[a-trigger]`
    > -   only for `controllers`;
    > -   add controller to queue;
    > -   value:
    >     > -   `element.addEventListener` type;
    >     > -   `click`: automatically generated on `a` if element has no `a-trigger` attribute;
    >     > -   `submit`: automatically generated on `form` if element has no `a-trigger` attribute;
    >     > -   `lazy`: when controller on view port request event once;
    >     > -   `tick`: `tick;interval_ms;run_n_times`, n times can also be negative number to make
    >     >     it request for indefinite times (usefull for long polling);
    >     > -   `lazy_tick`: `lazy_tick;interval_ms;run_n_times`, the same as tick, however it only
    >     >     starts when controller is in view port;
-   `[a-debounce]`: ms
    > -   only for `controllers`;
    > -   debounce event by `a-debounce` value ms
-   `[a-]`
    > -   for anchor tags only;
    > -   partial renderer to overwrite route change behaviour into ajax actions to documents
    >     partial instead of full page render;
-   `[a-path]`
    > -   only for `views`;
    > -   url end point;
    > -   automatically generated on `a` (from `href`) and `form` (from `action`);
-   `[a-view]`
    > -   only for `views`;
    > -   value:
    >     > -   `{viewValue1};{viewValue2};...{viewValueN}` (notice that it must have curly braces
    >     >     closure);
-   `[a-method]`
    > -   only for `views`;
    > -   http request method;
-   `[a-token_name]`
    > -   only for non `get` http method views;
    > -   for csrf\_${a-token_name_value};
    > -   should be generated from backend;
-   `[a-token_value]`
    > -   only for non `get` http method views;
    > -   for csrf\_${a-token_value_value};
    > -   should be generated from backend;
-   `[a-timeout]`: ms
    > -   only for `views`;
    > -   if request doesn't returns on the timeout render `a-failed_text`;
    > -   `[a-failed_text]`:
    >     > -   only for `views`;
    >     > -   render its string to innerText;
    > -   `[a-failed]`:
    >     > -   automatically assigned when `a-timeout` is triggered;
-   `[a-on_loading]`
    > -   only for `views`;
    > -   target `__AOnLoadings_method` to animate transition and/or running async script during
    >     `[a-loading]`
    >     > -   if you only wanted to animate your element, then no need to extends our
    >     >     `\_\_AOnLoadings`, you can just make uses `[a-loading]` on your css;
-   `[a-keep]`
    > -   unique string to keep element upon route change;

```css
/* most browser already supports nested css selector natively */

[a-loading] {
	&.your_selector,
	& .your_selector {
		/* css code */
	}

	&[your_other_selector],
	& [your_other_selector] {
		/* css code */
	}
}
```

-   `[a-lazy]`
    > -   automatically assigned using `[a-trigger='lazy']`;
-   `[a-loading]`
    > -   automatically assigned during ajax request;
-   `[a-keep]`
    > -   on `script` tag: to identify script that are not run more than once (use with conjunction
    >     with `src`);
    > -   on other tag in the `body` tag: depends on the value of `a-keep` on incoming route change
    >     request, it will place the old element to the new place on the html document;

## On client script behaviours

-   only `script` tag with no `src` and `a-keep` will be re-run;
    > -   unless `[method='module']`, then as per html standard specification it will be only run
    >     once;
-   some of `script` tag may cause errors (including but not limited to, pre compiled bootsrap.js)
    when re-run, so you need to make sure to put `a-keep` on that script;
    > -   if you put it in the `head` tag, it also need to have exact same outerHTML and (`src`,
    >     with value, and `a-keep` attribute) ;
-   this library have no history library as dependency:
    > -   on popstate event, it will request fresh page from backend;
    > -   it's by design, to check whether there's change in the data;
    > -   for in HATEOAS backend should be the only source of truth;
-   ajax request will allways replace `outerHTML` of the views by design;
    > -   you don't select the element by using `css selector`, you select them by adding view to
    >     them instead;
    > -   then that views will make request to its own `a-path` attribute's value, with its own
    >     `a-method` method;
-   views with the same `viewName` fragment will request at the same time using `Promise.all` api;
-   `[a-trigger='lazy']` which intersect on viewport at the same time, will also be handled using
    `Promise.all` api;
-   controller can also act as view, by setting its `a-controller` to `"self;"`;
    > -   on `a` and `form` tag if you don't specify `a-controller` it will be assigned as
    >     `"self;"`;
-   request header on each request is set with `atlaAS-client-from` the value is curent
    `window.location.href`;
    > -   on php case it can be read using $\_SERVERS['HTTP_ATLAAS_CLIENT_FROM'];

## Library Naming Convenience

-   classes that are **PREFIXED** with "\_\_" are globals, can be accessed with its "\_\_" static
    method, no need to be instantiated after the `__atlaAS_client(...args).run()` script;
-   classes that are **PREFIXED** with "\_" are meant to be used in your app;
-   classes that are **NOT PREFIXED** with any "\_" are meant for library internals;

## Credit(s)

this library is inspired by:

-   htmx.js: *https://htmx.org/*
    > -   more precisely it's HATEOAS paradigm in general;
