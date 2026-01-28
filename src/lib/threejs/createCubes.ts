import * as THREE from 'three';

interface CubeData {
	originalHeight: number;
	animationSpeed: number;
	animationPhase: number;
	basePosition: THREE.Vector3;
	instanceIndex: number;
}

export function createCubes(
	scene: THREE.Scene,
	config: {
		floorSize: number;
		cubeSize: number;
		maxCubeHeight: number;
		cubeSpawnProbability: number;
	}
) {
	const gridSize = Math.floor(config.floorSize / config.cubeSize);
	const maxCubes = gridSize * gridSize;

	const sharedCubeMaterial = new THREE.MeshLambertMaterial({
		color: 0xffffff
	});
	const cubeGeometry = new THREE.BoxGeometry(config.cubeSize, 1, config.cubeSize);

	const instancedMesh = new THREE.InstancedMesh(cubeGeometry, sharedCubeMaterial, maxCubes);

	const matrix = new THREE.Matrix4();
	const position = new THREE.Vector3();
	const rotation = new THREE.Quaternion();
	const scale = new THREE.Vector3();

	let instanceIndex = 0;
	const cubesData: CubeData[] = [];

	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < gridSize; j++) {
			if (Math.random() > 1 - config.cubeSpawnProbability) {
				const height = Math.random() * config.maxCubeHeight;

				position.set(
					-config.floorSize / 2 + config.cubeSize * i + config.cubeSize / 2,
					height / 2,
					-config.floorSize / 2 + config.cubeSize * j + config.cubeSize / 2
				);

				rotation.set(0, 0, 0, 1);
				scale.set(1, height, 1);

				matrix.compose(position, rotation, scale);
				instancedMesh.setMatrixAt(instanceIndex, matrix);

				cubesData.push({
					originalHeight: height,
					animationSpeed: Math.random() * 1 + 0.01,
					animationPhase: Math.random() * Math.PI * 2,
					basePosition: position.clone(),
					instanceIndex: instanceIndex
				});

				instanceIndex++;
			}
		}
	}

	instancedMesh.count = instanceIndex;
	scene.add(instancedMesh);

	return { instancedMesh, cubesData };
}
