import * as THREE from 'three';

export function createReferencePlane(scene: THREE.Scene) {
	const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
	const planeMaterial = new THREE.MeshStandardMaterial({ visible: false });
	const referencePlane = new THREE.Mesh(planeGeometry, planeMaterial);
	referencePlane.rotateX(-Math.PI / 2);
	scene.add(referencePlane);
	return referencePlane;
}
