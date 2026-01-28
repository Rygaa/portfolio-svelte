<script lang="ts">
	import { setLanguage, type Language } from '$lib/stores/i18n';
	import { goto } from '$app/navigation';
	import { trackLanguageSelect } from '$lib/utils/analytics';

	function selectLanguage(lang: Language) {
		setLanguage(lang);
		trackLanguageSelect(lang);
		goto(`/${lang}`);
	}
</script>

<div class="bg"></div>
<div class="waves"></div>
<div class="bg-grid"></div>
<div class="filter"></div>

<div class="blob1"></div>
<div class="blob2"></div>
<div class="blob3"></div>
<div class="blob4"></div>

<div class="fixed inset-0 z-50 flex items-center justify-center">
	<div
		class="flex flex-col items-center gap-6 md:gap-8 p-8 md:p-12 bg-black/30 backdrop-blur-lg border border-white/5 rounded-xl shadow-2xl max-w-2xl mx-4"
	>
		<div class="flex items-center w-full select-none">
			<div class="bg-white/20 h-0.5 flex-1"></div>
			<h1 class="text-2xl md:text-3xl px-6 md:px-8 text-white/90 font-bold text-center">
				Choose Your Language / Choisissez votre langue
			</h1>
			<div class="bg-white/20 h-0.5 flex-1"></div>
		</div>

		<p class="text-sm md:text-base text-white/50 text-center">
			You can always change it later / Vous pouvez toujours le changer plus tard
		</p>

		<div class="flex flex-col md:flex-row gap-4 md:gap-6 mt-6 w-full md:w-auto">
			<button
				on:click={() => selectLanguage('en')}
				class="cursor-pointer px-12 md:px-16 py-3 md:py-4 text-lg md:text-xl font-semibold text-white bg-[rgba(0,255,209,0.25)] border border-[rgba(0,255,209,0.5)] rounded-md hover:bg-[rgba(0,255,209,0.35)] hover:border-[rgba(0,255,209,0.7)] hover:shadow-[0_0_20px_rgba(0,255,209,0.3)] transition-all duration-300 hover:-translate-y-0.5"
			>
				English
			</button>

			<button
				on:click={() => selectLanguage('fr')}
				class="cursor-pointer px-12 md:px-16 py-3 md:py-4 text-lg md:text-xl font-semibold text-white bg-[rgba(0,255,209,0.25)] border border-[rgba(0,255,209,0.5)] rounded-md hover:bg-[rgba(0,255,209,0.35)] hover:border-[rgba(0,255,209,0.7)] hover:shadow-[0_0_20px_rgba(0,255,209,0.3)] transition-all duration-300 hover:-translate-y-0.5"
			>
				Français
			</button>
		</div>
	</div>
</div>
