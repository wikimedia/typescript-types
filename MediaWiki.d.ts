/// <reference path="MwEcho.d.ts" />

interface MwApiActionQuery {
	action: string
	formatversion?: number
	origin?: string
	prop?: string
	continue?: string
	uselang?: string
	// When sourced from wikitext
	titles?: string[]
	// local descriptions
	ppprop?: string
	// PageImages
	pilimit?: number
	piprop?: string
	pithumbsize?: number
	// When using TextExtracts
	exsentences?: string
	exintro?: string
	explaintext?: string
	// Cirrus Search
	generator?: string
	maxage?: number
	smaxage?: number
	gsrqiprofile?: string
	gsrlimit?: number
	gsrnamespace?: string
	gsrsearch?: string
}

interface MwApiQueryResponse {
	query: {
		pages: MwApiPageObject[]
	}
}
interface MwApiPagePropsObject {
	description: string
}

interface MwApiThumbnailObject {
	width: number
	height: number
	source: string
}

interface MwApiPageObject {
	title: string
	description?: string
	extract?: string
	thumbnail?: MwApiThumbnailObject
	pageprops?: MwApiPagePropsObject
}

interface MwTemplateRenderer {
	render( data: Object, partials: Object ): JQuery;
}

interface MwTemplateCompiler {
	compile( templateStr: string ): MwTemplateRenderer;
}

interface MwTemplate {
	getCompiler( compilerName: string ): MwTemplateCompiler;
}

interface MwApi {
	saveOption( name: string, value: unknown ): JQuery.Promise<any>;
	get( parameters: Object, ajaxOptions?: Object ): JQuery.Promise<MwApiQueryResponse|any>;
	postWithToken( tokenType: string, params: Object, ajaxOptions?: Object ): JQuery.Promise<any>;
}

interface MwTitle {
	getPrefixedText(): string
	getTalkPage(): MwTitle|null
	getUrl( params?: Object ): string
}

type MwTitleConstructor = new( title: string, namespace?: number ) => MwTitle;

type MwApiConstructor = new( options?: Object ) => MwApi;

interface MwCookieOptions {
	expires?: Date|number|null;
	prefix?: string;
	domain?: string;
	path?: string;
	secure?: boolean;
	sameSite?: string;
	sameSiteLegacy?: boolean;
}

interface MwCookie {
	get( cookieName: string ): string|null
	set( cookieName: string, value: string|null, options?: MwCookieOptions ): void;
}

interface MwUri {
	extend( parameters: object ): object;
	new ( uri?: Object|string, options?: Object|boolean ): MwUri;
	query: Record<string, unknown>;
	toString(): string;
}

interface MwEventLog {
	eventInSample( population: Object ): boolean;
	inSample( num: number ): boolean;
	logEvent( schema: string, data: Object ): void;
}

type UriConstructor = new( uri: string, options?: Object ) => MwUri;

type mwHookFunction = {
	( ...args: any[] ): void;
};

interface mwHookInstance {
	add( fn: mwHookFunction ): this;
	/**
	 * Fire an event for logging.
	 */
	fire( ...args: any[] ): this;
}

interface MwMessage {
	/**
	 * Parse the wikitext message into HTML.
	 * Requires jqueryMsg to be useful.
	 */
	parse(): string;
	/**
	 * Return the message as plain text.
	 */
	plain(): string;
	/**
	 * Format the message with text transformations.
	 * Requires jqueryMsg to be useful.
	 */
	text(): string;
	/**
	 * text(), HTML-escaped.
	 */
	escaped(): string;
	/**
	 * Whether the message exists (is loaded) or not.
	 */
	exists(): boolean;
}

/**
 * Possible MwMessage parameter types.
 * HTMLElement and JQuery require jqueryMsg.
 */
type MwMessageParam = string | number | HTMLElement | JQuery;

interface MwStorageMap {
	get( key: string ): string;
}

interface MwStorage {
	session: MwStorageMap
}

interface MwUser {
	options: MwMap,
	id(): string;
	getGroups( callback: Function ): JQuery.Promise<any>;
	getId(): number;
	getName(): string;
	isAnon(): boolean;
	generateRandomSessionId(): string;
	sessionId(): string;
}

interface MwLogger {
	warn( ...args: any[] ): void;
}

interface MwExperimentBucket {
	name: string,
	enabled: boolean,
	buckets: Record<string, number>
}

interface MwExperiments {
	getBucket( bucket: MwExperimentBucket, token: string ): string;
}

