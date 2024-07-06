export default function displayName(string) {
	let resultArray = string.split(', ').reverse();
	return `${capitalize(resultArray[0])} ${capitalize(resultArray[1])}`;
}

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
