import type { Style } from '#build/components';
<script setup>
const { teamInfo, selectedTeam, selectedLeague, fetchApi } = useSelections();
let team = ref({});
let roster = ref([]);

if (teamInfo) {
	team = teamInfo;
} else {
	const { data } = await fetchApi({
		clubCode: selectedTeam,
	});
	team = data.value;
}
const { data: people } = await fetchApi({
	clubCode: selectedTeam,
	competitionCode: selectedLeague,
	seasonCode: 'default',
	query: 'people',
});

if (people) {
	roster = people.value.filter((person) => {
		return person.typeName === 'Player' || person.typeName === 'Coach';
	});
}

console.log(roster);
</script>

<template>
	<div v-if="team">
		<img :src="team.images.crest" :alt="team.name" style="width: 100px" />
		<h2>{{ team.name }}</h2>
	</div>
	<ul>
		<li v-for="staff in roster">
			<img
				v-if="staff.images.headshot"
				:src="staff.images.headshot"
				:alt="staff.person.name"
				style="width: 40px"
			/>
			<span v-if="staff.dorsal">{{ staff.dorsal }} - </span>
			<span v-if="staff.person.name">{{ staff.person.name }}</span>
			<span v-if="staff.positionName || staff.typeName">
				- {{ staff.positionName || staff.typeName }}</span
			>
		</li>
	</ul>
</template>

<style scoped></style>
