function countWords(sentence) {
	return (sentence.match(/\w+/g) || []).length
}
