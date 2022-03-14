/// <reference path="MwEcho.d.ts" />

interface MwApi {
	saveOption( name: string, value: unknown ): JQuery.Promise<any>;
	get( parameters: Object, ajaxOptions?: Object ): JQuery.Promise<any>;
	postWithToken( tokenType: string, params: Object, ajaxOptions?: Object ): JQuery.Promise<any>;
}

interface MwTitle {
	getPrefixedText(): string
	getTalkPage(): MwTitle|null
	getUrl( params?: Object ): string
}

type MwTitleConstructor = new( title: string, namespace?: number ) => MwTitle;

type MwApiConstructor = new( options?: Object ) => MwApi;

interface MwCookie {
	get( cookieName: string ): () => string
}

interface MwUri {
	extend( parameters: object ): object;
	new ( uri?: Object|string, options?: Object|boolean ): MwUri;
	query: Record<string, unknown>;
	toString(): string;
}

interface MwEventLog {
	eventInSample( population: Object ): () => boolean;
	inSample( num: number ): () => boolean;
	logEvent( schema: string, data: Object ): () => void;
}

type UriConstructor = new( uri: string, options?: Object ) => MwUri;

interface mwHookInstance {
	add( fn: Function ): () => void;
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
	get( key: string ): () => string;
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

interface MwExperimentBucket {
	name: string,
	enabled: boolean,
	buckets: Record<'A'|'B'|'control', number>
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
	util: {
		/**
		 * @param {string} parameter name
		 */
		getParamValue( param: string ): string
		/**
		 * @param pageName
		 * @param params
		 */
		getUrl( pageName?: string, params?: Object ): string;
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
		 * @return {bool}
		 */
		isPortletVisible( id: string ): boolean,
		/**
		 * Return a wrapper function that is debounced for the given duration.
		 *
		 * When it is first called, a timeout is scheduled. If before the timer
		 * is reached the wrapper is called again, it gets rescheduled for the
		 * same duration from now until it stops being called. The original function
		 * is called from the "tail" of such chain, with the last set of arguments.
		 *
		 * @since 1.34
		 * @param {number} delay Time in milliseconds
		 * @param {Function} callback
		 * @return {Function}
		 */
		debounce( delay: number, callback: Function ): () => void;
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
		using( moduleName: string|string[]|null, ready?: Function, error?: Function ): JQuery.Promise<any>;

		/**
		 * Load a given resourceLoader module.
		 *
		 * @param moduleName
		 */
		load( moduleName: string|null ): () => void;
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

	requestIdleCallback( callback: Function ): () => void;

	/**
	 * Get a hook
	 *
	 * @param event
	 */
	trackSubscribe( event: string, handler: ( topic: string, data: object ) => void ): () => void;
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
