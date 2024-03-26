<script setup>
import Scene from '@/classes/Scene.js';
import { computed, nextTick, ref, watch } from 'vue';

// Define emits
const emit = defineEmits(['ready']);

// Set variables
const scene = ref(null);
const loadPercentage = ref(0);

// Set computed variables
const isLoaded = computed(() => {
	return loadPercentage.value === 100;
});

// Expose
defineExpose({ scene });

nextTick(() => {
	// Create new three scene
	scene.value = new Scene('three-js-canvas', [{ id: 'plane', url: '/assets/models/plane/scene.gltf' }], loadPercentage);
});

// Watch
watch(
	isLoaded,
	(value) => {
		if (value) {
			// Emit ready
			emit('ready');
		}
	},
	{ immediate: true }
);
</script>

<template>
	<canvas id="three-js-canvas" class="h-full w-full transition-opacity" />
</template>
