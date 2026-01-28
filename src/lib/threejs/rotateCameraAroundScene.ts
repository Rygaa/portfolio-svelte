import * as THREE from 'three';

export function rotateCameraAroundScene(camera: THREE.PerspectiveCamera, angle: number) {
	const currentY = camera.position.y;
	const newPosition = camera.position.clone();
	newPosition.applyAxisAngle(new THREE.Vector3(0, 1, 0), angle);
	camera.position.set(newPosition.x, currentY, newPosition.z);
	camera.lookAt(0, 0, 0);
}
