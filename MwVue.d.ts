import 'vue';

declare module 'vue' {
    // MediaWiki's `vue` ResourceLoader module adds this at runtime;
    // upstream `vue` has no equivalent.
    export const createMwApp: typeof import( 'vue' ).createApp;
}
