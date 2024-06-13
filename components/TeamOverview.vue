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
// const { pending, data: people } = await useAsyncData(
// 	'people',
// 	async () =>
// 		await selections.fetchApi({
// 			clubCode: selections.selectedTeam,
// 			competitionCode: selections.selectedLeague,
// 			seasonCode: true,
// 			query: 'people',
// 		})
// );

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
	<section class="relative text-white">
		<div class="bg-team"></div>
		<div
			v-if="team"
			class="relative py-4 mx-auto w-fit flex flex-col items-center gap-4 z-10"
		>
			<img
				:src="team.images.crest"
				:alt="team.name"
				@load="getImageColor"
				class="w-40"
			/>
			<h2 class="font-bold text-xl">{{ team.name }}</h2>
		</div>
		<div class="container">
			<p v-if="coach" class="relative mx-4 mb-4">
				<span v-if="coach.person.name"
					>Head Coach - {{ coach.person.name }}</span
				>
			</p>
		</div>

		<div class="container text-primary">
			<ul class="w-full flex flex-wrap -mx-3 px-3">
				<li v-for="player in roster" class="px-3 mb-6 w-1/4">
					<div class="card w-full h-full glass">
						<figure>
							<img
								v-if="player.images.headshot"
								:src="player.images.headshot"
								:alt="player.person.name"
							/>
							<img
								v-else
								src="/assets/player-image.webp"
								:alt="player.person.name"
								class="h-52 mt-12"
							/>
						</figure>
						<div class="card-body">
							<h2 class="card-title">{{ player.person.name }}</h2>
							<p>
								<span v-if="player.dorsal"
									>#{{ player.dorsal }}</span
								>
								<span v-if="player.positionName">
									- {{ player.positionName }}
								</span>
							</p>

							<div class="card-actions justify-end">
								<NuxtLink
									:to="{
										name: 'players-id',
										params: { id: player.person.code },
									}"
									class="btn btn-primary"
									>See stats</NuxtLink
								>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</section>
</template>

<style scoped></style>
