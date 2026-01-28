import * as THREE from 'three';

export function updateFog(scene: THREE.Scene, fog: THREE.Fog, deductionCount: number) {
	deductionCount++;

	if (deductionCount >= 35) {
		scene.fog = null;
		return { status: true, deductionCount };
	}

	const reductionRate = -0.5;
	fog.near -= reductionRate;
	fog.far -= reductionRate;
	fog.near = Math.max(0, fog.near);
	fog.far = Math.max(0, fog.far);

	return { status: false, deductionCount };
}
