interface MwSafeStorage {
	remove( key: string ): void;
	get( key: string ): string;
	set( key: string, value: string, expiry?: number ): boolean;
}

interface MwStorage extends MwSafeStorage {
	session: MwSafeStorage;
	store: MwSafeStorage;
}


declare module 'mediawiki.storage' {
	const storage: MwStorage;
	export = storage;
}
