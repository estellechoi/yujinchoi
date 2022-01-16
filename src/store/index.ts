import {
	State as ClockState,
	store as clock,
} from '@/store/modules/clock/index'
import { createStore } from 'vuex'

export interface RootState {
	clock: ClockState
}

export default createStore({
	modules: { clock },
	strict: process.env.NODE_ENV !== 'production',
})
