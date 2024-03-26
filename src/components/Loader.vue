<script setup>
// Define props
defineProps({
	show: {
		type: Boolean,
		default: false
	}
});
</script>

<template>
	<Transition name="fade">
		<div v-if="show" class="absolute inset-0 z-50 flex h-screen w-full items-center justify-center bg-ya-day-100">
			<div
				class="h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-t-transparent shadow-md"
			/>
		</div>
	</Transition>
</template>
