<script setup>
const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const URL = `${runtimeConfig.public.apiBase}clubs/${route.params.id}`;

const { data: team } = await useFetch(URL, {
	transform: (res) => {
		return res;
	},
});
useHead({ title: team.value.name });
</script>

<template>
	<pre>{{ team }}</pre>
	<div>
		<img :src="team.images.crest" :alt="team.name" />
		<h2>{{ team.name }}</h2>
	</div>
</template>

<style scoped></style>
