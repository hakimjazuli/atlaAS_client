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

**OR**

-   OPTIONS (**if don't want to build it your self**):

    > -   download a copy of `./prebundled.mjs` from
    >     > -   [nightly build](https://github.com/hakimjazuli/atlaAS_client)
    >     > -   [npm release(s)](https://www.npmjs.com/package/@html_first/atla-as_client?activeTab=versions)
    > -   add on window object `window['a-on_loading']` = `Object.<string,(modifier:_$)=>void`>
    > -   add on window object `window['a-raw']` =
    >     `Object.<string,(text_response:string,modifier:_$)=>void`>
    > -   where `_$` is an object of
    >     [\_\$ class](https://www.npmjs.com/package/@html_first/element_modifier)
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

**why build it your self instead of using prebundled?**

-   you wouldn't
    > -   get type hinting;
    > -   able to redefine of our html attributes to your needs, expecially if `a-${modifier}` are
    >     already taken by other library you install;
    > -   able to manually modify our class behaviour to your needs;

## How to install

1. install package from npm

```shell
npm i @html_first/atla-as_client
```

2. extending \_\_AOnLoadings into `AOnLoadings.mjs` and \_\_AOnRaw into `AOnRaw.mjs` like this

```js
// AOnLoadings.mjs
// @ts-check

import { __AOnLoadings } from '@html_first/atla-as_client/';
/**
 * @typedef {import('@html_first/element_modifier')._$} _$
 */

export AOnLoadings = new __AOnLoadings({});

// AOnRaw.mjs
// @ts-check

import { __AOnRaw } from '@html_first/atla-as_client/';
/**
 * @typedef {import('@html_first/element_modifier')._$} _$
 */

export const AOnRaw = new __AOnRaw({});

```

3. set build entry point `index.mjs`

```js
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
```

4. bundling
    > - you either use your own prefered bundler to bundle `index.mjs` to then load it into your
    >   html

```html
<script type="module" src="/path/to/your/bundled.mjs" defer a-keep></script>
```

4.  -   or you can use our rollup dev-dependency bundler

## Bundling using our rollup dev-dependency bundler

1. setup `/rollup.config.mjs`

```js
// @ts-check

import { _RollupSettings, _RollupTarget } from '@html_first/atla-as_builder';

const targets = [new _RollupTarget('prebundled', './builder/index.mjs', `./`)];

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
-   `views`: are element that used (its `outerHTML`, or `innerText` in case of `a-failed`) to
    display the ajax response;
    > -   it have information of
    >     > -   what controller event it should listen to;
    >     > -   and which `end point` it should request to;

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
    > -   use curly braces to wrap named value matched with `[a-val]` as lookup value;
    > -   use square braces to wrap named query params matched with curent uri as lookup value;
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
-   `[a-val]`
    > -   only for HTMLInputElement or HTMLSelectElement;
    > -   will modify `[a-path]` value inside curly braces matched with `[a-val]` element value;

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
-   ajax request will allways replace `outerHTML` (`innerHTML` in case of `[a-failed]`) of the views
    by design;
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
-   `script` tag that are rendered using pratial `a-` will not be run;
    > -   all of script should be placed either inside `head` tag with `defer`|`async` attribute or
    >     inside `body` before its closing tag `</body>`

## Library Naming Convenience

-   classes that are **PREFIXED** with "\_\_" are globals, can be accessed with its "\_\_" static
    method, no need to be instantiated after the `__atlaAS_client(...args).run()` script;
-   classes that are **PREFIXED** with "\_" are meant to be used in your app;
-   classes that are **NOT PREFIXED** with any "\_" are meant for library internals;

## Credit(s)

this library is inspired by:

-   htmx.js: *https://htmx.org/*
    > -   more precisely it's HATEOAS paradigm in general;
