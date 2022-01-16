<template>
	<div :class="$style.layout">
		<Clock
			data-test="clock"
			:class="$style.clock"
			:time="new Date()"
			:size="200"
			:is-live="true"
			:show-minute-hand="true"
			:show-second-hand="true"
			@mouseover="showTooltip"
			@mousemove="updateTooltipPosition"
			@mouseout="hideTooltip"
			@mouseleave="hideTooltip"
		/>
		<Tooltip
			v-if="isTooltipVisible"
			data-test="tooltip"
			:label="tooltipLabel"
			:class="$style.tooltip"
			:style="tooltipCSSText"
			aria-hidden="true"
		/>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue'
	import { mapGetters } from 'vuex'
	import Tooltip from '@/components/tooltip/Tooltip.vue' // @ is an alias to /src
	import Clock from '@/components/clock/Clock.vue'

	export default defineComponent({
		name: 'Home',
		components: { Clock, Tooltip },
		data() {
			return {
				isTooltipVisible: false,
				tooltipX: 0,
				tooltipY: 0,
			}
		},
		computed: {
			...mapGetters('clock', ['getClockTime']),
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
		methods: {
			updateTooltipPosition(evt: MouseEvent) {
				this.tooltipX = evt.clientX
				this.tooltipY = evt.clientY
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

	.layout {
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;

		.clock {
			margin: 0 auto;
			transform: translateY(-$size-6);
		}

		.tooltip {
			position: absolute;
		}
	}
</style>
