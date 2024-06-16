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
	<section class="viewport">
		<div class="container p-4">
			<div class="flex flex-col gap-4">
				<img
					:src="playerInfo.images.headshot"
					:alt="playerInfo.person.name"
					class="w-52"
				/>
				<h2 class="font-chakra font-medium italic text-xl">
					{{ playerInfo.person.name }}
					<span v-if="playerInfo.dorsal" class="font-extrabold"
						>#{{ playerInfo.dorsal }}</span
					>
				</h2>
				<p v-if="playerInfo.club.name">
					Playing for {{ playerInfo.club.name }}
					<img
						:src="playerInfo.club.images.crest"
						:alt="playerInfo.club.name"
						class="w-10 inline-block"
					/>
				</p>
				<p v-if="playerInfo.person.height">
					Height: {{ playerInfo.person.height }}cm
				</p>
				<p v-if="playerInfo.person.weight">
					Weight: {{ playerInfo.person.weight }}kg
				</p>
				<p v-if="playerInfo.person.birthDate">
					Date of birth:
					{{ playerInfo.person.birthDate.split('T')[0] }}
				</p>

				<p v-if="bio.bio">{{ bio.bio }}</p>
			</div>
			<div></div>
		</div>
	</section>
</template>

<style scoped></style>
