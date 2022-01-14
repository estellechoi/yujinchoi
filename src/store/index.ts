import { State as DateState, store as date } from '@/store/modules/date/index'
import { createStore } from 'vuex'

export interface RootState {
	date: DateState
}

export default createStore({
	modules: { date },
	strict: process.env.NODE_ENV !== 'production',
})
