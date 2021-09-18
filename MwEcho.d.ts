/// <reference path="OOjs.d.ts" />
/// <reference path="OOUI.d.ts" />

interface MwEchoApi {
	fetchNotifications(
		type: string,
		sources?: string|string[],
		isForced?: boolean,
		filters?: Object
	): Promise<any>;
	markAllRead( source: string, type: string|string[] ): Promise<any>;
}

type EchoApiConstructor = new ( config?: Object ) => MwEchoApi;

interface MwEchoDmModelManager extends OoEventEmitter {
	getFiltersModel(): MwEchoDmFiltersModel;
}

type ModelManagerConstructor = new ( counter: MwEchoDmUnreadNotificationCounter, config?: Object )
	=> MwEchoDmModelManager;

interface MwEchoDmFiltersModel extends OoEventEmitter {
	getSourcePagesModel(): MwEchoDmSourcePagesModel;
}

interface MwEchoDmSourcePagesModel extends OoEventEmitter {
	getCurrentSource(): string;
}

interface MwEchoDmUnreadNotificationCounter extends OoEventEmitter {}

type UnreadNotificationCounterConstructor = new (
	api: MwEchoApi,
	type: string,
	max: number,
	config?: Object
) => MwEchoDmUnreadNotificationCounter;

interface MwEchoUiNotificationBadgeWidget extends OoUiWidget {
	popup: OoUiPopupWidget;
	markAllReadButton: OoUiButtonWidget;
}

type NotificationBadgeWidgetConstructor = new (
	controller: MwEchoController,
	manager: MwEchoDmModelManager,
	links: Object,
	config?: Object
) => MwEchoUiNotificationBadgeWidget;

interface MwEchoController {}

type ControllerConstructor = new ( echoApi: MwEchoApi, manager: MwEchoDmModelManager )
	=> MwEchoController;

interface MwEcho {
	api: {
		EchoApi: EchoApiConstructor;
	};
	ui: {
		NotificationBadgeWidget: NotificationBadgeWidgetConstructor;
		$overlay: JQuery<HTMLElement>;
		alertWidget: MwEchoUiNotificationBadgeWidget;
		messageWidget: MwEchoUiNotificationBadgeWidget;
		widget: MwEchoUiNotificationBadgeWidget;
	};
	dm: {
		UnreadNotificationCounter: UnreadNotificationCounterConstructor;
		ModelManager: ModelManagerConstructor;
	};
	Controller: ControllerConstructor;
}
