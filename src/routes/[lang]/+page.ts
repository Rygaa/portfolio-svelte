import type { PageLoad } from './$types';
import { setLanguage, type Language } from '$lib/stores/i18n';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = ({ params }) => {
	const lang = params.lang as string;

	if (lang !== 'en' && lang !== 'fr') {
		throw redirect(307, '/');
	}

	setLanguage(lang as Language);

	return {
		lang: lang as Language
	};
};
