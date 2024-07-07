import type { Style } from '#build/components';
<script setup>
import displayName from '~/composables/displayName';
const { $anime } = useNuxtApp();
const selections = useSelections();
let team = ref({});
let roster = ref([]);
let coach = ref({});

if (selections.teamInfo) {
	team = selections.teamInfo;
} else {
	const { data } = await useAsyncData(
		'teamInfo',
		async () =>
			await selections.fetchApi({
				clubCode: selections.selectedTeam,
			})
	);
	team = data.value;
}

const {
	data: people,
	pending,
	error,
} = await useAsyncData(
	'people',
	async () =>
		await selections.fetchApi({
			clubCode: selections.selectedTeam,
			competitionCode: selections.selectedLeague,
			seasonCode: true,
			query: 'people',
		})
);

if (people.value) {
	roster = people.value.filter((person) => {
		return person.typeName === 'Player';
	});
	coach = people.value.find((person) => {
		return person.typeName === 'Coach';
	});
	selections.playersRes = roster;
}

onMounted(() => {
	$anime({
		targets: '.player-card',
		translateY: [100, 0],
		delay: $anime.stagger(50, { start: 0 }),
		easing: 'cubicBezier(.42, 0, .58, 1)',
	});
});
</script>

<template>
	<section class="relative viewport">
		<div class="bg-team"></div>
		<div
			v-if="team"
			class="py-8 mx-auto w-fit flex flex-col items-center gap-4 z-10"
		>
			<img
				:src="team.images.crest"
				:alt="team.name"
				@load="getImageColor"
				class="w-40 select-none drop-shadow-[0_35px_35px_rgba(255,255,255,0.35)]"
			/>
			<h2 class="font-chakra text-white text-xl drop-shadow-xl">
				{{ team.name }}
			</h2>
		</div>
		<div class="container">
			<p
				v-if="coach.person"
				class="text-zinc-700 mb-4 font-bold drop-shadow-[0_35px_35px_rgba(255,255,255,0.35)]"
			>
				<span>Head Coach - {{ displayName(coach.person.name) }}</span>
			</p>
		</div>

		<div class="container overflow-hidden text-primary py-3 mb-4">
			<ul class="flex flex-wrap -mx-3" v-if="roster.length">
				<li
					v-for="player in roster"
					class="player-card px-3 mb-6 w-full max-h-[600px] md:w-1/2 lg:w-1/4"
				>
					<div class="card w-full h-full glass">
						<figure>
							<img
								v-if="player.images.headshot"
								:src="player.images.headshot"
								:alt="player.person.name"
								class="max-h-full object-contain"
							/>
							<img
								v-else
								src="/assets/player-image.webp"
								:alt="player.person.name"
								class="h-52 mt-4 md:mt-12 object-contain"
							/>
						</figure>
						<div class="card-body p-4 lg:p-8">
							<h2 class="card-title">
								{{ displayName(player.person.name) }}
							</h2>
							<p>
								<span v-if="player.dorsal"
									>#{{ player.dorsal }} -
								</span>
								<span v-if="player.positionName">
									{{ player.positionName }}
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
