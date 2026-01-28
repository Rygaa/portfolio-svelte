<script lang="ts">
	import { t, language } from '$lib/stores/i18n';
	import { trackButtonClick } from '$lib/utils/analytics';
	import { assetsStore } from '$lib/utils/resourceLoader';

	const githubImg = $derived($assetsStore['github'] || '');
	const linkedinImg = $derived($assetsStore['linkedin'] || '');
	const resumeEnPdf = $derived($assetsStore['aissa_dev_cv_en'] || '');
	const resumeFrPdf = $derived($assetsStore['aissa_dev_cv_fr'] || '');
	const profilePicture = $derived($assetsStore['profile-picture'] || '');
	const copyIcon = $derived($assetsStore['copy-svgrepo-com'] || '');

	let {
		phone = '+1 (438) 925 9863',
		email = 'aissabenfodda@protonmail.com',
		githubUrl = 'https://github.com/Rygaa',
		linkedinUrl = 'https://www.linkedin.com/in/aissa-b-3a151821a/'
	}: {
		phone?: string;
		email?: string;
		githubUrl?: string;
		linkedinUrl?: string;
	} = $props();

	let resumeUrl = $derived($language === 'en' ? resumeEnPdf : resumeFrPdf);

	async function copyToClipboard(text: string, type: 'phone' | 'email') {
		try {
			await navigator.clipboard.writeText(text);
			trackButtonClick(`copy_${type}`);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}
</script>

<section id="contact" class="flex flex-col items-center justify-center w-full pb-40 pt-20 gap-10">
	<div class="flex flex-col w-full max-w-[50rem] px-4">
		<div class="flex items-center w-full mb-10 md:mb-14 select-none">
			<div class="h-0.5 flex-1 bg-white/20"></div>
			<p class="text-[1.3rem] md:text-[1.7rem] px-4 md:px-8 text-white/90">
				{$t.contact.title}
			</p>
			<div class="h-0.5 flex-1 bg-white/20"></div>
		</div>

		<p
			class="text-base md:text-2xl tracking-[0.05rem] md:tracking-[0.1rem] text-white leading-8 md:leading-[3.25rem] text-center select-none self-center"
		>
			{$t.contact.subtitle} <br />{$t.contact.description}
		</p>

		<div
			class="w-full md:w-[calc(100%-2.5rem)] self-center flex flex-col p-6 md:p-5 px-6 md:px-8 mt-12 md:mt-20 border border-white/5 shadow-[0px_0px_20px_5px_rgba(0,0,0,0.25)] rounded-md bg-black/25 transition-all duration-300 hover:bg-black/35"
		>
			<div class="flex flex-row gap-4 md:gap-8 items-center">
				<img
					src={profilePicture}
					alt="Profile"
					class="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-white/20 shadow-lg flex-shrink-0"
				/>

				<div class="flex flex-col gap-1.5 md:gap-2 flex-1">
					<div class="flex items-center gap-2">
						<p
							class="text-sm md:text-lg font-bold tracking-[0.05rem] md:tracking-[0.075rem] text-left text-white"
						>
							{phone}
						</p>
						<button
							onclick={() => copyToClipboard(phone, 'phone')}
							class="cursor-pointer p-1 hover:bg-white/10 rounded transition-colors"
							aria-label="Copy phone number"
						>
							<img src={copyIcon} alt="Copy" class="w-4 h-4 brightness-[0.6] hover:brightness-90" />
						</button>
					</div>
					<div class="flex items-center gap-2">
						<p
							class="text-sm md:text-lg font-bold tracking-[0.05rem] md:tracking-[0.075rem] text-left text-white"
						>
							{email}
						</p>
						<button
							onclick={() => copyToClipboard(email, 'email')}
							class="cursor-pointer p-1 hover:bg-white/10 rounded transition-colors"
							aria-label="Copy email"
						>
							<img src={copyIcon} alt="Copy" class="w-4 h-4 brightness-[0.6] hover:brightness-90" />
						</button>
					</div>
				</div>
			</div>

			<div
				class="w-full my-5 md:my-6 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
			></div>

			<div class="flex gap-3 pb-2 items-center">
				<a
					href={githubUrl}
					target="_blank"
					rel="noopener noreferrer"
					onclick={() => trackButtonClick('github_link')}
					class="cursor-pointer transition-transform duration-300 hover:-translate-y-1"
				>
					<img src={githubImg} alt="GitHub profile" class="w-10 h-10" />
				</a>
				<a
					href={linkedinUrl}
					target="_blank"
					rel="noopener noreferrer"
					onclick={() => trackButtonClick('linkedin_link')}
					class="cursor-pointer transition-transform duration-300 hover:-translate-y-1"
				>
					<img src={linkedinImg} alt="LinkedIn profile" class="w-10 h-10" />
				</a>
				<a
					target="_blank"
					href={resumeUrl}
					onclick={() => trackButtonClick('download_cv')}
					class="text-sm md:text-lg rounded-md h-11 md:h-[3.75rem] flex-1 cursor-pointer box-border flex justify-center items-center font-bold tracking-[0.05rem] md:tracking-[0.075rem] bg-black/20 border border-white/10 text-white no-underline hover:bg-black/30 transition-colors"
				>
					{$t.contact.downloadCV}
				</a>
				<!-- <a
          href="mailto:{email}"
          on:click={() => trackButtonClick('send_email')}
          class="text-sm md:text-lg rounded-md h-11 md:h-[3.75rem] flex-1 cursor-pointer box-border flex justify-center items-center font-bold tracking-[0.05rem] md:tracking-[0.075rem] bg-black/20 border border-white/10 text-white no-underline hover:bg-black/30 transition-colors"
        >
          {$t.contact.sendEmail}
        </a> -->
			</div>
		</div>
	</div>
</section>
