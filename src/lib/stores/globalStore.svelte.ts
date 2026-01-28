class GlobalStore {
	showScene = $state(true);
	fadeEffectActive = $state(true);
	hideHome = $state(false);

	setShowScene(show: boolean) {
		this.showScene = show;
	}

	setFadeEffectActive(active: boolean) {
		this.fadeEffectActive = active;
	}

	setHideHome(hide: boolean) {
		this.hideHome = hide;
	}

	reset() {
		this.showScene = true;
		this.fadeEffectActive = true;
		this.hideHome = false;
	}
}

export const globalStore = new GlobalStore();
