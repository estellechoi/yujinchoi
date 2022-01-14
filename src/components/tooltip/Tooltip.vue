<template>
	<div :class="$style.tooltip">{{ label }}</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue'

	export default defineComponent({
		props: {
			label: {
				type: String as PropType<string>,
				required: true,
			},
		},
	})
</script>

<style lang="scss" module>
	@import '@/styles/index';

	.tooltip {
		display: inline-flex;
		justify-content: center;
		align-content: center;
		min-width: fit-content;
		color: $color-primary;
		@extend %typography-s;
		background: $color-white;
		padding: $size-2;
		border-radius: $radius-xs;
		box-shadow: $box-shadow-black;
	}
</style>
