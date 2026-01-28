<script lang="ts">
	import { onMount } from 'svelte';

	export let progress: number = 0;
	export let isComplete: boolean = false;
	export let currentResource: string = '';

	let displayProgress = 0;
	let progressText = 'Initializing...';

	$: displayProgress = progress;

	$: {
		if (displayProgress >= 100) {
			progressText = 'Welcome!';
		} else if (currentResource) {
			progressText = `Loading ${currentResource}...`;
		} else {
			progressText = 'Initializing...';
		}
	}
</script>

<div
	class="loading-screen fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-1000"
	class:fade-out={isComplete}
>
	<div class="flex flex-col items-center gap-8 w-full max-w-md px-8">
		<div class="w-full flex flex-col gap-3">
			<div class="w-full h-2 bg-white/10 rounded-full overflow- backdrop-blur-sm">
				<div
					class="h-full bg-gradient-to-r from-[#00ffd1] to-[#00b894] transition-all duration-300 ease-out rounded-full shadow-[0_0_20px_rgba(0,255,209,0.5)]"
					style="width: {displayProgress}%"
				></div>
			</div>

			<div class="flex justify-between items-center">
				<p class="text-sm text-white/60">
					{progressText}
				</p>
				<p class="text-sm text-[#00ffd1] font-bold">
					{displayProgress}%
				</p>
			</div>
		</div>
	</div>
</div>

<style>
	.loading-screen.fade-out {
		opacity: 0;
		pointer-events: none;
	}

	@keyframes pulse {
		0%,
		80%,
		100% {
			transform: scale(0.6);
			opacity: 0.3;
		}
		40% {
			transform: scale(1);
			opacity: 1;
		}
	}
</style>
