<template>
	<div :style="clockWrapperCSSText">
		<div :class="$style.clock">
			<div :class="$style.clockWall">
				<div v-for="(item, index) in clockHandMetas" :key="index">
					<ClockHand
						v-if="item.show"
						:class="$style.clockHand"
						:type="item.type"
						:time="getClockTime"
						:size="clockHandSize"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue'
	import { mapGetters } from 'vuex'
	import ClockHand from '@/components/clock/ClockHand.vue' // @ is an alias to /src
	import { ClockSize, ClockHandMeta } from '@/components/clock/types'
	import utils from '@/utils/index'

	export default defineComponent({
		name: 'Clock',
		components: { ClockHand },
		props: {
			time: {
				type: Date,
				default: new Date(),
			},
			isLive: {
				type: Boolean as PropType<boolean>,
				default: false,
			},
			size: {
				type: Number as PropType<ClockSize>,
				default: 200,
			},
			showMinuteHand: {
				type: Boolean as PropType<boolean>,
				default: false,
			},
			showSecondHand: {
				type: Boolean as PropType<boolean>,
				default: false,
			},
		},
		data() {
			return {
				interval: 0,
			}
		},
		computed: {
			...mapGetters('clock', ['getClockTime']),
			clockHandMetas(): ClockHandMeta[] {
				return [
					{
						type: 'hours',
						show: true,
					},
					{
						type: 'minutes',
						show: this.showMinuteHand,
					},
					{
						type: 'seconds',
						show: this.showSecondHand,
					},
				]
			},
			clockWrapperCSSText(): string {
				return `width: ${this.size}px`
			},
			clockHandSize(): number {
				return this.size / 50
			},
		},
		created() {
			this.initClock()
		},
		beforeUnmounted() {
			if (this.interval) this.clearClockInterval()
		},
		methods: {
			initClock() {
				this.updateTime(this.time)
				if (this.isLive) this.startClockInterval(this.time)
			},
			startClockInterval(startTime: Date) {
				let currentTime = startTime
				this.interval = window.setInterval(() => {
					currentTime = utils.getTimeAdded(currentTime, 1, 'second')
					this.updateTime(currentTime)
				}, 1000)
			},
			updateTime(newTime: Date) {
				this.$store.commit('clock/SET_CLOCK_TIME', newTime)
			},
			clearClockInterval() {
				window.clearInterval(this.interval)
			},
		},
	})
</script>

<style lang="scss" module>
	@import '@/styles/index';

	.clock {
		position: relative;
		width: 100%;
		aspect-ratio: 1;
		background: $color-white;
		border-radius: 50%;
		box-shadow: $box-shadow-black;
		overflow: visible;

		.clockWall,
		.clockHand {
			position: absolute;
		}

		.clockWall,
		.clockHand {
			pointer-events: none;
		}

		.clockWall {
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			display: flex;
			justify-content: center;
			align-items: center;

			&::after {
				position: relative;
				z-index: 2;
				content: '';
				width: 6%;
				height: 6%;
				background: $color-white;
				box-shadow: $box-shadow-black-deep;
				border-radius: 50%;
			}
		}

		.clockHand {
			bottom: 50%;
			left: 50%;
		}
	}
</style>
