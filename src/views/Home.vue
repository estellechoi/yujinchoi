<template>
	<div :class="$style.layout">
		<Clock
			:class="$style.clock"
			:time="new Date()"
			:size="200"
			:is-live="true"
		/>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue'
	import Clock from '@/components/clock/Clock.vue'

	export default defineComponent({
		name: 'Home',
		components: { Clock },
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
	}
</style>
