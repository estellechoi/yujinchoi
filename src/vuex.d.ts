// https://github.com/estellechoi/TIL/blob/master/docs/typescript/cheatsheet.md
import { RootState } from '@/store/index'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
	// provide typings for `this.$store`
	interface ComponentCustomProperties {
		$store: Store<RootState>
	}
}
