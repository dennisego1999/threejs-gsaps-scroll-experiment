<script setup>
import Scene from '@/classes/Scene.js';
import { nextTick, ref } from 'vue';

// Set variables
const scene = ref(null);

// Expose
defineExpose({ scene });

nextTick(() => {
	// Create new three scene
	scene.value = new Scene('three-js-canvas');
});
</script>

<template>
	<canvas id="three-js-canvas" class="h-full w-full"></canvas>
</template>
