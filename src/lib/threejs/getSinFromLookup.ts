export function getSinFromLookup(value: number, sinLookupTable: number[]) {
	const steps = sinLookupTable.length;
	const normalized = ((value % (Math.PI * 2)) / (Math.PI * 2)) * steps;
	const index = Math.floor(normalized);
	const nextIndex = (index + 1) % steps;
	const fraction = normalized - index;
	return sinLookupTable[index] * (1 - fraction) + sinLookupTable[nextIndex] * fraction;
}
