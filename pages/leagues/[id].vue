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
	storeVar: 'teamsRes',
});

let league = selections.allLeaguesRes.find((l) => {
	return l.code === selections.selectedLeague;
});
if (league) {
	useHead({ title: league.name });
}
</script>

<template>
	<div class="container p-4">
		<div v-if="pending">Loading..</div>
		<ul v-else class="flex flex-col gap-4 max-w-full">
			<li
				v-for="team in selections.teamsRes"
				:key="team.code"
				class="w-fit"
			>
				<NuxtLink
					:to="{ name: 'teams-id', params: { id: team.code } }"
					class="flex gap-2"
				>
					<img
						:src="team.images.crest"
						:alt="team.name"
						class="inline-block w-6"
					/>
					{{ team.name }}
				</NuxtLink>
			</li>
		</ul>
	</div>
</template>

<style scoped></style>
