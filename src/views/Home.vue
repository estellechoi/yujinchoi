<template>
	<div :class="$style.layout">
		<Clock
			:class="$style.clock"
			:hours="getDisplayHours"
			:minutes="getDisplayMinutes"
			:seconds="getDisplaySeconds"
		/>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue'
	import { mapGetters } from 'vuex'
	import Clock from '@/components/clock/Clock.vue'

	export default defineComponent({
		name: 'Home',
		components: { Clock },
		computed: {
			...mapGetters('date', [
				'getDisplayHours',
				'getDisplayMinutes',
				'getDisplaySeconds',
			]),
		},
		created() {
			this.startClockInterval()
		},
		methods: {
			startClockInterval() {
				window.setInterval(() => {
					this.updateDisplayDateTime()
				}, 1000)
			},
			updateDisplayDateTime() {
				this.$store.commit(
					'date/SET_DISPLAY_DATE_TIME',
					this.getCurrentKorDateTime()
				)
			},
			getCurrentKorDateTime(): Date {
				const now = new Date()
				const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000
				const KOR_TIME_DIFF = 9 * 60 * 60 * 1000
				const korNow = new Date(utcNow + KOR_TIME_DIFF)
				return korNow
			},
		},
	})
</script>

<style lang="scss" module>
	@import '@/styles/index';

	$clock-size: $size-4 * 10;
	$clock-hand-size: $size-1;

	.layout {
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;

		.clock {
			width: $clock-size;
			height: $clock-size;
			font-size: $clock-hand-size;
			margin: 0 auto;
			transform: translateY(-$size-6);
		}
	}
</style>
