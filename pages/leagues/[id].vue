<script setup>
const route = useRoute();
const selections = useSelections();
selections.selectedLeague = `${route.params.id}`;
const { data: seasons } = await selections.fetchApi({
	competitionCode: selections.selectedLeague,
	query: 'seasons',
});
if (seasons.value) {
	selections.seasonCode = seasons.value.data[0].code;
}

const { data, pending } = await selections.fetchApi({
	competitionCode: `${route.params.id}`,
	seasonCode: true,
	query: 'clubs',
	storeVar: 'leagueRes',
});

let league = selections.allLeaguesRes.find((l) => {
	return l.code === selections.selectedLeague;
});
if (league) {
	useHead({ title: league.name });
}
</script>

<template>
	<div>
		<div v-if="pending">Loading..</div>
		<ul v-else>
			<li v-for="team in selections.leagueRes" :key="team.code">
				<NuxtLink :to="{ name: 'teams-id', params: { id: team.code } }">
					<img
						:src="team.images.crest"
						:alt="team.name"
						style="width: 30px"
					/>
					{{ team.name }}
				</NuxtLink>
			</li>
		</ul>
	</div>
</template>

<style scoped></style>
