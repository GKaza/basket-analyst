export default function displayName(string) {
	let resultArray = string.split(", ").reverse();
	return `${capitalize(resultArray[0])} ${capitalize(resultArray[1])}`;
}
