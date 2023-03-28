interface OoEventEmitter {
	once( event: string, listener: Function ): OoEventEmitter;
	on(
		event: string,
		method: Function|string,
		args?: Array<any>,
		context?: Object
	): OoEventEmitter;
	connect( context: object, methods: object ): OoEventEmitter;
}

interface OOjs {
	ui: {
		infuse( idOrNode: string|HTMLElement|JQuery, config?: Object ): OoUiElement;
		confirm( text: JQuery|string, options?: object ): JQuery.Promise<any>;
		PopupWidget: OoUiPopupWidgetConstructor;
	};
}

declare const OO: OOjs;
