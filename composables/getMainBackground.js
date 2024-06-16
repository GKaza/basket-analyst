export default function getMainBackground() {
	const urls = [
		'https://images.unsplash.com/photo-1602357280104-742c517a1d82?q=80&w=2150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		'https://images.unsplash.com/photo-1556168505-d00e911d52eb?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		'https://images.pexels.com/photos/2529342/pexels-photo-2529342.jpeg',
		'https://images.pexels.com/photos/4562460/pexels-photo-4562460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		'https://images.pexels.com/photos/41433/pexels-photo-41433.jpeg',
		'https://images.pexels.com/photos/2891884/pexels-photo-2891884.jpeg',
		'https://images.pexels.com/photos/273786/pexels-photo-273786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	];
	if (
		document.documentElement.style.getPropertyValue('--main-background-url')
	) {
		return;
	}
	let background = urls[Math.floor(Math.random() * urls.length)];
	let string = `url(${background})`;
	document.documentElement.style.setProperty('--main-background-url', string);
	return;
}
