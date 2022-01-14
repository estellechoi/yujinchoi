<template>
	<div
		:class="$style.clock"
		@mouseover="showTooltip"
		@mousemove="updateTooltipOffset"
		@mouseout="hideTooltip"
		@mouseleave="hideTooltip"
	>
		<ClockHand :class="$style.clockHand" type="hours" :value="hours" />
		<ClockHand :class="$style.clockHand" type="minutes" :value="minutes" />
		<ClockHand :class="$style.clockHand" type="seconds" :value="seconds" />
		<Tooltip
			v-show="isTooltipVisible"
			:label="tooltipLabel"
			:class="$style.tooltip"
			:style="tooltipCSSText"
			aria-hidden="true"
		/>
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue'
	import ClockHand from '@/components/clock/ClockHand.vue' // @ is an alias to /src
	import Tooltip from '@/components/tooltip/Tooltip.vue' // @ is an alias to /src

	export default defineComponent({
		setup() {
			return {}
		},
		components: { ClockHand, Tooltip },
		props: {
			hours: {
				type: Number as PropType<number>,
				default: 0,
			},
			minutes: {
				type: Number as PropType<number>,
				default: 0,
			},
			seconds: {
				type: Number as PropType<number>,
				default: 0,
			},
		},
		data() {
			return {
				isTooltipVisible: false,
				tooltipX: 0,
				tooltipY: 0,
			}
		},
		computed: {
			tooltipLabel(): string {
				return `${this.hours} : ${this.minutes} : ${this.seconds} KST`
			},
			tooltipCSSText(): string {
				const MARGIN = 20
				const tooltipX = this.tooltipY - MARGIN
				const tooltipY = this.tooltipX + MARGIN
				return `top: ${tooltipX}px; left: ${tooltipY}px;`
			},
		},
		methods: {
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
		height: 100%;
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

		.clockHand {
			bottom: 50%;
			left: 50%;
		}
	}
</style>
