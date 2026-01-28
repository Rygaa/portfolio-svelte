interface TrackingEvent {
	event: 'page_view' | 'language_select' | 'button_click' | 'session_end';
	language?: string;
	button?: string;
	duration?: number;
	isMaybeABot?: boolean;
}

let startTime: number;
let sessionId: string;
let initialized = false;

function generateSessionId(): string {
	return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function detectBot(): boolean {
	if (typeof window === 'undefined' || typeof navigator === 'undefined') return true;

	// Check for webdriver (automated browsers)
	if (navigator.webdriver) return true;

	// Check User-Agent for common bot signatures
	const botPatterns = [
		/bot/i,
		/crawl/i,
		/spider/i,
		/slurp/i,
		/mediapartners/i,
		/googlebot/i,
		/bingbot/i,
		/yandexbot/i,
		/duckduckbot/i,
		/baiduspider/i,
		/facebookexternalhit/i,
		/twitterbot/i,
		/linkedinbot/i,
		/whatsapp/i,
		/telegrambot/i,
		/slack/i,
		/curl/i,
		/wget/i,
		/python/i,
		/java/i,
		/node/i,
		/axios/i,
		/fetch/i
	];

	const userAgent = navigator.userAgent || '';
	if (botPatterns.some((pattern) => pattern.test(userAgent))) return true;

	// Check for headless browser indicators
	if (!navigator.plugins || navigator.plugins.length === 0) {
		// Modern real browsers have plugins, headless often don't
		if (!navigator.pdfViewerEnabled) return true;
	}

	// Check for phantom/headless specific properties
	if ((window as any)._phantom || (window as any).callPhantom) return true;
	if ((window as any).__nightmare) return true;
	if ((document as any).__selenium_unwrapped || (document as any).__webdriver_evaluate) return true;
	if ((document as any).__driver_evaluate || (document as any).__webdriver_script_fn) return true;

	// Check for suspicious screen dimensions (0x0 often indicates bot)
	if (screen.width === 0 || screen.height === 0) return true;

	// Check for missing window.chrome in Chrome User-Agent (headless Chrome often lacks this)
	if (userAgent.includes('Chrome') && !(window as any).chrome) return true;

	// Check for languages (bots often have none or suspicious values)
	if (!navigator.languages || navigator.languages.length === 0) return true;

	return false;
}

function initialize() {
	if (typeof window === 'undefined') return;

	startTime = Date.now();
	sessionId = generateSessionId();

	window.addEventListener('beforeunload', () => {
		trackSessionEnd();
	});
}

async function track(event: TrackingEvent) {
	if (!initialized) {
		initialized = true;
	}

	try {
		const isMaybeABot = detectBot();

		const data = JSON.stringify({
			...event,
			sessionId,
			timestamp: new Date().toISOString(),
			isMaybeABot
		});

		if (event.event === 'session_end' && navigator.sendBeacon) {
			const blob = new Blob([data], { type: 'application/json' });
			navigator.sendBeacon('/api/track', blob);
		} else {
			fetch('/api/track', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: data,
				keepalive: event.event === 'session_end'
			}).catch(() => {});
		}
	} catch (error) {}
}

export function trackPageView(language?: string) {
	track({
		event: 'page_view',
		language
	});
}

export function trackLanguageSelect(language: string) {
	track({
		event: 'language_select',
		language
	});
}

export function trackButtonClick(button: string, language?: string) {
	track({
		event: 'button_click',
		button,
		language
	});
}

export function trackSessionEnd() {
	const duration = Math.round((Date.now() - startTime) / 1000);
	track({
		event: 'session_end',
		duration
	});
}

if (typeof window !== 'undefined') {
	initialize();
}
