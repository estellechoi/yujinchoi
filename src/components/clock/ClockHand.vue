<template>
	<div :class="[$style.clockHand, $style[classNameByType]]" :style="CSSText">
		<span :class="$style.clockHandLabel" aria-live="polite">{{ label }}</span>
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue'
	import { ClockType, ClockUtils } from './types'

	const clockUtils: ClockUtils = {
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
			size: {
				type: Number as PropType<number>,
				required: true,
			},
			time: {
				type: Date as PropType<Date>,
				default: new Date(),
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
			value(): number {
				const hours = this.time.getHours()
				const minutes = this.time.getMinutes()
				const seconds = this.time.getSeconds()
				let time: number

				switch (this.type) {
					case 'hours':
						time = hours + minutes / 60 + seconds / 360
						break
					case 'minutes':
						time = minutes + seconds / 60
						break
					case 'seconds':
						time = seconds
						break
					default:
						time = hours + minutes / 60 + seconds / 360
				}
				return time
			},
			degCSSText(): string {
				const unitDeg = clockUtils[this.type].unitDeg
				const deg = unitDeg * (this.accmValue + this.value)
				return `transform: rotateZ(${deg}deg)`
			},
			sizeCSSText(): string {
				return `font-size: ${this.size}px`
			},
			CSSText(): string {
				return `${this.degCSSText};${this.sizeCSSText}`
			},
			classNameByType(): string {
				return clockUtils[this.type].className
			},
			label(): string {
				return `${Math.floor(this.value)}${clockUtils[this.type].label}`
			},
		},
	})
</script>

<style lang="scss" module>
	@import '@/styles/index';

	.clockHand {
		width: 1em;
		height: 8em;
		background: $color-primary;
		border-radius: $radius-m;
		transform: rotateZ(0);
		transform-origin: bottom left;
		transition: transform 0.4s linear;

		&.clockHandMin {
			height: 14em;
		}

		&.clockHandSec {
			width: 0.4em;
			height: 16em;
		}

		.clockHandLabel {
			@include hiddenAlt;
		}
	}
</style>
