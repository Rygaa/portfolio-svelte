<script lang="ts">
	import { onMount } from 'svelte';

	let authenticated = $state(false);
	let password = $state('');
	let analytics = $state<any[]>([]);
	let error = $state('');
	let selectedSessionId = $state<string | null>(null);

	let sessionGroups = $derived.by(() => {
		const groups = new Map<string, any[]>();
		analytics.forEach((event) => {
			const sessionId = event.sessionId || 'unknown';
			if (!groups.has(sessionId)) {
				groups.set(sessionId, []);
			}
			groups.get(sessionId)!.push(event);
		});
		return Array.from(groups.entries())
			.map(([sessionId, events]) => ({
				sessionId,
				events: events.sort(
					(a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
				),
				count: events.length,
				firstEvent: events.reduce((earliest, e) =>
					new Date(e.timestamp) < new Date(earliest.timestamp) ? e : earliest
				),
				lastEvent: events.reduce((latest, e) =>
					new Date(e.timestamp) > new Date(latest.timestamp) ? e : latest
				)
			}))
			.sort(
				(a, b) =>
					new Date(b.lastEvent.timestamp).getTime() - new Date(a.lastEvent.timestamp).getTime()
			);
	});

	let currentSessionEvents = $derived(
		selectedSessionId
			? sessionGroups.find((g) => g.sessionId === selectedSessionId)?.events || []
			: []
	);

	async function login() {
		try {
			const response = await fetch('/api/admin/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ password })
			});

			const data = await response.json();
			if (data.success) {
				authenticated = true;
				loadAnalytics();
			} else {
				error = 'Invalid password';
			}
		} catch (err) {
			error = 'Login failed';
		}
	}

	async function loadAnalytics() {
		try {
			const response = await fetch('/api/admin/analytics');
			const data = await response.json();
			analytics = data.events || [];
		} catch (err) {
			error = 'Failed to load analytics';
		}
	}

	function selectSession(sessionId: string) {
		selectedSessionId = sessionId;
	}

	function backToSessions() {
		selectedSessionId = null;
	}
</script>

{#if !authenticated}
	<div class="min-h-screen flex items-center justify-center bg-black">
		<div class="bg-black/50 backdrop-blur-lg p-8 rounded-lg border border-white/10 w-96">
			<h1 class="text-2xl text-white mb-6">Admin Login</h1>
			<input
				type="password"
				bind:value={password}
				onkeydown={(e) => e.key === 'Enter' && login()}
				placeholder="Password"
				class="w-full p-3 bg-white/5 border border-white/20 rounded text-white mb-4"
			/>
			<button
				onclick={login}
				class="w-full p-3 bg-[rgba(0,255,209,0.25)] border border-[rgba(0,255,209,0.5)] rounded text-white hover:bg-[rgba(0,255,209,0.35)]"
			>
				Login
			</button>
			{#if error}
				<p class="text-red-400 mt-4">{error}</p>
			{/if}
		</div>
	</div>
{:else}
	<div class="min-h-screen bg-black p-8">
		<h1 class="text-3xl text-white mb-8">Analytics Dashboard</h1>

		{#if !selectedSessionId}
			<!-- Sessions List View -->
			<div class="bg-black/50 backdrop-blur-lg p-6 rounded-lg border border-white/10">
				<h2 class="text-xl text-white mb-4">Sessions ({sessionGroups.length})</h2>
				<div class="space-y-3 max-h-[70vh] overflow-y-auto">
					{#each sessionGroups as session}
						<button
							onclick={() => selectSession(session.sessionId)}
							class="w-full bg-white/5 p-4 rounded border border-white/10 hover:bg-white/10 transition-colors text-left cursor-pointer"
						>
							<div class="flex justify-between items-start mb-2">
								<p class="text-white font-mono text-sm">{session.sessionId}</p>
								<span class="text-[#00ffd1] text-sm">{session.count} events</span>
							</div>
							<p class="text-white/60 text-xs">
								First: {new Date(session.firstEvent.timestamp).toLocaleString()}
							</p>
							<p class="text-white/60 text-xs">
								Last: {new Date(session.lastEvent.timestamp).toLocaleString()}
							</p>
						</button>
					{/each}
				</div>
			</div>
		{:else}
			<!-- Session Detail View -->
			<div class="bg-black/50 backdrop-blur-lg p-6 rounded-lg border border-white/10">
				<div class="flex items-center gap-4 mb-6">
					<button
						onclick={backToSessions}
						class="px-4 py-2 bg-white/5 border border-white/20 rounded text-white hover:bg-white/10 transition-colors"
					>
						← Back
					</button>
					<div>
						<h2 class="text-xl text-white">Session Details</h2>
						<p class="text-white/60 text-sm font-mono">{selectedSessionId}</p>
					</div>
				</div>

				<p class="text-white mb-4">Total Events: {currentSessionEvents.length}</p>

				<div class="space-y-2 max-h-[60vh] overflow-y-auto">
					{#each currentSessionEvents as event}
						<div class="bg-white/5 p-3 rounded border border-white/10">
							<p class="text-white"><strong>Event:</strong> {event.event}</p>
							{#if event.button}<p class="text-white/80">
									<strong>Button:</strong>
									{event.button}
								</p>{/if}
							{#if event.language}<p class="text-white/80">
									<strong>Language:</strong>
									{event.language}
								</p>{/if}
							{#if event.duration}<p class="text-white/80">
									<strong>Duration:</strong>
									{event.duration}s
								</p>{/if}
							<p class="text-white/60 text-sm">{new Date(event.timestamp).toLocaleString()}</p>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
{/if}
