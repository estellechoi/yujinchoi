<template>
	<div class="home">
		<HourHand :hour="1" />
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue'
	import HourHand from '@/components/HourHand.vue' // @ is an alias to /src

	export default defineComponent({
		name: 'Home',
		components: {
			HourHand,
		},
	})
</script>
