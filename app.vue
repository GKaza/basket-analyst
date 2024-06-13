<script setup>
const { initState } = useSelections();
const isLoading = useLoadingIndicator().isLoading;
useHead({
	titleTemplate: (titleChunk) => {
		const baseTitle = 'Basket analytics';
		return titleChunk ? `${titleChunk} | ${baseTitle}` : `${baseTitle}`;
	},
	link: [{ rel: 'icon', type: 'image/png', href: '/logo.png' }],
	bodyAttrs: {
		class: 'font-roboto',
		'data-theme': 'maintheme',
	},
});

onBeforeMount(() => {
	initState();
});
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
	transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
	opacity: 0;
	filter: blur(1rem);
}
</style>
