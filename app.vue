<script setup>
useHead({
	titleTemplate: (titleChunk) => {
		const baseTitle = 'Basket analytics';
		return titleChunk ? `${titleChunk} | ${baseTitle}` : `${baseTitle}`;
	},
	link: [{ rel: 'icon', type: 'image/png', href: '/logo.png' }],
});
</script>

<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
