<script setup>
import { ref } from 'vue';
import ThreeJsScene from '@/components/ThreeJsScene.vue';
import Loader from '@/components/Loader.vue';

// Set variables
const isReady = ref(false);
</script>

<template>
	<div id="smooth-wrapper" class="relative bg-indigo-500">
		<Loader :show="!isReady" />

		<div id="smooth-content" class="relative z-10 h-fit w-full">
			<div class="h-screen w-full flex justify-center items-center">
				<p class="text-white font-bold text-2xl">Scroll down</p>
			</div>

			<!--Containers-->
			<div id="container-1" class="scroll-container h-screen w-full flex justify-center items-center">
				<p class="text-white font-bold text-2xl">Section #1</p>
			</div>

			<div id="container-2" class="scroll-container h-screen w-full flex justify-center items-center">
				<p class="text-white font-bold text-2xl">Section #2</p>
			</div>

			<div id="container-3" class="scroll-container h-screen w-full flex justify-center items-center">
				<p class="text-white font-bold text-2xl">Section #3</p>
			</div>

			<div id="container-4" class="scroll-container h-screen w-full flex justify-center items-center">
				<p class="text-white font-bold text-2xl">Section #4</p>
			</div>

			<div id="container-5" class="scroll-container h-screen w-full flex justify-center items-center">
				<p class="text-white font-bold text-2xl">Section #5</p>
			</div>

			<div id="container-6" class="scroll-container h-screen w-full flex justify-center items-center">
				<p class="text-white font-bold text-2xl">Section #6</p>
			</div>

			<div id="container-7" class="scroll-container h-screen w-full flex justify-center items-center">
				<p class="text-white font-bold text-2xl">Section #7</p>
			</div>
		</div>

		<div class="absolute z-0 inset-0 h-screen w-full flex justify-center items-center transition-opacity duration-500">
			<ThreeJsScene @ready="isReady = true" />
		</div>
	</div>
</template>
