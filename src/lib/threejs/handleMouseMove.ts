import * as THREE from 'three';

export function handleMouseMove(
	event: MouseEvent,
	raycaster: THREE.Raycaster,
	camera: THREE.PerspectiveCamera,
	referencePlane: THREE.Mesh,
	mouseLight: THREE.SpotLight,
	lastMouseUpdate: number,
	config: { mouseLight: { height: number } }
) {
	const now = Date.now();

	if (now - lastMouseUpdate < 50) return lastMouseUpdate;

	lastMouseUpdate = now;

	const x = (event.clientX / window.innerWidth) * 2 - 1;
	const y = -(event.clientY / window.innerHeight) * 2 + 1;

	raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
	const intersects = raycaster.intersectObject(referencePlane);

	if (intersects.length > 0) {
		const intersectPoint = intersects[0].point;
		mouseLight.position.set(intersectPoint.x, config.mouseLight.height, intersectPoint.z);
		mouseLight.target.position.set(intersectPoint.x, 0, intersectPoint.z);
	}

	return lastMouseUpdate;
}
