<script lang="ts">
	import { t } from '$lib/stores/i18n';
</script>

<section id="about-me" class="relative flex flex-col items-center w-full self-center">
	<div class="flex items-center w-full max-w-[50rem] mb-8 md:mb-12 select-none px-4">
		<div class="bg-white/20 h-0.5 flex-[0.4]"></div>
		<p class="text-[1.3rem] md:text-[1.7rem] px-4 md:px-8 text-white/90">
			{$t.about.title}
		</p>
		<div class="bg-white/20 h-0.5 flex-1"></div>
	</div>

	<div class="w-full max-w-[50rem] px-4">
		<div class="flex flex-col">
			<p class="text-[1.3rem] md:text-[1.7rem] text-white w-max">
				{$t.about.name}
			</p>
			<p class="text-lg md:text-[1.7rem] text-white w-max mt-2">
				{$t.about.locationLabel}: {$t.about.location}
			</p>
			<p
				class="text-base md:text-xl text-white leading-6 md:leading-7 font-medium text-left mt-4 md:mt-6"
			>
				{$t.about.description}
			</p>
		</div>
	</div>
</section>
