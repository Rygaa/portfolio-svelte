<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { assetsStore } from '$lib/utils/resourceLoader';

	let programmingSkills = $derived.by(() => [
		{ icon: $assetsStore['javascript-original'] || '', name: 'JavaScript', alt: 'JavaScript logo' },
		{ icon: $assetsStore['typescript-original'] || '', name: 'TypeScript', alt: 'TypeScript logo' },
		{ icon: $assetsStore['react-original'] || '', name: 'React', alt: 'React logo' },
		{ icon: $assetsStore['vuejs-original'] || '', name: 'Vue.js', alt: 'Vue.js logo' },
		{ icon: $assetsStore['nodejs-original'] || '', name: 'Node.js', alt: 'Node.js logo' },
		{ icon: $assetsStore['threejs-original'] || '', name: 'Three.js', alt: 'Three.js logo' },
		{ icon: $assetsStore['svelte-svgrepo-com'] || '', name: 'Svelte', alt: 'Svelte logo' },
		{ icon: $assetsStore['nextjs-fill-svgrepo-com'] || '', name: 'Next.js', alt: 'Next.js logo' },
		{ icon: $assetsStore['nestjs-svgrepo-com'] || '', name: 'Nest.js', alt: 'Nest.js logo' },
		{ icon: $assetsStore['express-original'] || '', name: 'Express', alt: 'Express logo' },
		{ icon: $assetsStore['java-original'] || '', name: 'Java', alt: 'Java logo' },
		{ icon: $assetsStore['cplusplus-original'] || '', name: 'C++', alt: 'C++ logo' },
		{ icon: $assetsStore['php-svgrepo-com'] || '', name: 'PHP', alt: 'PHP logo' }
	]);

	let techSkills = $derived.by(() => [
		{ icon: $assetsStore['postgresql-original'] || '', name: 'PostgreSQL', alt: 'PostgreSQL logo' },
		{ icon: $assetsStore['mongodb-original'] || '', name: 'MongoDB', alt: 'MongoDB logo' },
		{ icon: $assetsStore['light-prisma-svgrepo-com'] || '', name: 'Prisma', alt: 'Prisma logo' },
		{
			icon: $assetsStore['Drizzle--Streamline-Simple-Icons'] || '',
			name: 'Drizzle',
			alt: 'Drizzle logo'
		},
		{ icon: $assetsStore['websocket-original'] || '', name: 'WebSocket', alt: 'WebSocket logo' },
		{ icon: $assetsStore['http-original'] || '', name: 'REST APIs', alt: 'HTTP logo' },
		{ icon: $assetsStore['trpc'] || '', name: 'tRPC', alt: 'tRPC logo' },
		{
			icon: $assetsStore['tailwind-svgrepo-com'] || '',
			name: 'Tailwind CSS',
			alt: 'Tailwind CSS logo'
		},
		{ icon: $assetsStore['shadcn-ui-seeklogo'] || '', name: 'shadcn/ui', alt: 'shadcn/ui logo' },
		{
			icon: $assetsStore['framer-svgrepo-com'] || '',
			name: 'Framer Motion',
			alt: 'Framer Motion logo'
		},
		{ icon: $assetsStore['nginx-original'] || '', name: 'Nginx', alt: 'Nginx logo' },
		{ icon: $assetsStore['caddy-svgrepo-com'] || '', name: 'Caddy', alt: 'Caddy logo' },
		{ icon: $assetsStore['pm2'] || '', name: 'PM2', alt: 'PM2 logo' },
		{ icon: $assetsStore['docker-svgrepo-com'] || '', name: 'Docker', alt: 'Docker logo' },
		{ icon: $assetsStore['aws-svgrepo-com'] || '', name: 'AWS', alt: 'AWS logo' },
		{ icon: $assetsStore['azure-v2-svgrepo-com'] || '', name: 'Azure', alt: 'Azure logo' },
		{
			icon: $assetsStore['cloudflare-svgrepo-com'] || '',
			name: 'Cloudflare',
			alt: 'Cloudflare logo'
		},
		{
			icon: $assetsStore['network-wireless-signal-excellent-svgrepo-com'] || '',
			name: $t.skills.networking,
			alt: 'Networking logo'
		}
	]);

	let othersSkills = $derived.by(() => [
		{
			icon: $assetsStore['terminal-svgrepo-com'] || '',
			name: 'Linux/Unix',
			alt: 'Linux/Unix logo'
		},
		{ icon: $assetsStore['git-merge-svgrepo-com'] || '', name: 'Git', alt: 'Git logo' },
		{ icon: $assetsStore['github'] || '', name: 'GitHub', alt: 'GitHub logo' },
		{ icon: $assetsStore['ci-cd-svgrepo-com'] || '', name: 'CI/CD', alt: 'CI/CD logo' },
		{ icon: $assetsStore['figma-original'] || '', name: 'Figma', alt: 'Figma logo' },
		{ icon: '', name: $t.skills.french, alt: '' },
		{ icon: '', name: $t.skills.english, alt: '' }
	]);

	let activeCategory: 'programming' | 'tech' | 'others' = $state('programming');

	let activeSkills = $derived(
		activeCategory === 'programming'
			? programmingSkills
			: activeCategory === 'tech'
				? techSkills
				: othersSkills
	);
</script>

<section id="skills-section" class="relative flex flex-col items-center w-full self-center">
	<div class="flex flex-col w-full max-w-[50rem] items-start mt-8 md:mt-12 px-4">
		<p class="text-[1.3rem] md:text-[1.7rem] text-white justify-self-start">
			{$t.skills.title}
		</p>

		<div class="w-full">
			<div class="flex">
				<button
					class="pt-6 md:pt-10 text-base md:text-xl text-center flex-1 pb-2 md:pb-3 select-none bg-transparent border-b-[2px] md:border-b-[3px] cursor-pointer
						{activeCategory === 'programming'
						? 'text-[#00ffd1] border-[#00ffd1]'
						: 'text-white border-[rgba(0,255,209,0.2)]'}"
					onclick={() => (activeCategory = 'programming')}
				>
					{$t.skills.programming}
				</button>
				<button
					class="pt-6 md:pt-10 text-base md:text-xl text-center flex-1 pb-2 md:pb-3 select-none bg-transparent border-b-[2px] md:border-b-[3px] cursor-pointer
						{activeCategory === 'tech'
						? 'text-[#00ffd1] border-[#00ffd1]'
						: 'text-white border-[rgba(0,255,209,0.2)]'}"
					onclick={() => (activeCategory = 'tech')}
				>
					{$t.skills.tech}
				</button>
				<button
					class="pt-6 md:pt-10 text-base md:text-xl text-center flex-1 pb-2 md:pb-3 select-none bg-transparent border-b-[2px] md:border-b-[3px] cursor-pointer
						{activeCategory === 'others'
						? 'text-[#00ffd1] border-[#00ffd1]'
						: 'text-white border-[rgba(0,255,209,0.2)]'}"
					onclick={() => (activeCategory = 'others')}
				>
					{$t.skills.others}
				</button>
			</div>

			<div
				class="mt-6 md:mt-10 grid h-min items-center gap-y-6 md:gap-y-12 gap-x-4 md:gap-x-6"
				style="grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));"
			>
				{#each activeSkills as skill}
					<div class="flex items-center gap-2">
						{#if skill.icon}
							<img src={skill.icon} alt={skill.alt} class="w-6 h-6 md:w-8 md:h-8" />
						{/if}
						<p class="text-base md:text-xl text-white px-2 md:px-4">
							{skill.name}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
