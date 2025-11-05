function addNumbers(...allNumbers) {
	return allNumbers.reduce((a, b) => a + b, 0)
}

function averageFrom(...allNumbers) {
	return addNumbers(...allNumbers) / allNumbers.length;
}
