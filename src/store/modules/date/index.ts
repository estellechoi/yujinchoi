import { RootState } from '@/store/index'
import { Module } from 'vuex'
import getters from './getters'
import mutations from './mutations'
import state from './state'

export interface State {
	displayDateTime: Date
}

export const store: Module<State, RootState> = {
	namespaced: true,
	state,
	getters,
	mutations,
}
