import * as THREE from 'three';
import { gsap } from 'gsap';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default class Scene {
	constructor(canvasId, assets, loadPercentage) {
		// Set variables
		this.assets = assets;
		this.loadPercentage = loadPercentage;
		this.objects = [];
		this.fps = 1000 / 60;
		this.then = null;
		this.scene = null;
		this.camera = null;
		this.renderer = null;
		this.canvas = document.querySelector(`#${canvasId}`);
		this.gltfLoader = new GLTFLoader();
		this.dracoLoader = new DRACOLoader();
		this.gltfLoader.setDRACOLoader(this.dracoLoader);
		this.animationMixers = [];

		// Setup scene
		this.setupScene();
	}

	async setupScene() {
		// Setup scene
		this.scene = new THREE.Scene();

		// Setup renderer
		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
			powerPreference: 'high-performance',
			canvas: this.canvas,
			alpha: true
		});

		// Set size & aspect ratio
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setPixelRatio(window.devicePixelRatio);

		// Setup camera
		this.setupCamera();

		// Bind events
		this.bind();

		// Setup smooth scrolling
		this.setupSmoothScrolling();

		// Setup scroll animations
		this.setupScrollAnimations();

		// Load all the models
		await this.loadModels();

		// Start render loop
		this.animate.call(this, performance.now());
	}

	async loadModels() {
		const loadPromises = this.assets.map((asset) => {
			return new Promise((resolve) => {
				this.gltfLoader.load(
					asset.url,
					(gltf) => {
						// Rename using id
						gltf.scene.name = asset.id;

						//Cast shadow when necessary
						gltf.scene.traverse((objectItem) => {
							if (objectItem.isMesh) {
								objectItem.receiveShadow = true;
								objectItem.castShadow = true;
							}
						});

						// Add to scene
						this.scene.add(gltf.scene);

						if (gltf.animations.length !== 0) {
							const mixer = new THREE.AnimationMixer(gltf.scene);
							this.animationMixers.push(mixer);

							// Play all animation clips
							gltf.animations.forEach((clip) => {
								// Create te action
								const action = mixer.clipAction(clip);

								// Play
								action.play();
							});
						}

						// Resolve
						resolve();
					},
					(xhr) => {
						const totalLoadedPercentage = this.assets.reduce((acc, currentAsset) => {
							return acc + (currentAsset.url === asset.url ? (xhr.loaded / xhr.total) * 100 : 0);
						}, 0);
						this.loadPercentage.value = totalLoadedPercentage / this.assets.length;
						console.log('loading...', this.loadPercentage.value.toFixed(2) + '%');
					},
					(error) => {
						console.error(error);
					}
				);
			});
		});

		try {
			await Promise.all(loadPromises);
			console.log('All models loaded successfully!');
		} catch (error) {
			console.error('Error loading models:', error);
		}
	}

	setupSmoothScrolling() {
		// Create the scrollSmoother before your scrollTriggers
		ScrollSmoother.create({
			smooth: 2, // How long (in seconds) it takes to "catch up" to the native scroll position
			effects: true, // Looks for data-speed and data-lag attributes on elements
			smoothTouch: 0 // Much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
		});
	}

	setupScrollAnimations() {
		// Set containers list
		const containerIdsList = [
			'container-1',
			'container-2',
			'container-3',
			'container-4',
			'container-5',
			'container-6',
			'container-7'
		];

		containerIdsList.forEach((id) => {
			// Set end offset
			const endOffset = 1000;

			// Set timeline
			const timeline = gsap.timeline({
				scrollTrigger: {
					trigger: '#' + id,
					pin: true,
					markers: true,
					start: 'top top',
					end: '+=' + endOffset,
					scrub: 1,
					snap: {
						snapTo: 'labels', // snap to the closest label in the timeline
						duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
						delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
						ease: 'power1.inOut' // the ease of the snap animation ("power3" by default)
					}
				}
			});

			// add animations and labels to the timeline
			timeline
				.addLabel(id)
				.from('#' + id + ' p', { scale: 0.3, rotation: 45, autoAlpha: 0 })
				.addLabel('end');
		});
	}

	animate() {
		// Start animation loop
		const now = Date.now();
		const delta = now - this.then;

		if (delta > this.fps) {
			this.then = now - (delta % this.fps);

			//Render
			this.render(delta / 1000);
		}

		//Request the animation frame
		this.animateFrameId = requestAnimationFrame(this.animate.bind(this));
	}

	render(time) {
		// Update animation mixers
		this.animationMixers.forEach((mixer) => mixer.update(time));

		// Render
		this.renderer.render(this.scene, this.camera);
	}

	setupCamera() {
		// Set perspective camera
		this.camera = new THREE.PerspectiveCamera(35, this.canvas.offsetWidth / this.canvas.offsetHeight, 0.1, 100);
		this.camera.position.z = 10;
		this.camera.updateProjectionMatrix();

		// Add parent to scene
		this.scene.add(this.camera);
	}

	resize() {
		// Set correct aspect
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();

		// Set canvas size again
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}

	lerp(value1, value2, amount) {
		// Set amount
		amount = amount < 0 ? 0 : amount;
		amount = amount > 1 ? 1 : amount;

		return value1 + (value2 - value1) * amount;
	}

	bind() {
		// Add event listeners
		window.addEventListener('resize', () => this.resize());
	}

	unbind() {
		// Remove event listeners
		window.removeEventListener('resize', () => this.resize());
	}
}
