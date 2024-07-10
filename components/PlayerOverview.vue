<script setup>
const { id } = useRoute().params;
const { playerInfo, selectedLeague, fetchApi } = useSelections();

const {
	data: bio,
	pending: pendingBio,
	error: errorBio,
} = await useLazyAsyncData(
	'playerBio',
	async () =>
		await fetchApi({
			personCode: id,
			query: 'bio',
		})
);

let latestGames = ref([]);
const { data: stats } = await useAsyncData(
	'playerStats',
	async () =>
		await fetchApi({
			competitionCode: selectedLeague,
			personCode: id,
			query: 'stats',
		})
);

if (stats.value && stats.value.games) {
	latestGames = stats.value.games.slice(-10);
}
</script>

<template>
	<section class="viewport">
		<div class="container pt-8 md:pt-16 pb-8 grid grid-cols-4 gap-8">
			<div class="col-span-4 md:col-span-3">
				<div v-if="playerInfo" class="flex flex-col gap-4">
					<img
						v-if="playerInfo.images.headshot"
						:src="playerInfo.images.headshot"
						:alt="playerInfo.person.name"
						class="w-52"
					/>
					<div>
						<h2
							class="font-chakra font-medium italic text-xl inline-block"
						>
							{{ displayName(playerInfo.person.name) }}
						</h2>
						<span
							v-if="playerInfo.dorsal"
							class="font-chakra italic text-xl font-extrabold inline-block"
						>
							&nbsp;#{{ playerInfo.dorsal }}</span
						>
						<p
							v-if="playerInfo.person.country.name"
							class="text-sm text-zinc-500"
						>
							{{ playerInfo.person.country.name }}
						</p>
					</div>
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
				</div>
			</div>

			<aside class="col-span-4 md:col-span-1">
				<div class="join join-vertical rounded-md">
					<div
						v-if="bio && bio.bio"
						class="join-item collapse collapse-arrow border border-zinc-200"
					>
						<input type="checkbox" />
						<div class="collapse-title">Bio</div>
						<div class="collapse-content">
							<p class="pt-2 border-t border-zinc-100">
								{{ bio.bio }}
							</p>
						</div>
					</div>
					<div
						v-if="bio && bio.achievements"
						class="join-item collapse collapse-arrow border border-zinc-200"
					>
						<input type="checkbox" />
						<div class="collapse-title">Achievements</div>
						<div class="collapse-content">
							<p class="pt-2 border-t border-zinc-100">
								{{ bio.achievements }}
							</p>
						</div>
					</div>
				</div>
			</aside>
		</div>
	</section>
</template>

<style scoped></style>
