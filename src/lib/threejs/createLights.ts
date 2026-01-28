import * as THREE from 'three';

export function createLights(
	scene: THREE.Scene,
	config: {
		mouseLight: {
			color: number;
			intensity: number;
			distance: number;
			angle: number;
			penumbra: number;
			decay: number;
		};
		spotlight: {
			color: number;
			intensity: number;
			height: number;
			angle: number;
			penumbra: number;
			decay: number;
			distance: number;
		};
	}
) {
	const mouseLight = new THREE.SpotLight(
		config.mouseLight.color,
		config.mouseLight.intensity,
		config.mouseLight.distance
	);
	mouseLight.position.set(0, 100, 0);
	mouseLight.angle = config.mouseLight.angle;
	mouseLight.penumbra = config.mouseLight.penumbra;
	mouseLight.decay = config.mouseLight.decay;
	mouseLight.target.position.set(0, 0, 0);
	scene.add(mouseLight);
	scene.add(mouseLight.target);

	const spotlight = new THREE.SpotLight(config.spotlight.color, 1);
	spotlight.position.set(0, config.spotlight.height, 0);
	spotlight.intensity = config.spotlight.intensity;
	spotlight.angle = config.spotlight.angle;
	spotlight.penumbra = config.spotlight.penumbra;
	spotlight.decay = config.spotlight.decay;
	spotlight.distance = config.spotlight.distance;
	spotlight.target.position.set(0, 0, 0);
	spotlight.color = mouseLight.color;
	scene.add(spotlight);

	return { mouseLight, spotlight };
}
