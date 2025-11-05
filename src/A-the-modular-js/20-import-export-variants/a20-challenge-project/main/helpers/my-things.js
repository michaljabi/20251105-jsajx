export function addNumbers(...allNumbers) {
	return allNumbers.reduce((a, b) => a + b, 0)
}

export function averageFrom(...allNumbers) {
	return addNumbers(...allNumbers) / allNumbers.length;
}
