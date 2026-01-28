<script lang="ts">
	import { onMount } from 'svelte';
	import { t, language } from '$lib/stores/i18n';
	import { trackButtonClick } from '$lib/utils/analytics';
	import { assetsStore } from '$lib/utils/resourceLoader';
	import ThreeDScene from './3DScene.svelte';
	import { enableVerticalScroll } from '$lib/utils/scroll';
	import { globalStore } from '$lib/stores/globalStore.svelte';

	const resumeEnPdf = $derived($assetsStore['aissa_dev_cv_en'] || '');
	const resumeFrPdf = $derived($assetsStore['aissa_dev_cv_fr'] || '');

	let {
		onThreeJsReady
	}: {
		onThreeJsReady?: (() => void) | undefined;
	} = $props();

	let resumePdf = $derived($language === 'en' ? resumeEnPdf : resumeFrPdf);

	let sceneComponent: any = $state();
	let isSliding = $state(false);

	function handleSlideComplete() {
		enableVerticalScroll();
	}

	export function resetHomeState() {
		isSliding = false;
		globalStore.setShowScene(true);
		globalStore.setFadeEffectActive(true);
		globalStore.setHideHome(false);
		if (sceneComponent) {
			sceneComponent.resetScene();
		}
	}

	function handleViewWork() {
		isSliding = true;
		globalStore.setFadeEffectActive(false);
		if (sceneComponent) {
			sceneComponent.updateSpotlightIntensity(2);
		}
		setTimeout(() => {
			handleSlideComplete();
		}, 500);
	}

	onMount(() => {
		const handleReset = () => resetHomeState();
		window.addEventListener('resetHomeState', handleReset);

		return () => {
			window.removeEventListener('resetHomeState', handleReset);
		};
	});
</script>

<section
	id="home"
	class="z-50 h-screen bg-transparent flex items-center gap-20 transition-all duration-800 ease-in-out {globalStore.hideHome
		? 'absolute -translate-y-full'
		: 'relative translate-y-0'}"
>
	{#if globalStore.showScene}
		<ThreeDScene bind:this={sceneComponent} {onThreeJsReady} />
	{/if}
	<div
		id="sub-home"
		class="relative z-10 flex flex-col gap-3 md:gap-5 bg-black/30 backdrop-blur-lg p-6 md:p-10 md:pl-20 lg:pl-80 rounded-none md:rounded-r-lg w-full md:w-auto transition-transform duration-500 ease-in-out shadow-2xl border border-white/5 {isSliding
			? '-translate-x-full'
			: 'translate-x-0'}"
	>
		<p
			class="text-xl md:text-2xl lg:text-3xl font-bold tracking-wider md:tracking-widest text-white mb-2 md:mb-3 self-center md:self-end"
		>
			{$t.home.name}
		</p>
		<p
			class="text-xl md:text-2xl lg:text-3xl font-bold tracking-wider md:tracking-widest text-[rgba(0,255,209,0.8)] mb-2 md:mb-3 self-center md:self-end"
		>
			{$t.home.title}
		</p>
		<div class="flex flex-col md:flex-row gap-3 md:gap-5 self-center md:self-end w-full md:w-auto">
			<a
				target="_blank"
				href={resumePdf}
				onclick={() => trackButtonClick('home_download_cv')}
				class="bg-transparent text-white/90 text-base md:text-lg lg:text-xl font-medium rounded-md h-12 md:h-14 lg:h-[60px] cursor-pointer px-8 md:px-10 lg:px-14 border-1 border-white/30 hover:bg-white/10 hover:border-white/50 hover:text-white transition-all duration-300 flex items-center justify-center no-underline hover:-translate-y-0.5"
			>
				{$t.home.downloadCV}
			</a>
			<button
				onclick={handleViewWork}
				class="bg-[rgba(0,255,209,0.25)] text-white text-base md:text-lg lg:text-xl font-semibold rounded-md h-12 md:h-14 lg:h-[60px] cursor-pointer px-8 md:px-10 lg:px-14 border-1 border-[rgba(0,255,209,0.5)] hover:bg-[rgba(0,255,209,0.35)] hover:border-[rgba(0,255,209,0.7)] hover:shadow-[0_0_20px_rgba(0,255,209,0.3)] transition-all duration-300 hover:-translate-y-0.5"
			>
				{$t.home.cta}
			</button>
		</div>
	</div>
</section>
