export function incrementingArray(length: number): number[] {
	return Array.from(Array(length).keys())
}

export function copyWithUpdate<T>(array: T[], ...updates: [number, T][]): T[] {
	return incrementingArray(array.length)
		.map(index => update(index, ...updates) || array[index])
}

function update<T>(index: number, ...updates: [number, T][]): T {
	return updates
		.filter(update => update[0] == index)
		.map(update => update[1])
		[0]
}
