export default function capitalize(str) {
	if (!str) return str;
	return str
		.split(/(\s|-|mc)/gi)
		.map((word) => {
			// Check if the segment is a word
			if (/\w/.test(word)) {
				return (
					word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
				);
			}
			return word; // Return the delimiter unchanged
		})
		.join('');
}
