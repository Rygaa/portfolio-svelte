export function disableHorizontalScroll(): void {
	document.body.style.setProperty('overflow-x', 'hidden', 'important');
}

export function disableVerticalScroll(): void {
	document.body.style.setProperty('overflow-y', 'hidden', 'important');
}

export function enableVerticalScroll(): void {
	document.body.style.setProperty('overflow-y', 'auto', 'important');
}

export function scrollToTop(behavior: ScrollBehavior = 'auto'): void {
	window.scrollTo({ top: 0, behavior });
	document.body.scrollTo({ top: 0, behavior });
}

export function setupScrollRestoration(): void {}

export function initializeScroll(): void {
	setupScrollRestoration();
	disableHorizontalScroll();
	disableVerticalScroll();
	scrollToTop();
	setTimeout(() => scrollToTop(), 0);
}
