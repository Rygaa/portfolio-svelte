import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase, shouldTrack } from '$lib/supabase';

const ADMIN_PASSWORD = process.env['admin_password'] || process.env['ADMIN_PASSWORD'];

export const POST: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as { action?: string; password?: string };
	const { action, password } = body;

	if (password !== ADMIN_PASSWORD) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	if (action === 'login') {
		return json({ success: true });
	}

	if (action === 'analytics') {
		console.log('📈 Admin analytics requested, shouldTrack:', shouldTrack);
		
		if (!shouldTrack) {
			console.log('⚠️ Tracking is disabled');
			return json({ events: [], message: 'Tracking disabled' });
		}

		// Get events from last 24 hours
		const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

		console.log('🔍 Fetching analytics from Supabase...');
		const { data, error } = await supabase
			.from('analytics_events')
			.select('*')
			.gte('timestamp', oneDayAgo)
			.order('timestamp', { ascending: false });

		if (error) {
			console.error('❌ Analytics fetch error:', error);
			return json({ events: [], error: 'Database error' }, { status: 500 });
		}
		
		console.log('✅ Fetched', data?.length || 0, 'events');

		// Transform to match expected format
		const events = (data || []).map((row) => ({
			event: row.event_type,
			sessionId: row.session_id,
			timestamp: row.timestamp,
			button: row.button,
			language: row.language,
			duration: row.duration,
			isMaybeABot: row.is_maybe_a_bot
		}));

		return json({ events });
	}

	return json({ error: 'Invalid action' }, { status: 400 });
};
