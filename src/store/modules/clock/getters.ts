import { RootState } from '@/store'
import { GetterTree } from 'vuex'
import { State } from './index'

export type Getters = {
	getClockTime(state: State): State['clockTime']
}

const getters: GetterTree<State, RootState> & Getters = {
	getClockTime: (state) => state.clockTime,
}

export default getters
