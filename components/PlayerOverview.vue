<script setup>
const { id } = useRoute().params;
const { playerInfo, selectedLeague, fetchApi } = useSelections();

const { data: bio } = await fetchApi({
	personCode: id,
	query: 'bio',
});

let latestGames = ref([]);
const { data: stats } = await fetchApi({
	competitionCode: selectedLeague,
	personCode: id,
	query: 'stats',
});

if (stats.value) {
	latestGames = stats.value.games.slice(-10);
}
// console.log(stats);
</script>

<template>
	<div>
		<div>
			<img
				:src="playerInfo.images.headshot"
				:alt="playerInfo.person.name"
				width="50px"
			/>
			<h2>{{ playerInfo.person.name }}</h2>
			<p v-if="playerInfo.club.name">
				Playing for {{ playerInfo.club.name }}
			</p>
			<img
				:src="playerInfo.club.images.crest"
				:alt="playerInfo.club.name"
				width="30px"
			/>
			<p v-if="playerInfo.person.height">
				Height: {{ playerInfo.person.height }}cm
			</p>
			<p v-if="playerInfo.person.weight">
				Weight: {{ playerInfo.person.weight }}kg
			</p>
			<p v-if="playerInfo.person.birthDate">
				Date of birth: {{ playerInfo.person.birthDate.split('T')[0] }}
			</p>
			<p v-if="playerInfo.dorsal">Jersey #: {{ playerInfo.dorsal }}</p>
			<p v-if="bio.bio">{{ bio.bio }}</p>
		</div>
		<div></div>
	</div>
</template>

<style scoped></style>
