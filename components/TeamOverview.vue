import type { Style } from '#build/components';
<script setup>
const selections = useSelections();
let team = ref({});
let roster = ref([]);
let coach = ref([]);

if (selections.teamInfo) {
	team = selections.teamInfo;
} else {
	const { data } = await selections.fetchApi({
		clubCode: selections.selectedTeam,
	});
	team = data.value;
}
const { data: people } = await selections.fetchApi({
	clubCode: selections.selectedTeam,
	competitionCode: selections.selectedLeague,
	seasonCode: true,
	query: 'people',
});

if (people.value) {
	roster = people.value.filter((person) => {
		return person.typeName === 'Player';
	});
	coach = people.value.find((person) => {
		return person.typeName === 'Coach';
	});
	selections.playersRes = roster;
}
</script>

<template>
	<div>
		<div v-if="team">
			<img
				:src="team.images.crest"
				:alt="team.name"
				style="width: 100px"
			/>
			<h2>{{ team.name }}</h2>
		</div>
		<ul>
			<li v-if="coach">
				<span v-if="coach.person.name">{{ coach.person.name }}</span>
				<span v-if="coach.typeName"> - {{ coach.typeName }}</span>
			</li>
			<li v-for="player in roster">
				<NuxtLink
					:to="{
						name: 'players-id',
						params: { id: player.person.code },
					}"
				>
					<img
						v-if="player.images.headshot"
						:src="player.images.headshot"
						:alt="player.person.name"
						style="width: 40px"
					/>
					<span v-if="player.dorsal">{{ player.dorsal }} - </span>
					<span v-if="player.person.name">{{
						player.person.name
					}}</span>
					<span v-if="player.positionName">
						- {{ player.positionName }}</span
					>
				</NuxtLink>
			</li>
		</ul>
	</div>
</template>

<style scoped></style>
