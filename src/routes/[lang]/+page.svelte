<script lang="ts">
	import { Home, AboutMe, Projects, Skills, Contact } from '$lib';
	import LoadingScreen from '$lib/components/LoadingScreen.svelte';
	import { preloadAllResources, type LoadingProgress } from '$lib/utils/resourceLoader';
	import { disableVerticalScroll, scrollToTop, initializeScroll } from '$lib/utils/scroll';
	import { t } from '$lib/stores/i18n';
	import { onMount } from 'svelte';

	let showBackToHome = $state(false);
	let loadingProgress = $state(0);
	let currentResource = $state('');
	let isLoadingComplete = $state(false);

	// Start preloading immediately
	const preloadPromise = preloadAllResources((progress: LoadingProgress) => {
		loadingProgress = progress.percentage;
		currentResource = progress.currentResource || '';
	}).then(() => {
		isLoadingComplete = true;
	});

	function scrollToHome() {
		const home = document.getElementById('home');
		if (home) {
			home.style.display = 'flex';
		}
		scrollToTop('smooth');

		setTimeout(() => {
			disableVerticalScroll();
			showBackToHome = false;
		}, 800);
	}

	onMount(() => {
		initializeScroll();

		const lightCircle = document.getElementById('light-circle');
		if (lightCircle) {
			document.addEventListener('mousemove', (e) => {
				lightCircle.style.left = e.clientX + 'px';
				lightCircle.style.top = e.clientY + 'px';
			});
		}
	});
</script>

{#await preloadPromise}
	<LoadingScreen progress={loadingProgress} {currentResource} isComplete={isLoadingComplete} />
{:then}
	<LoadingScreen progress={loadingProgress} {currentResource} isComplete={isLoadingComplete} />

	<div class="bg"></div>
	<div class="waves"></div>
	<div class="bg-grid"></div>
	<div class="filter"></div>

	<div class="blob1"></div>
	<div class="blob2"></div>
	<div class="blob3"></div>
	<div class="blob4"></div>

	<div id="light-circle"></div>

	{#if showBackToHome}
		<button
			onclick={scrollToHome}
			class="fixed bottom-8 right-8 z-50 bg-[rgba(0,255,209,0.25)] text-white p-4 rounded-full border-2 border-[rgba(0,255,209,0.5)] hover:bg-[rgba(0,255,209,0.35)] hover:border-[rgba(0,255,209,0.7)] hover:shadow-[0_0_20px_rgba(0,255,209,0.3)] transition-all duration-300 hover:scale-110 backdrop-blur-sm"
			aria-label="Back to home"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M5 10l7-7m0 0l7 7m-7-7v18"
				/>
			</svg>
		</button>
	{/if}

	<div
		id="main-content"
		class="flex flex-col"
		style="transition: transform 0.8s ease-out; will-change: transform;"
	>
		<Home />
		<div class="flex flex-col gap-y-20">
			<Projects />
			<div class="flex flex-col">
				<AboutMe />
				<Skills />
			</div>

			<Contact />
		</div>

		<footer class="w-full py-8 mt-20 flex flex-col items-center gap-2">
			<p class="text-sm text-white/60">
				© {new Date().getFullYear()} Aissa Benfodda. {$t.footer.rights}.
			</p>
			<p class="text-xs text-white/40">Portfolio v{import.meta.env['VITE_VERSION'] || "1.0.0"}</p>
		</footer>
	</div>
{/await}
