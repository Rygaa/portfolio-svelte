<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import Stats from 'stats.js';
	import { settings } from '$lib/settings';
	import {
		createSinLookupTable,
		getSinFromLookup,
		initScene,
		createFloor,
		createCubes,
		updateCubesHeight,
		rotateCameraAroundScene,
		updateFog,
		createLights,
		createReferencePlane,
		handleMouseMove,
		handleResize
	} from '$lib/threejs';
	import { enableVerticalScroll } from '$lib/utils/scroll';
	import { globalStore } from '$lib/stores/globalStore.svelte';

	let {
		onThreeJsReady
	}: {
		onThreeJsReady?: () => void;
	} = $props();

	let canvas: HTMLCanvasElement;
	let threeJs: ReturnType<typeof initScene>;

	let animationComplete = $state(false);
	let cameraDistanceFactor = $state(0.02);
	let deductionCount = $state(0);
	let lastMouseUpdate = $state(0);

	let isCleaningUp = false;

	const sinLookupTable = createSinLookupTable(360);

	export function resetScene() {
		animationComplete = false;
		cameraDistanceFactor = 0.02;
		deductionCount = 0;
		globalStore.setFadeEffectActive(true);

		if (threeJs.spotlight) {
			threeJs.spotlight.intensity /= threeJs.config.spotlight.intensityMultiplier;
		}
	}

	export function updateSpotlightIntensity(multiplier: number) {
		if (threeJs.spotlight) {
			threeJs.spotlight.intensity *= multiplier;
		}
	}

	function handleCubesFaded() {
		// Trigger home section to slide up via CSS transform
		globalStore.setHideHome(true);

		setTimeout(() => {
			enableVerticalScroll();
			globalStore.setShowScene(false);
		}, 800);
	}

	function updateCubes(time: number) {
		if (globalStore.fadeEffectActive) {
			rotateCameraAroundScene(threeJs.camera, threeJs.config.rotationSpeed.normal);
			updateCubesHeight(time, threeJs.instancedMesh, threeJs.cubesData, (value) =>
				getSinFromLookup(value, sinLookupTable)
			);
		} else if (!animationComplete) {
			const result = updateFog(threeJs.scene, threeJs.fog, deductionCount);
			deductionCount = result.deductionCount;
			const status = result.status;

			updateCubesHeight(time, threeJs.instancedMesh, threeJs.cubesData, (value) =>
				getSinFromLookup(value, sinLookupTable)
			);
			rotateCameraAroundScene(threeJs.camera, threeJs.config.rotationSpeed.normal);

			if (status) {
				rotateCameraAroundScene(threeJs.camera, threeJs.config.rotationSpeed.fast);

				if (
					cameraDistanceFactor < threeJs.config.cameraDistanceFactor.max &&
					cameraDistanceFactor < threeJs.config.cameraDistanceFactor.max - 0.45
				) {
					cameraDistanceFactor += threeJs.config.cameraDistanceFactor.acceleration;
				} else if (cameraDistanceFactor > threeJs.config.cameraDistanceFactor.max - 0.45) {
					animationComplete = true;
					handleCubesFaded();
				}
				threeJs.camera.position.x += cameraDistanceFactor;
			}
		}
	}

	function animate() {
		if (isCleaningUp) return;

		if (threeJs.stats) threeJs.stats.begin();

		threeJs.animationId = requestAnimationFrame(animate);

		const time = threeJs.clock.getElapsedTime();
		updateCubes(time);
		threeJs.renderer.render(threeJs.scene, threeJs.camera);

		if (threeJs.stats) threeJs.stats.end();
	}

	onMount(() => {
		threeJs = initScene(canvas);

		if (settings.showFPS) {
			threeJs.stats = new Stats();
			threeJs.stats.showPanel(0);
			document.body.appendChild(threeJs.stats.dom);
		}

		createFloor(threeJs.scene, threeJs.config);

		const cubesResult = createCubes(threeJs.scene, threeJs.config);
		threeJs.instancedMesh = cubesResult.instancedMesh;
		threeJs.cubesData = cubesResult.cubesData;

		const lightsResult = createLights(threeJs.scene, threeJs.config);
		threeJs.mouseLight = lightsResult.mouseLight;
		threeJs.spotlight = lightsResult.spotlight;

		threeJs.referencePlane = createReferencePlane(threeJs.scene);

		const onResize = () => handleResize(threeJs.camera, threeJs.renderer);
		const onMouseMove = (event: MouseEvent) => {
			lastMouseUpdate = handleMouseMove(
				event,
				threeJs.raycaster,
				threeJs.camera,
				threeJs.referencePlane!,
				threeJs.mouseLight!,
				lastMouseUpdate,
				threeJs.config
			);
		};

		window.addEventListener('resize', onResize);
		window.addEventListener('mousemove', onMouseMove);

		if (onThreeJsReady) {
			onThreeJsReady();
		}

		animate();

		return () => {
			isCleaningUp = true;
			window.removeEventListener('resize', onResize);
			window.removeEventListener('mousemove', onMouseMove);

			if (threeJs.stats && threeJs.stats.dom.parentElement) {
				threeJs.stats.dom.parentElement.removeChild(threeJs.stats.dom);
			}

			if (threeJs.animationId) {
				cancelAnimationFrame(threeJs.animationId);
			}

			if (threeJs.renderer) {
				threeJs.renderer.dispose();
			}

			if (threeJs.instancedMesh) {
				threeJs.instancedMesh.geometry.dispose();
				(threeJs.instancedMesh.material as THREE.Material).dispose();
			}
		};
	});
</script>

<canvas
	bind:this={canvas}
	id="home-3d"
	class="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
></canvas>
