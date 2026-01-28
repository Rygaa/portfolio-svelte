import * as THREE from 'three';

interface CubeData {
	originalHeight: number;
	animationSpeed: number;
	animationPhase: number;
	basePosition: THREE.Vector3;
	instanceIndex: number;
}

export function updateCubesHeight(
	time: number,
	instancedMesh: THREE.InstancedMesh | null,
	cubesData: CubeData[],
	getSinFromLookup: (value: number) => number
) {
	if (!instancedMesh) return;

	const matrix = new THREE.Matrix4();
	const position = new THREE.Vector3();
	const rotation = new THREE.Quaternion();
	const scale = new THREE.Vector3();

	cubesData.forEach((cubeData) => {
		const minScale = 0.5 / cubeData.originalHeight;
		const sinValue = getSinFromLookup(time * cubeData.animationSpeed + cubeData.animationPhase);
		const scaleY = ((sinValue + 1) / 2) * (1 - minScale) + minScale;
		const newHeight = cubeData.originalHeight * scaleY;

		position.copy(cubeData.basePosition);
		position.y = newHeight / 2;
		rotation.set(0, 0, 0, 1);
		scale.set(1, cubeData.originalHeight * scaleY, 1);

		matrix.compose(position, rotation, scale);
		instancedMesh!.setMatrixAt(cubeData.instanceIndex, matrix);
	});

	instancedMesh.instanceMatrix.needsUpdate = true;
}
