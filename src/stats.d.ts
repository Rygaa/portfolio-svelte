declare module 'stats.js' {
	export default class Stats {
		REVISION: number;
		dom: HTMLDivElement;

		addPanel(panel: Stats.Panel): Stats.Panel;
		showPanel(id: number): void;
		begin(): void;
		end(): number;
		update(): void;
	}

	namespace Stats {
		class Panel {
			dom: HTMLCanvasElement;
			update(value: number, maxValue: number): void;
		}
	}
}
