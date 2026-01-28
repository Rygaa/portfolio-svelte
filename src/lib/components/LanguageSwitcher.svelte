<script lang="ts">
	import { language, setLanguage } from '$lib/stores/i18n';
	import { scrollToTop, disableVerticalScroll } from '$lib/utils/scroll';
	import { trackLanguageSelect, trackButtonClick } from '$lib/utils/analytics';
	import { globalStore } from '$lib/stores/globalStore.svelte';

	function handleScrollBackAllTop() {
		disableVerticalScroll();
		const home = document.getElementById('home');
		if (home) {
			home.style.display = 'flex';
		}

		const homeComponent = document.querySelector('#home');
		if (homeComponent) {
			window.dispatchEvent(new CustomEvent('resetHomeState'));
		}
		scrollToTop('smooth');
	}
</script>

<div
	class="cursor-pointer fixed top-4 right-4 z-50 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-1 shadow-lg"
>
	<button
		onclick={() => {
			setLanguage('en');
			trackLanguageSelect('en');
		}}
		class="cursor-pointer px-4 py-2 rounded-full text-sm font-medium uppercase transition-all duration-300"
		class:active={$language === 'en'}
		aria-label="Switch to English"
	>
		EN
	</button>
	<button
		onclick={() => {
			setLanguage('fr');
			trackLanguageSelect('fr');
		}}
		class="cursor-pointer px-4 py-2 rounded-full text-sm font-medium uppercase transition-all duration-300"
		class:active={$language === 'fr'}
		aria-label="Switch to French"
	>
		FR
	</button>
	{#if !globalStore.showScene}
		<div class="w-px h-6 bg-white/20"></div>
		<button
			onclick={() => {
				handleScrollBackAllTop();
				trackButtonClick('scroll_to_top');
			}}
			class="cursor-pointer px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 test-btn"
			aria-label="Scroll back to top and disable scroll"
			title="Test: Scroll to top"
		>
			↑ TOP
		</button>
	{/if}
</div>

<style>
	button {
		color: rgba(255, 255, 255, 0.6);
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	button:hover {
		color: rgba(255, 255, 255, 0.9);
		background-color: rgba(255, 255, 255, 0.1);
	}

	button.active {
		color: white;
		background-color: rgba(255, 255, 255, 0.2);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	}

	button.test-btn {
		color: rgba(0, 255, 209, 0.8);
	}

	button.test-btn:hover {
		color: rgba(0, 255, 209, 1);
		background-color: rgba(0, 255, 209, 0.1);
	}
</style>
