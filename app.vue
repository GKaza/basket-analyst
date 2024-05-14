<script setup>
useHead({
	titleTemplate: (titleChunk) => {
		const baseTitle = 'Basket analytics';
		return titleChunk ? `${titleChunk} | ${baseTitle}` : `${baseTitle}`;
	},
});
</script>

<template>
	<div>
		<NuxtLoadingIndicator />
		<Navbar />
		<NuxtPage />
	</div>
</template>
