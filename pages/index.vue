<script lang="ts" setup>
onBeforeMount(() => getMainBackground());
</script>

<template>
	<div class="hero relative viewport">
		<div class="bg-main"></div>
		<div
			class="hero-content p-8 container overflow-hidden flex-col lg:flex-row"
		>
			<img
				src="/logo.png"
				alt="Logo"
				class="max-w-xs drop-shadow-[0_0px_8px_rgba(255,255,255,0.2)]"
			/>
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
