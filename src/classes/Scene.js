import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default class Scene {
	constructor(canvasId) {
		// Set variables
		this.objects = [];
		this.fps = 1000 / 60;
		this.then = null;
		this.scene = null;
		this.camera = null;
		this.renderer = null;
		this.delta = 0;
		this.canvas = document.querySelector(`#${canvasId}`);
		this.gltfLoader = new GLTFLoader();
		this.dracoLoader = new DRACOLoader();
		this.gltfLoader.setDRACOLoader(this.dracoLoader);

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

		// Start render loop
		this.animate.call(this, performance.now());
	}

	setupSmoothScrolling() {
		// Create the scrollSmoother before your scrollTriggers
		ScrollSmoother.create({
			smooth: 1, // How long (in seconds) it takes to "catch up" to the native scroll position
			effects: true, // Looks for data-speed and data-lag attributes on elements
			smoothTouch: 0.1 // Much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
		});
	}

	setupScrollAnimations() {
		console.log('test');
	}

	animate() {
		// Animate request frame loop
		const now = Date.now();
		this.delta = now - this.then;

		if (this.delta > this.fps) {
			this.then = now - (this.delta % this.fps);

			// Render the frame
			this.render(this.delta);
		}

		// Request a new frame
		this.animateFrameId = requestAnimationFrame(this.animate.bind(this));
	}

	render() {
		// Custom render logic here

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
