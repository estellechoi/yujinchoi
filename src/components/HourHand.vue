<template>
	<div :class="$style.hourhand" :style="degreeCSSText"></div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue'

	export default defineComponent({
		name: 'HourHand',
		props: {
			hour: {
				type: Number as PropType<number>,
				default: 0,
			},
		},
		computed: {
			degree(): number {
				return 30 * this.hour
			},
			degreeCSSText(): string {
				return `transform: rotateZ(${this.degree}deg)`
			},
		},
	})
</script>

<style lang="scss" module>
	@import '@/styles/index';

	.hourhand {
		font-size: 4px;
		width: 2em;
		height: 20em;
		background: $color-primary;
		// border-radius: $radius-m;
		transform: rotateZ(0);
		transform-origin: bottom left;
		transition: transform 0.4s linear;
	}
</style>
