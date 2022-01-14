<template>
	<div
		:class="[$style.clockHand, $style[classNameByType]]"
		:style="degreeCSSText"
	>
		<span :class="$style.clockHandLabel" aria-live="polite">{{ label }}</span>
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue'
	import { ClockType, ClockData } from './types'

	const clockData: ClockData = {
		hours: {
			unitDeg: 30,
			label: '시',
			className: '',
		},
		minutes: {
			unitDeg: 6,
			label: '분',
			className: 'clockHandMin',
		},
		seconds: {
			unitDeg: 6,
			label: '초',
			className: 'clockHandSec',
		},
	}

	export default defineComponent({
		name: 'ClockHand',
		props: {
			type: {
				type: String as PropType<ClockType>,
				required: true,
			},
			value: {
				type: Number as PropType<number>,
				default: 0,
			},
		},
		data() {
			return {
				accmValue: 0,
			}
		},
		watch: {
			value(newVal: number, oldVal: number) {
				if (newVal === 0 && newVal !== oldVal) {
					this.accmValue += oldVal
				}
			},
		},
		computed: {
			classNameByType(): string {
				return clockData[this.type].className
			},
			degreeCSSText(): string {
				const unitDeg = clockData[this.type].unitDeg
				const deg = unitDeg * (this.accmValue + this.value)
				return `transform: rotateZ(${deg}deg)`
			},
			label(): string {
				return `${this.value}${clockData[this.type].label}`
			},
		},
	})
</script>

<style lang="scss" module>
	@import '@/styles/index';

	.clockHand {
		// font-size: 1px;
		width: 1em;
		height: 8em;
		background: $color-primary;
		border-radius: $radius-m;
		transform: rotateZ(0);
		transform-origin: bottom left;
		transition: transform 0.4s linear;

		&.clockHandMin {
			height: 12em;
		}

		&.clockHandSec {
			width: 0.6em;
			height: 12em;
		}

		.clockHandLabel {
			@include hiddenAlt;
		}
	}
</style>
