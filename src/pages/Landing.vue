<script setup>
import ThreeJsScene from '@/components/ThreeJsScene.vue';
</script>

<template>
	<div id="smooth-wrapper" class="relative bg-indigo-500">
		<div id="smooth-content" class="relative z-10 h-fit w-full">
			<div class="h-screen w-full flex justify-center items-center">
				<p class="text-white font-bold text-2xl">Scroll down</p>
			</div>

			<div class="h-screen w-full flex justify-center items-center">
				<p class="text-white font-bold text-2xl">Section #1</p>
			</div>

			<div class="h-screen w-full flex justify-center items-center">
				<p class="text-white font-bold text-2xl">Section #2</p>
			</div>

			<div class="h-screen w-full flex justify-center items-center">
				<p class="text-white font-bold text-2xl">Section #3</p>
			</div>

			<div class="h-screen w-full flex justify-center items-center">
				<p class="text-white font-bold text-2xl">Section #4</p>
			</div>

			<div class="h-screen w-full flex justify-center items-center">
				<p class="text-white font-bold text-2xl">Section #5</p>
			</div>

			<div class="h-screen w-full flex justify-center items-center">
				<p class="text-white font-bold text-2xl">Section #6</p>
			</div>

			<div class="h-screen w-full flex justify-center items-center">
				<p class="text-white font-bold text-2xl">Section #7</p>
			</div>
		</div>

		<div class="absolute z-0 inset-0 h-screen w-full flex justify-center items-center">
			<ThreeJsScene />
		</div>
	</div>
</template>
