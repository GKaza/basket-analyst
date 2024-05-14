<script setup>
const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const URL = `${runtimeConfig.public.apiBase}competitions/`;

const { data: leagues, pending } = await useFetch(URL, {
	transform: (leagues) => {
		return leagues.data;
	},
});

// useHead({ title: route.params.name });
</script>

<template>
	<div v-if="pending">Loading..</div>
	<div v-else>
		<ul>
			<li v-for="league in leagues" :key="league.code">
				<NuxtLink
					:to="{
						name: 'leagues-id',
						params: { id: league.code },
					}"
					>{{ league.name }}
				</NuxtLink>
			</li>
		</ul>
	</div>
</template>

<style scoped></style>
