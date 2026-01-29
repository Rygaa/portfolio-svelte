import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase, shouldTrack } from '$lib/supabase';
import type { Database } from '$lib/database.types';

const allowedEvents = ['page_view', 'language_select', 'button_click', 'session_end'];

const sanitizeString = (str: any): string | undefined => {
	if (typeof str !== 'string') return str;
	return str.replace(/[<>]/g, '').substring(0, 200);
};

export const POST: RequestHandler = async ({ request }) => {
	console.log('📊 Track API called, shouldTrack:', shouldTrack);
	
	// Check if tracking is enabled
	if (!shouldTrack) {
		console.log('⚠️ Tracking is disabled');
		return json({ success: true, message: 'Tracking disabled' });
	}

	try {
		const event = await request.json();
		console.log('📥 Received event:', event);

		if (!event || typeof event !== 'object' || !event.event) {
			return json({ success: false, error: 'Invalid event data' }, { status: 400 });
		}

		if (!allowedEvents.includes(event.event)) {
			return json({ success: false, error: 'Invalid event type' }, { status: 400 });
		}

		const sanitizedEvent: Database['public']['Tables']['analytics_events']['Insert'] = {
			event_type: event.event,
			session_id: sanitizeString(event.sessionId) || '',
			timestamp: event.timestamp || new Date().toISOString(),
			button: event.button ? sanitizeString(event.button) || null : null,
			language: event.language ? sanitizeString(event.language) || null : null,
			duration: typeof event.duration === 'number' ? event.duration : null,
			is_maybe_a_bot: event.isMaybeABot !== undefined ? event.isMaybeABot : null
		};

		// Rate limiting: check events in last hour
		const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
		console.log('🔍 Checking rate limit...');
		const { count, error: countError } = await supabase
			.from('analytics_events')
			.select('*', { count: 'exact', head: true })
			.gte('timestamp', oneHourAgo);

		if (countError) {
			console.error('❌ Rate limit check error:', countError);
			return json({ success: false, error: 'Database error' }, { status: 500 });
		}
		console.log('✅ Rate limit check passed, count:', count);

		if (count && count >= 1000) {
			return json({ success: false, error: 'Rate limit exceeded' }, { status: 429 });
		}

		// Insert event into Supabase
		console.log('💾 Inserting event:', sanitizedEvent);
		const { error: insertError } = await supabase
			.from('analytics_events')
			.insert(sanitizedEvent);

		if (insertError) {
			console.error('❌ Insert error:', insertError);
			return json({ success: false, error: 'Database error' }, { status: 500 });
		}

		console.log('✅ Event inserted successfully');
		return json({ success: true });
	} catch (error) {
		console.error('Analytics error:', error);
		return json({ success: false, error: String(error) }, { status: 500 });
	}
};
