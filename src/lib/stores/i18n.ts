import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import en from '$lib/translations/en';
import fr from '$lib/translations/fr';

export type Language = 'en' | 'fr';

export type Translations = typeof en;

const translations: Record<Language, Translations> = {
	en,
	fr
};

function getInitialLanguage(): Language | null {
	if (browser) {
		const stored = localStorage.getItem('language') as Language;
		if (stored && (stored === 'en' || stored === 'fr')) {
			return stored;
		}

		return null;
	}
	return 'en';
}

export function needsLanguageSelection(): boolean {
	return browser && getInitialLanguage() === null;
}

function createLanguageStore() {
	const initialLang = getInitialLanguage() || 'en';
	const { subscribe, set, update } = writable<Language>(initialLang);

	return {
		subscribe,
		set: (value: Language) => {
			if (browser) {
				localStorage.setItem('language', value);
			}
			set(value);
		},
		update
	};
}

export const language = createLanguageStore();

export const t = derived(language, ($language) => translations[$language]);

export function setLanguage(lang: Language) {
	language.set(lang);
}
