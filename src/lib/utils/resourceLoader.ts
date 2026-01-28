import { writable } from 'svelte/store';

const iconModules = import.meta.glob('$lib/assets/icons/*.svg', { import: 'default' });
const imageModules = import.meta.glob('$lib/assets/images/*.(png|jpg|jpeg|svg|pdf)', {
	import: 'default'
});

const icons = Object.keys(iconModules).map((path) => {
	const name =
		path
			.split('/')
			.pop()
			?.replace(/\.(svg)$/, '') || 'Unknown';
	return { path, name, loader: iconModules[path] };
});

const images = Object.keys(imageModules).map((path) => {
	const name =
		path
			.split('/')
			.pop()
			?.replace(/\.(png|jpg|jpeg|svg|pdf)$/, '') || 'Unknown';
	return { path, name, loader: imageModules[path] };
});

// Reactive store for loaded assets
export const assetsStore = writable<Record<string, string>>({});

export interface LoadingProgress {
	loaded: number;
	total: number;
	percentage: number;
	currentResource?: string;
}

class ResourceLoader {
	private loaded = 0;
	private total = 0;
	private onProgressCallback?: (progress: LoadingProgress) => void;

	constructor(onProgress?: (progress: LoadingProgress) => void) {
		this.onProgressCallback = onProgress;
	}

	private updateProgress(currentResource?: string) {
		const percentage = this.total === 0 ? 0 : Math.round((this.loaded / this.total) * 100);
		if (this.onProgressCallback) {
			this.onProgressCallback({
				loaded: this.loaded,
				total: this.total,
				percentage,
				currentResource
			});
		}
	}

	async loadImage(src: string, name: string): Promise<void> {
		return new Promise((resolve) => {
			const img = new Image();
			img.onload = () => {
				this.loaded++;
				this.updateProgress(name);
				resolve();
			};
			img.onerror = () => {
				this.loaded++;
				this.updateProgress(name);
				resolve();
			};
			img.src = src;
		});
	}

	async loadImages(sources: Array<{ src: string; name: string }>): Promise<void> {
		for (const asset of sources) {
			await this.loadImage(asset.src, asset.name);
		}
	}

	async waitForFonts(): Promise<void> {
		this.total++;
		this.updateProgress('Fonts');
		try {
			await document.fonts.ready;
			this.loaded++;
		} catch {
			this.loaded++;
		}
	}
}

export async function preloadAllResources(
	onProgress?: (progress: LoadingProgress) => void
): Promise<void> {
	const loader = new ResourceLoader(onProgress);

	const allAssets = [...icons, ...images];

	loader['total'] = allAssets.length + 1;
	loader['updateProgress']('Loading assets...');

	const loadedAssets: Record<string, string> = {};
	const assetSources: Array<{ src: string; name: string }> = [];

	// Load all dynamic imports in parallel instead of sequentially
	const assetPromises = allAssets.map((asset) => asset.loader());
	const loadedSources = await Promise.all(assetPromises);

	loadedSources.forEach((src, index) => {
		const asset = allAssets[index];
		assetSources.push({ src: src as string, name: asset.name });
		loadedAssets[asset.name] = src as string;
	});

	// Update the store with loaded assets
	assetsStore.set(loadedAssets);

	await loader.loadImages(assetSources);

	loader['loaded']++;
	loader['updateProgress']('Fonts');
	await document.fonts.ready;
}
