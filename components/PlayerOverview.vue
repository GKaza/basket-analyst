<script setup>
const { id } = useRoute().params;
const { playerInfo, selectedLeague, fetchApi } = useSelections();

const {
	data: bio,
	pending: pendingBio,
	error: errorBio,
} = await useLazyAsyncData(
	"playerBio",
	async () =>
		await fetchApi({
			personCode: id,
			query: "bio",
		})
);

let latestGames = ref([]);
const { data: stats } = await useAsyncData(
	"playerStats",
	async () =>
		await fetchApi({
			competitionCode: selectedLeague,
			personCode: id,
			query: "stats",
			options: {
				pick: 0,
				transform: (stats) => {
					if (Array.isArray(stats)) {
						return stats.find((item) => {
							return item.competitionCode === selectedLeague;
						});
					} else {
						return stats;
					}
				},
			},
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
				<div v-if="playerInfo" class="flex flex-col gap-4 mb-12">
					<div>
						<h2
							class="font-chakra font-bold italic text-xl inline-block"
						>
							{{ displayName(playerInfo.person.name) }}
						</h2>
						<span
							v-if="playerInfo.positionName"
							class="font-chakra italic text-xl inline-block"
						>
							<span class="font-normal text-accent">&nbsp;|</span>
							{{ playerInfo.positionName }}</span
						>
						<span
							v-if="playerInfo.dorsal"
							class="font-chakra italic text-xl font-bold inline-block"
						>
							<span class="font-normal text-accent">&nbsp;|</span>
							#{{ playerInfo.dorsal }}</span
						>
					</div>
					<div class="flex gap-4">
						<div class="avatar">
							<div class="w-28 h-28 rounded-xl">
								<img
									v-if="playerInfo.images.headshot"
									:src="playerInfo.images.headshot"
									:alt="playerInfo.person.name"
								/>
								<img
									v-else
									src="/assets/player-image.webp"
									:alt="playerInfo.person.name"
								/>
							</div>
						</div>
						<div class="flex flex-col gap-1">
							<p v-if="playerInfo.club.name">
								<span class="text-neutral-400"
									>Current team:
								</span>
								{{ playerInfo.club.name }}
								<img
									:src="playerInfo.club.images.crest"
									:alt="playerInfo.club.name"
									class="h-5 inline-block"
								/>
							</p>
							<p v-if="playerInfo.person.birthDate">
								<span class="text-neutral-400"
									>Date of birth:
								</span>
								{{ playerInfo.person.birthDate.split("T")[0] }}
							</p>
							<p v-if="playerInfo.person.country.name">
								<span class="text-neutral-400"
									>Nationality:
								</span>
								{{ playerInfo.person.country.name }}
							</p>
							<p>
								<span v-if="playerInfo.person.height">
									<span class="text-neutral-400"
										>Height:
									</span>
									{{ playerInfo.person.height }}cm
									&nbsp;&nbsp;&nbsp;&nbsp;
								</span>
								<span v-if="playerInfo.person.weight">
									<span class="text-neutral-400"
										>Weight:
									</span>
									{{ playerInfo.person.weight }}kg
								</span>
							</p>
						</div>
					</div>
				</div>
				<div v-if="stats">
					<div role="tablist" class="tabs tabs-bordered">
						<input
							type="radio"
							name="my_tabs_1"
							role="tab"
							class="tab"
							aria-label="All time"
							checked="checked"
						/>
						<div role="tabpanel" class="tab-content py-10">
							<div class="flex flex-col gap-6">
								<div
									class="stats stats-vertical md:stats-horizontal shadow md:grid-cols-4"
								>
									<div class="stat place-items-center">
										<div class="stat-title">Points</div>
										<div class="stat-value">
											{{ stats.accumulated.points }}
										</div>
										<div class="stat-desc">
											In
											{{ stats.accumulated.gamesPlayed }}
											Games
										</div>
									</div>

									<div class="stat place-items-center">
										<div class="stat-title">Assists</div>
										<div class="stat-value text-accent">
											{{ stats.accumulated.assistances }}
										</div>
										<div class="stat-desc text-accent">
											AST/TO Ratio:
											{{
												(
													stats.accumulated
														.assistances /
													stats.accumulated.turnovers
												).toLocaleString(undefined, {
													maximumFractionDigits: 2,
													minimumFractionDigits: 2,
												})
											}}
										</div>
									</div>

									<div class="stat place-items-center">
										<div class="stat-title">Rebounds</div>
										<div class="stat-value">
											{{
												stats.accumulated.totalRebounds
											}}
										</div>
										<div class="stat-desc">
											Off:
											{{
												stats.accumulated
													.offensiveRebounds
											}}
											/ Def:
											{{
												stats.accumulated
													.defensiveRebounds
											}}
										</div>
									</div>

									<div
										v-if="playerInfo.position === 1"
										class="stat place-items-center"
									>
										<div class="stat-title">Steals</div>
										<div class="stat-value text-accent">
											{{ stats.accumulated.steals }}
										</div>
										<div class="stat-desc text-accent">
											ST/FOUL Ratio:
											{{
												(
													stats.accumulated.steals /
													stats.accumulated
														.foulsCommited
												).toLocaleString(undefined, {
													maximumFractionDigits: 2,
													minimumFractionDigits: 2,
												})
											}}
										</div>
									</div>

									<div v-else class="stat place-items-center">
										<div class="stat-title">Blocks</div>
										<div class="stat-value text-accent">
											{{ stats.accumulated.blocksFavour }}
										</div>
										<div class="stat-desc text-accent">
											To
											{{
												stats.accumulated.blocksAgainst
											}}
											blocks received
										</div>
									</div>
								</div>

								<div
									class="stats stats-vertical md:stats-horizontal shadow md:grid-cols-3"
								>
									<div class="stat place-items-center">
										<div class="stat-title">2P%</div>
										<div class="stat-value">
											{{
												stats.accumulated
													.twoPointShootingPercentage
											}}
										</div>
										<div class="stat-desc">
											{{
												stats.accumulated
													.fieldGoalsMade2
											}}
											/
											{{
												stats.accumulated
													.fieldGoalsAttempted2
											}}
										</div>
									</div>

									<div class="stat place-items-center">
										<div class="stat-title">3P%</div>
										<div class="stat-value text-accent">
											{{
												stats.accumulated
													.threePointShootingPercentage
											}}
										</div>
										<div class="stat-desc text-accent">
											{{
												stats.accumulated
													.fieldGoalsMade3
											}}
											/
											{{
												stats.accumulated
													.fieldGoalsAttempted3
											}}
										</div>
									</div>

									<div class="stat place-items-center">
										<div class="stat-title">FT%</div>
										<div class="stat-value">
											{{
												stats.accumulated
													.freeThrowShootingPercentage
											}}
										</div>
										<div class="stat-desc">
											{{
												stats.accumulated.freeThrowsMade
											}}
											/
											{{
												stats.accumulated
													.freeThrowsAttempted
											}}
										</div>
									</div>
								</div>
							</div>
						</div>

						<input
							type="radio"
							name="my_tabs_1"
							role="tab"
							class="tab"
							aria-label="Average per game"
						/>
						<div role="tabpanel" class="tab-content py-10">
							<div class="flex flex-col gap-6">
								<div
									class="stats stats-vertical md:stats-horizontal shadow md:grid-cols-4"
								>
									<div class="stat place-items-center">
										<div class="stat-title">Points</div>
										<div class="stat-value">
											{{ stats.averagePerGame.points }}
										</div>
										<div class="stat-desc"></div>
									</div>

									<div class="stat place-items-center">
										<div class="stat-title">Assists</div>
										<div class="stat-value text-accent">
											{{
												stats.averagePerGame.assistances
											}}
										</div>
										<div
											class="stat-desc text-accent"
										></div>
									</div>

									<div class="stat place-items-center">
										<div class="stat-title">Rebounds</div>
										<div class="stat-value">
											{{
												stats.averagePerGame
													.totalRebounds
											}}
										</div>
										<div class="stat-desc"></div>
									</div>

									<div
										v-if="playerInfo.position === 1"
										class="stat place-items-center"
									>
										<div class="stat-title">Steals</div>
										<div class="stat-value text-accent">
											{{ stats.averagePerGame.steals }}
										</div>
										<div
											class="stat-desc text-accent"
										></div>
									</div>

									<div v-else class="stat place-items-center">
										<div class="stat-title">Blocks</div>
										<div class="stat-value text-accent">
											{{
												stats.averagePerGame
													.blocksFavour
											}}
										</div>
										<div
											class="stat-desc text-accent"
										></div>
									</div>
								</div>

								<div
									class="stats stats-vertical md:stats-horizontal shadow md:grid-cols-2"
								>
									<div class="stat place-items-center">
										<div class="stat-title">+/-</div>
										<div class="stat-value">
											{{ stats.averagePerGame.plusMinus }}
										</div>
										<div class="stat-desc"></div>
									</div>

									<div class="stat place-items-center">
										<div class="stat-title">
											Performance Index Rating
										</div>
										<div class="stat-value text-accent">
											{{ stats.averagePerGame.valuation }}
										</div>
										<div
											class="stat-desc text-accent"
										></div>
									</div>
								</div>
							</div>
						</div>
					</div>
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
