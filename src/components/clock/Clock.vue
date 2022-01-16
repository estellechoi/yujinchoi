<template>
	<div :style="clockWrapperCSSText">
		<div
			:class="$style.clock"
			@mouseover="showTooltip"
			@mousemove="updateTooltipOffset"
			@mouseout="hideTooltip"
			@mouseleave="hideTooltip"
		>
			<div :class="$style.clockWall">
				<ClockHand
					:class="$style.clockHand"
					type="hours"
					:time="getClockTime"
					:size="clockHandSize"
				/>
				<ClockHand
					:class="$style.clockHand"
					type="minutes"
					:time="getClockTime"
					:size="clockHandSize"
				/>
				<ClockHand
					:class="$style.clockHand"
					type="seconds"
					:time="getClockTime"
					:size="clockHandSize"
				/>
			</div>
			<Tooltip
				v-show="isTooltipVisible"
				:label="tooltipLabel"
				:class="$style.tooltip"
				:style="tooltipCSSText"
				aria-hidden="true"
			/>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue'
	import { mapGetters } from 'vuex'
	import ClockHand from '@/components/clock/ClockHand.vue' // @ is an alias to /src
	import Tooltip from '@/components/tooltip/Tooltip.vue' // @ is an alias to /src
	import { ClockSize } from '@/components/clock/types'
	import utils from '@/utils/index'

	export default defineComponent({
		name: 'Clock',
		components: { ClockHand, Tooltip },
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
		},
		data() {
			return {
				interval: 0,
				isTooltipVisible: false,
				tooltipX: 0,
				tooltipY: 0,
			}
		},
		computed: {
			...mapGetters('clock', ['getClockTime']),
			clockWrapperCSSText(): string {
				return `width: ${this.size}px`
			},
			clockHandSize(): number {
				return this.size / 50
			},
			tooltipLabel(): string {
				return `${this.getClockTime}`
			},
			tooltipCSSText(): string {
				const MARGIN = 30
				const tooltipX = this.tooltipY - MARGIN
				const tooltipY = this.tooltipX + MARGIN
				return `top: ${tooltipX}px; left: ${tooltipY}px;`
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
			updateTooltipOffset(evt: MouseEvent) {
				this.tooltipX = evt.offsetX
				this.tooltipY = evt.offsetY
			},
			showTooltip() {
				this.isTooltipVisible = true
			},
			hideTooltip() {
				this.isTooltipVisible = false
			},
		},
	})
</script>

<style lang="scss" module>
	@import '@/styles/index';

	.clock {
		position: relative;
		width: 100%;
		height: 0;
		padding-bottom: 100%;
		aspect-ratio: 1;
		background: $color-white;
		border-radius: 50%;
		box-shadow: $box-shadow-black;
		overflow: visible;

		.clockWall,
		.clockHand,
		.tooltip {
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

		.tooltip {
			z-index: 2;
		}
	}
</style>
