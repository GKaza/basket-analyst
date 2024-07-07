<script setup>
onBeforeMount(() => getMainBackground());
const { $anime } = useNuxtApp();

onMounted(() => {
	const tl = $anime.timeline({
		easing: 'easeOutExpo',
		duration: 800,
		autoplay: false,
	});

	tl.add({
		targets: '.basketball',
		translateY: function () {
			const hero = document.querySelector('.hero');
			const distance = Math.ceil(hero.offsetHeight / 2);
			return [distance, 0];
		},
		easing: 'easeOutElastic',
	})
		.add(
			{
				targets: '.hero .basketball',
				opacity: [1, 0],
				scale: [1, 3],
			},
			300
		)
		.add(
			{
				targets: '.hero .hero-image',
				opacity: [0, 1],
			},
			400
		);

	const img = document.querySelector('.hero .hero-image');
	function loaded() {
		tl.play();
	}
	img.complete ? loaded() : (img.onload = loaded);
});
</script>

<template>
	<div class="hero relative viewport overflow-hidden">
		<div class="bg-main"></div>
		<div class="hero-content p-8 container flex-col lg:flex-row">
			<div class="relative">
				<img
					src="/assets/basketball.svg"
					alt="ball"
					class="basketball absolute opacity-0 top-[75px] left-[48%] w-8 h-8"
				/>
				<img
					src="/public/logo.png"
					alt="Logo"
					class="hero-image opacity-0 max-w-xs drop-shadow-[0_0px_8px_rgba(255,255,255,0.2)]"
				/>
			</div>
			<div class="hero-text-bg relative my-8 mx-[calc(1%+2rem)]">
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
