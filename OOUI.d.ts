/// <reference path="OOjs.d.ts" />

interface OoUiElement {
	$element: JQuery<HTMLElement>;
	toggle( show?: boolean ): OoUiElement;
}

interface OoUiWidget extends OoUiElement, OoEventEmitter {}

interface OoUiButtonWidget extends OoUiWidget {}

interface OoUiPopupWidget extends OoUiWidget {
	constructor( options: Object );
}

type OoUiPopupWidgetConstructor = new( options?: Object ) => OoUiPopupWidget;
