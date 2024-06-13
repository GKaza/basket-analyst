<script lang="ts" setup></script>

<template>
	<div class="hero min-h-[calc(100dvh-64px)]">
		<div class="hero-content flex-col lg:flex-row">
			<img src="/logo.png" alt="Logo" class="max-w-xs" />
			<div>
				<h1 class="text-5xl font-chakra font-bold">
					Basketball database
				</h1>
				<p class="py-6">
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
