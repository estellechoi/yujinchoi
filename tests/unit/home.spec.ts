import Home from '@/views/Home.vue';
import { shallowMount } from '@vue/test-utils';
import { createStore } from "vuex";

describe('Home.vue', () => {
	it('renders tooltip on mouseover', async () => {

		const clock = {
			namespaced: true,
			state: {
				clockTime: new Date(),
			},
			getters: {
				getClockTime: jest.fn(),
			},
		}

		const store = createStore({
			modules: { clock }

		  });

		  
		const wrapper = shallowMount(Home, {
			global: {
				plugins: [store]
			}
		})

		await wrapper.get('[data-test="clock"]').trigger('mouseover')
		expect(wrapper.find('[data-test="tooltip"]').exists()).toBe(true)

		await wrapper.get('[data-test="clock"]').trigger('mouseout')
		expect(wrapper.find('[data-test="tooltip"]').exists()).toBe(false)

		await wrapper.get('[data-test="clock"]').trigger('mouseover')
		expect(wrapper.find('[data-test="tooltip"]').exists()).toBe(true)

		await wrapper.get('[data-test="clock"]').trigger('mouseleave')
		expect(wrapper.find('[data-test="tooltip"]').exists()).toBe(false)
	})
})
