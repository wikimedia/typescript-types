interface TestKitchenExperiment {
	getAssignedGroup(): string|null;
	isAssignedGroup( ...groups: string[] ): boolean;
	send(
		action: string,
		interactionData: Record<string, unknown>,
		contextualAttributes?: string[],
	): void;
	submitInteraction( action: string, interactionData: Record<string, unknown> ): void;
	sendExposure(): void;
	setStream( streamName: string ): this;
	setSchema( schemaID: string ): this;
}

interface MwTestKitchen {
	getExperiment: ( experimentName: string ) => TestKitchenExperiment;
}
