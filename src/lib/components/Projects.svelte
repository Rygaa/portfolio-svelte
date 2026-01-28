<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { trackButtonClick } from '$lib/utils/analytics';
	import { assetsStore } from '$lib/utils/resourceLoader';

	const githubImg = $derived($assetsStore['github'] || '');
	const urlImg = $derived($assetsStore['url'] || '');

	let selectedProject = $state(0);

	const imageMap = $derived<Record<number, string>>({
		1: $assetsStore['voimb'] || '',
		2: $assetsStore['myfloraboard'] || '',
		3: $assetsStore['pillar_science'] || ''
	});

	function selectProject(id: number) {
		selectedProject = id;

		const project = $t.projects.projectsList.find((p) => p.id === id);
		if (project) {
			const buttonName =
				'project_tab_' +
				project.title
					.toLowerCase()
					.replace(/\s+/g, '_')
					.replace(/[^a-z0-9_]/g, '');
			trackButtonClick(buttonName);
		}
	}
</script>

<section
	id="work-experience"
	class="relative bg-transparent flex flex-col items-center max-w-full w-full h-max transition-transform duration-300"
>
	<div class="flex w-full max-w-[50rem] items-center pt-12 md:pt-20 mb-8 md:mb-12 select-none px-4">
		<div class="bg-white/20 h-0.5 flex-1"></div>
		<p class="text-[1.3rem] md:text-[1.7rem] text-white/90 px-4 md:px-8">
			{$t.projects.workExperience}
		</p>
		<div class="bg-white/20 h-0.5 flex-[7]"></div>
	</div>

	<div class="flex flex-col md:flex-row h-full w-full max-w-[50rem] gap-6 md:gap-20 px-4">
		<div
			class="custom-scrollbar flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible md:gap-0 pb-2 md:pb-0 md:flex-[2] md:max-w-[35%]"
		>
			{#each $t.projects.projectsList as project}
				<button
					class="text-sm md:text-xl text-white text-left pl-3 md:pl-6 py-2 md:py-4 px-3 md:px-0 cursor-pointer border-b-[2px] md:border-b-0 md:border-l-[3px] transition-colors bg-transparent whitespace-nowrap md:whitespace-normal
						{selectedProject === project.id
						? 'border-[#00ffd1] text-[#00ffd1]'
						: 'border-[rgba(0,255,209,0.2)]'}"
					onclick={() => selectProject(project.id)}
				>
					{project.title}
				</button>
			{/each}
		</div>

		<div class="flex flex-col relative md:flex-[3]">
			{#each $t.projects.projectsList as project}
				{#if selectedProject === project.id}
					<div class="flex flex-col">
						<div class="z-10 flex flex-col gap-2 md:gap-3 mb-6 md:mb-8 mt-2 md:mt-4">
							<p class="text-lg md:text-xl text-white text-left">
								{project.title}&nbsp;<span class="text-[#00ffd1]/90 text-base md:text-lg"
									>({project.type})</span
								>
							</p>
							<p class="text-base md:text-lg text-white text-left">
								{project.date}
							</p>
						</div>

						<div class="z-10 flex flex-col mb-4 md:mb-6">
							<p class="text-lg md:text-xl text-white text-left pb-3 md:pb-5">
								{$t.projects.whatMastered}
							</p>
							{#each project.skills as skill}
								{@const [subtitle, ...rest] = skill.split(': ')}
								{@const description = rest.join(': ')}
								<p
									class="text-base md:text-lg text-white ml-3 md:ml-5 pb-2 md:pb-3 pl-3 md:pl-4 relative before:content-['•'] before:absolute before:left-0 before:top-0 before:text-lg md:before:text-xl"
								>
									{#if description}
										<span class="font-bold">{subtitle}:</span>
										<span class="font-light text-white/80">{description}</span>
									{:else}
										<span class="font-light text-white/80">{skill}</span>
									{/if}
								</p>
							{/each}
						</div>

						<div class="relative">
							{#if project.links && project.links.length > 0}
								<div class="flex absolute top-0 right-0 gap-2 md:gap-4">
									{#each project.links as link}
										<button
											class="w-6 h-6 md:w-8 md:h-8 cursor-pointer bg-transparent border-none p-0"
											onclick={() => window.open(link.url, '_blank')}
										>
											<img
												src={link.type === 'url' ? urlImg : githubImg}
												alt={link.type === 'url' ? 'URL' : 'GitHub'}
												class="w-6 h-6 md:w-8 md:h-8"
											/>
										</button>
									{/each}
								</div>
							{/if}

							{#if project.mediaTitle}
								<p class="text-lg md:text-xl text-white text-left pb-3 md:pb-5">
									{project.mediaTitle}
								</p>
							{/if}

							{#if imageMap[project.id]}
								<div class="w-full md:max-w-[25rem] flex">
									<img
										src={imageMap[project.id]}
										alt="{project.title} screenshot"
										class="w-full object-contain"
										loading="lazy"
									/>
								</div>
							{/if}

							{#if project.video}
								<div class="w-full md:max-w-[40rem] flex aspect-video">
									<iframe
										width="640"
										height="360"
										src={project.video}
										title="{project.title} video"
										frameborder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
										allowfullscreen
										class="w-full h-full"
									></iframe>
								</div>
							{/if}
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</section>

<style>
	.custom-scrollbar::-webkit-scrollbar {
		height: 6px;
	}

	.custom-scrollbar::-webkit-scrollbar-track {
		background: transparent;
	}

	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: rgba(0, 255, 209, 0.4);
		border-radius: 3px;
	}

	.custom-scrollbar::-webkit-scrollbar-thumb:hover {
		background: rgba(0, 255, 209, 0.6);
	}

	.custom-scrollbar {
		scrollbar-width: thin;
		scrollbar-color: rgba(0, 255, 209, 0.4) transparent;
	}

	@media (hover: none) and (pointer: coarse) {
		.custom-scrollbar::-webkit-scrollbar {
			display: none;
		}

		.custom-scrollbar {
			scrollbar-width: none;
		}
	}
</style>
