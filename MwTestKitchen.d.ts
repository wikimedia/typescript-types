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

interface UnsampledInstrument {
	setSchema(): UnsampledInstrument;
	isInSample(): boolean;
	use( instrument: UnsampledInstrument ): UnsampledInstrument;
	send( action: string, interactionData: Object,
		contextualAttributes: Object ): void;
	submitInteraction( action: string, interactionData: Object,
		contextualAttributes: Object ): void;
}

interface MwTestKitchen {
	clearExperimentOverride: ( experimentName: string ) => void;
	clearExperimentOverrides(): void;
	getAssignments(): Record<string, string>;
	overrideExperimentGroup: ( experimentName: string, groupName: string ) => void;
	getExperiment: ( experimentName: string ) => TestKitchenExperiment;
	getExperimentsByPrefix: ( experimentNamePrefix: string ) => TestKitchenExperiment[];
	getInstrument: () => UnsampledInstrument;
}
