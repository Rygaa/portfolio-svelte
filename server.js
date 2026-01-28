import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 2000;

app.use(express.json());
app.use(express.static('build'));

// Admin authentication
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
let adminToken = null;

console.log('Environment check:');
console.log('ADMIN_PASSWORD loaded:', ADMIN_PASSWORD ? 'YES' : 'NO');
console.log('Value:', ADMIN_PASSWORD);

if (!ADMIN_PASSWORD) {
	console.error('ADMIN_PASSWORD is not set in environment variables.');
	console.error('Make sure .env file exists and contains ADMIN_PASSWORD=your_password');
	process.exit(1);
}

app.post('/api/admin/login', (req, res) => {
	const { password } = req.body;
	if (password === ADMIN_PASSWORD) {
		adminToken = Math.random().toString(36).substring(2);
		res.json({ success: true, token: adminToken });
	} else {
		res.status(401).json({ success: false });
	}
});

app.get('/api/admin/analytics', async (req, res) => {
	const analyticsFile = path.join(__dirname, 'analytics.json');
	try {
		const content = await fs.readFile(analyticsFile, 'utf8');
		const data = JSON.parse(content);
		res.json(data);
	} catch (error) {
		res.json({ events: [] });
	}
});

app.post('/api/track', async (req, res) => {
	try {
		const event = req.body;

		// Validate event data before saving
		if (!event || typeof event !== 'object' || !event.event) {
			console.log('Invalid event rejected:', event);
			return res.status(400).json({ success: false, error: 'Invalid event data' });
		}

		// Whitelist allowed event types
		const allowedEvents = ['page_view', 'language_select', 'button_click', 'session_end'];
		if (!allowedEvents.includes(event.event)) {
			return res.status(400).json({ success: false, error: 'Invalid event type' });
		}

		// Sanitize strings to prevent injection
		const sanitizeString = (str) => {
			if (typeof str !== 'string') return str;
			return str.replace(/[<>]/g, '').substring(0, 200); // Remove < > and limit length
		};

		const sanitizedEvent = {
			event: event.event,
			button: sanitizeString(event.button),
			language: sanitizeString(event.language),
			duration: typeof event.duration === 'number' ? event.duration : undefined,
			sessionId: sanitizeString(event.sessionId),
			timestamp: event.timestamp
		};

		const analyticsFile = path.join(__dirname, 'analytics.json');

		let data = { events: [] };
		try {
			const content = await fs.readFile(analyticsFile, 'utf8');
			data = JSON.parse(content);
			if (!data.events || !Array.isArray(data.events)) data.events = [];
			// Filter out any null values
			data.events = data.events.filter((e) => e !== null && e !== undefined);

			// Rate limiting: 1000 events per hour
			const oneHourAgo = Date.now() - 60 * 60 * 1000;
			const recentEvents = data.events.filter((e) => {
				const eventTime = new Date(e.timestamp).getTime();
				return eventTime > oneHourAgo;
			});

			if (recentEvents.length >= 1000) {
				return res.status(429).json({ success: false, error: 'Rate limit exceeded' });
			}

			// Clean up old events (keep last 24 hours only)
			const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
			data.events = data.events.filter((e) => {
				const eventTime = new Date(e.timestamp).getTime();
				return eventTime > oneDayAgo;
			});
		} catch (error) {}

		data.events.push(sanitizedEvent);

		await fs.writeFile(analyticsFile, JSON.stringify(data, null, 2));

		res.status(200).json({ success: true });
	} catch (error) {
		console.error('Analytics error:', error);
		res.status(500).json({ success: false });
	}
});

app.get('/{*splat}', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
	console.log('Server listening to', PORT);
});
