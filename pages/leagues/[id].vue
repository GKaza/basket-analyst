<script setup>
const route = useRoute();
const runtimeConfig = useRuntimeConfig();
let season = new Date().getFullYear();
const month = new Date().getMonth();
if (month < 7) {
	season--;
}
const seasonCode = `${route.params.id}${season}`;
const URL = `${runtimeConfig.public.apiBase}competitions/${route.params.id}/seasons/${seasonCode}/clubs`;

const { data: teams } = await useFetch(URL, {
	transform: (res) => {
		return res.data;
	},
});
</script>

<template>
	<ul>
		<li v-for="team in teams" :key="team.code">
			<NuxtLink :to="{ name: 'teams-id', params: { id: team.code } }"
				>{{ team.name }}
			</NuxtLink>
		</li>
	</ul>
</template>

<style scoped></style>
