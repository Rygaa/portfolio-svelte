export const settings = {
	showFPS: false,
	isFogEnabled: true,
	scrollbarAlwaysOn: true,
	cubeSize: 1.5,
	floorSize: 100,
	maxCubeHeight: 5,
	cubeSpawnProbability: 0.35,
	rotationSpeed: {
		normal: 0.001,
		fast: 0.005
	},
	cameraDistanceFactor: {
		initial: 0.02,
		max: 1.5,
		acceleration: 0.015
	},
	mouseLight: {
		color: 0x00ffd1,
		intensity: 10,
		distance: 50,
		height: 10,
		angle: Math.PI / 6,
		penumbra: 0.3,
		decay: 2
	},
	spotlight: {
		color: 0xffffff,
		intensity: 150,
		intensityMultiplier: 5,
		height: 35,
		angle: 0.5,
		penumbra: 0.5,
		decay: 1.75,
		distance: 100
	}
};
