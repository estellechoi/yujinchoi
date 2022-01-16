import { MutationTree } from 'vuex'
import { State } from './index'
import { MutationTypes } from './mutation-types'

type Mutations<S = State> = {
	[MutationTypes.SET_CLOCK_TIME](state: S, payload: Date): void
}

const mutations: MutationTree<State> & Mutations = {
	[MutationTypes.SET_CLOCK_TIME](state, payload) {
		state.clockTime = payload
	},
}

export default mutations
