<script setup>
const route = useRoute();
const selections = useSelections();
selections.selectedLeague = `${route.params.id}`;

const { data, pending } = await selections.fetchApi({
	competitionCode: `${route.params.id}`,
	seasonCode: 'default',
	query: 'clubs',
	storeVar: 'leagueRes',
});
</script>

<template>
	<div v-if="pending">Loading..</div>
	<ul v-else>
		<li v-for="team in selections.leagueRes" :key="team.code">
			<NuxtLink :to="{ name: 'teams-id', params: { id: team.code } }"
				>{{ team.name }}
			</NuxtLink>
		</li>
	</ul>
	<NoResults v-if="!data.total" />
</template>

<style scoped></style>
