import { RootState } from '@/store'
import { GetterTree } from 'vuex'
import { State } from './index'

export type Getters = {
	getDisplayDateTime(state: State): State['displayDateTime']
	getDisplayHours(state: State): number
	getDisplayMinutes(state: State): number
	getDisplaySeconds(state: State): number
}

const getters: GetterTree<State, RootState> & Getters = {
	getDisplayDateTime: (state) => state.displayDateTime,
	getDisplayHours: (state) => state.displayDateTime.getHours(),
	getDisplayMinutes: (state) => state.displayDateTime.getMinutes(),
	getDisplaySeconds: (state) => state.displayDateTime.getSeconds(),
}

export default getters
