/* eslint-disable */

declare module 'vue/types/vue' {
	interface Vue {
		// Augmentation to allow css-modules in .vue files:
		$style: { [key: string]: any }
	}
}