interface MwMap {
	get( configKey: string|null, fallback?: any|null ): any;
	set( configKey: string|null, value: any|null ): void;
}
interface MediaWiki {
	cookie: MwCookie,
	Map: MwMap,
	storage: MwStorage,
	echo?: MwEcho,
	eventLog?: MwEventLog,
	experiments: MwExperiments;
	log: MwLogger;
	util: {
		/**
		 * @param {string} [hash] Hash fragment, without the leading '#'.
		 */
		getTargetFromFragment( hash?: string ): HTMLElement|null;
		/**
		 * @param {string} parameter name
		 */
		getParamValue( param: string ): string;
		/**
		 * @param pageName
		 * @param params
		 */
		getUrl( pageName?: string, params?: Object ): string;
		/**
 		 * @param {string} portletId ID of the target portlet (e.g. 'p-cactions' or 'p-personal')
 		 * @param {string} href Link URL
 		 * @param {string} text Link text
 		 * @param {string} [id] ID of the list item, should be unique and preferably have
 		 *  the appropriate prefix ('ca-', 'pt-', 'n-' or 't-')
 		 * @param {string} [tooltip] Text to show when hovering over the link, without accesskey suffix
 		 * @param {string} [accesskey] Access key to activate this link. One character only,
 		 *  avoid conflicts with other links. Use `$( '[accesskey=x]' )` in the console to
 		 *  see if 'x' is already used.
 		 * @param {HTMLElement|jQuery|string} [nextnode] Element that the new item should be added before.
 		 *  Must be another item in the same list, it will be ignored otherwise.
 		 *  Can be specified as DOM reference, as jQuery object, or as CSS selector string.
 		 * @fires util_addPortletLink
 		 * @return {HTMLElement|null} The added list item, or null if no element was added.
		 */
		addPortletLink(
			portletId: string, href: string, text: string,
			id?: string|null, tooltip?: string|null, accesskey?: string|null,
			nextnode?: HTMLElement|JQuery|string|null
		): HTMLElement|null;
		/**
		 * @param {string} id of portlet
		 */
		showPortlet( id: string ): string;
		/**
		 * @param {string} id of portlet
		 */
		hidePortlet( id: string ): void;
		/**
		 * @param {string} id of portlet
		 * @return {boolean}
		 */
		isPortletVisible( id: string ): boolean,
		/**
		 * Return a function, that, as long as it continues to be invoked, will not
		 * be triggered. The function will be called after it stops being called for
		 * N milliseconds. If `immediate` is passed, trigger the function on the
		 * leading edge, instead of the trailing.
		 *
		 * Ported from Underscore.js 1.5.2, Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud
		 * and Investigative Reporters & Editors, distributed under the MIT license, from
		 * <https://github.com/jashkenas/underscore/blob/1.5.2/underscore.js#L689>.
		 *
		 * @since 1.34
		 * @param {Function} func Function to debounce
		 * @param {number} [wait=0] Wait period in milliseconds
		 * @param {boolean} [immediate] Trigger on leading edge
		 * @return {Function} Debounced function
		 */
		debounce( callback: Function, delay?: number, immediate?: boolean ): () => void;
		/**
		 * Return a function, that, when invoked, will only be triggered at most once
		 * during a given window of time. If called again during that window, it will
		 * wait until the window ends and then trigger itself again.
		 *
		 * As it's not knowable to the caller whether the function will actually run
		 * when the wrapper is called, return values from the function are entirely
		 * discarded.
		 *
		 * Ported from OOUI.
		 *
		 * @param {Function} func Function to throttle
		 * @param {number} wait Throttle window length, in milliseconds
		 * @return {Function} Throttled function
		 */
		throttle( func: Function, wait: number ): () => void;
	};
	Api: MwApiConstructor;
	config: MwMap,
	loader: {
		/**
		 * Execute a function after one or more modules are ready.
		 *
		 * @param moduleName
		 * @param {Function} ready Callback to execute when all dependencies are
		 * ready.
		 * @param {Function} after Callback to execute if one or more dependencies
		 * failed.
		 */
		using( moduleName: string|string[]|null, ready?: Function, error?: Function ): JQuery.Promise<Function>;

		/**
		 * Load a given resourceLoader module.
		 *
		 * @param moduleName
		 */
		load( moduleName: string|null ): void;
		/**
		 * Get the loading state of the module.
		 * On of 'registered', 'loaded', 'loading', 'ready', 'error', or 'missing'.
		 *
		 * @param moduleName
		 */
		getState( moduleName: string|null ): string;
	},

	/**
	 * Formats the specified i18n message.
	 *
	 * @param key i18n message name
	 * @param parameters message arguments
	 */
	message( key: string, ...parameters: MwMessageParam[] ): MwMessage;

	/**
	 * Formats the specified i18n message string.
	 * Shortcut for `mw.message( key, ...parameters ).text()`.
	 *
	 * @param key i18n message name
	 * @param parameters message arguments
	 */
	msg( key: string, ...parameters: MwMessageParam[] ): string;

	/**
	 * Get a hook
	 *
	 * @param hookname
	 */
	hook( hookname: string ): mwHookInstance;
	/**
	 * @see mw.notification#notify
	 * @param {HTMLElement|HTMLElement[]|jQuery|MwMessage|string} message
	 * @param {Object} [options] See mw.notification#defaults for the defaults.
	 * @return {jQuery.Promise}
	 */
	notify(
		message: HTMLElement | HTMLElement[] | JQuery | MwMessage | string, options?: Object
	): JQuery.Promise<any>;

	/**
	 * Get current timestamp
	 */
	now(): number,

	requestIdleCallback( callback: Function ): number|void;

	template: MwTemplate;
	/**
	 * Get a hook
	 *
	 * @param event
	 */
	trackSubscribe( event: string, handler: ( topic: string, data: object ) => void ): void;
	/**
	 * Track an analytic event.
	 *
	 * See https://gerrit.wikimedia.org/g/mediawiki/core/+/d7fe1ff0fe52735b1f41e91879c9617b376e807d/resources/src/mediawiki.base/mediawiki.base.js#375.
	 *
	 * @param topic The topic name
	 * @param [data] The data describing the event
	 */
	track( topic: string, data?: Record<string, unknown>|number|string ): void;
	Title: MwTitleConstructor;
	user: MwUser;
	Uri: UriConstructor;
}

declare const mw: MediaWiki;
