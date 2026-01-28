export function createSinLookupTable(steps: number) {
	const table: number[] = [];
	for (let i = 0; i < steps; i++) {
		table.push(Math.sin((i / steps) * Math.PI * 2));
	}
	return table;
}
