<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
	import { page } from '$app/stores';
	import { trackPageView } from '$lib/utils/analytics';
	import { onMount } from 'svelte';

	let { children } = $props();

	let showSwitcher = $derived($page.url.pathname !== '/');

	onMount(() => {
		trackPageView();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if showSwitcher}
	<LanguageSwitcher />
{/if}

{@render children()}
