import * as THREE from 'three';
import { settings } from '$lib/settings';
import type Stats from 'stats.js';

export interface ThreeJsScene {
	canvas: HTMLCanvasElement;
	scene: THREE.Scene;
	camera: THREE.PerspectiveCamera;
	renderer: THREE.WebGLRenderer;
	raycaster: THREE.Raycaster;
	clock: THREE.Clock;
	fog: THREE.Fog;
	animationId: number;
	instancedMesh: THREE.InstancedMesh | null;
	cubesData: any[];
	mouseLight: THREE.SpotLight | null;
	spotlight: THREE.SpotLight | null;
	referencePlane: THREE.Mesh | null;
	stats: Stats | null;
	config: {
		cubeSize: number;
		floorSize: number;
		maxCubeHeight: number;
		cubeSpawnProbability: number;
		rotationSpeed: { normal: number; fast: number };
		cameraDistanceFactor: { max: number; acceleration: number };
		mouseLight: any;
		spotlight: any;
	};
}

export function initScene(canvas: HTMLCanvasElement): ThreeJsScene {
	const scene = new THREE.Scene();
	scene.background = new THREE.Color(0x000000);

	const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.set(6, 20, 20);
	camera.lookAt(0, 0, 0);

	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: false,
		alpha: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

	const raycaster = new THREE.Raycaster();
	const clock = new THREE.Clock();

	const fog = new THREE.Fog(0x00ffd1, 24, 60);
	if (settings.isFogEnabled) {
		scene.fog = fog;
	}

	const config = {
		cubeSize: settings.cubeSize,
		floorSize: settings.floorSize,
		maxCubeHeight: settings.maxCubeHeight,
		cubeSpawnProbability: settings.cubeSpawnProbability,
		rotationSpeed: settings.rotationSpeed,
		cameraDistanceFactor: settings.cameraDistanceFactor,
		mouseLight: settings.mouseLight,
		spotlight: settings.spotlight
	};

	return {
		canvas,
		scene,
		camera,
		renderer,
		raycaster,
		clock,
		fog,
		animationId: 0,
		instancedMesh: null,
		cubesData: [],
		mouseLight: null,
		spotlight: null,
		referencePlane: null,
		stats: null,
		config
	};
}
