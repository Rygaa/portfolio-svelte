import * as THREE from 'three';

export function createFloor(scene: THREE.Scene, config: { floorSize: number }) {
	const floorGeometry = new THREE.PlaneGeometry(config.floorSize, config.floorSize, 1, 1);
	const floorMaterial = new THREE.MeshStandardMaterial({
		color: 0x808080,
		side: THREE.DoubleSide
	});
	const floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.rotation.x = -Math.PI / 2;
	scene.add(floor);
}
