<script setup>
const { $anime } = useNuxtApp();

function handleLoad(e) {
	e.target.classList.remove("opacity-0");
}

onMounted(() => {
	getMainBackground();
	const tl = $anime.timeline({
		easing: "easeOutExpo",
		duration: 800,
		autoplay: false,
	});

	tl.add({
		targets: ".basketball",
		top: function () {
			const ball = document.querySelector(".basketball");
			const navHeight = document.querySelector(".navbar").offsetHeight;
			const distance = Math.ceil(
				ball.getBoundingClientRect().top + ball.offsetHeight - navHeight
			);
			return [-distance, 75];
		},
		rotate: {
			value: 360,
			easing: "easeInOutSine",
		},
		easing: "easeOutElastic",
	})
		.add(
			{
				targets: ".hero .basketball",
				opacity: [1, 0],
				scale: [1, 3],
			},
			300
		)
		.add(
			{
				targets: ".hero .hero-image",
				opacity: [0, 1],
			},
			400
		);

	$anime({
		targets: ".hero .hero-text-bg",
		opacity: [0, 1],
		translateX: [-30, 0],
		duration: 600,
		delay: 150,
		easing: "easeInOutQuad",
	});

	//Start animation on image load
	const img = document.querySelector(".hero .hero-image");
	function loaded() {
		tl.play();
	}
	img.complete ? loaded() : (img.onload = loaded);
});
</script>

<template>
	<div class="hero relative viewport overflow-hidden">
		<div class="bg-main">
			<img @load="handleLoad" alt="background image" class="opacity-0" />
		</div>
		<div class="hero-content p-8 container flex-col lg:flex-row">
			<div class="relative">
				<img
					src="/assets/basketball.svg"
					alt="ball"
					class="basketball absolute opacity-0 left-[48%] w-8 h-8"
				/>
				<img
					src="/public/logo.png"
					alt="Logo"
					class="hero-image opacity-0 max-w-xs drop-shadow-[0_0px_8px_rgba(255,255,255,0.2)]"
				/>
			</div>
			<div
				class="hero-text-bg opacity-0 relative my-8 mx-[calc(2.5%+2rem)]"
			>
				<h1 class="text-5xl font-chakra">Basketball database</h1>
				<p class="text-lg py-6">
					This is a basketball database aiming to give you stats from
					the European leagues.
				</p>
				<NuxtLink to="/leagues" class="btn btn-primary"
					>Get Started</NuxtLink
				>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
