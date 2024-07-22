<script setup>
import RecentGamesChart from './RecentGamesChart.vue';

const { id } = useRoute().params;
const { playerInfo, selectedLeague, selectedTeam, fetchApi } = useSelections();

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

let recentGames = ref([]);
const { data: stats } = await useAsyncData(
	'playerStats',
	async () =>
		await fetchApi({
			competitionCode: selectedLeague,
			personCode: id,
			query: 'stats',
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
	recentGames = stats.value.games
		.sort((a, b) => {
			return new Date(a.game.date) - new Date(b.game.date);
		})
		.slice(-10);
}
</script>

<template>
	<section class="viewport">
		<div class="container py-8 md:py-16 grid grid-cols-4 gap-8">
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
								{{
									new Date(
										playerInfo.person.birthDate
									).toLocaleDateString('en-GB')
								}}
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
					<div role="tablist" class="tabs tabs-bordered mb-12">
						<input
							type="radio"
							name="my_tabs_1"
							role="tab"
							class="tab"
							aria-label="All time"
							checked="checked"
						/>
						<div role="tabpanel" class="tab-content py-8">
							<div class="flex flex-col gap-4">
								<div
									class="stats grid-flow-row md:grid-flow-col overflow-visible shadow md:grid-cols-4"
								>
									<div
										class="stat place-items-center tooltip tooltip-primary"
										:data-tip="`Scored ${stats.accumulated.points} points in ${stats.accumulated.gamesPlayed} games, out of which, he was a starter in ${stats.accumulated.gamesStarted}.`"
									>
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

									<div
										class="stat place-items-center tooltip tooltip-primary"
										:data-tip="`Grabbed a sum of ${stats.accumulated.totalRebounds} rebounds. Offensive: ${stats.accumulated.offensiveRebounds} / Defensive: ${stats.accumulated.defensiveRebounds}.`"
									>
										<div class="stat-title">Rebounds</div>
										<div class="stat-value text-accent">
											{{
												stats.accumulated.totalRebounds
											}}
										</div>
										<div class="stat-desc text-accent">
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
										class="stat place-items-center tooltip tooltip-primary"
										:data-tip="`Created a total of  ${stats.accumulated.assistances} assists.`"
									>
										<div class="stat-title">Assists</div>
										<div class="stat-value">
											{{ stats.accumulated.assistances }}
										</div>
										<div class="stat-desc">
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

									<div
										v-if="playerInfo.position === 1"
										class="stat place-items-center tooltip tooltip-primary"
										:data-tip="`Successfully completed ${stats.accumulated.steals} steals.`"
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

									<div
										v-else
										class="stat place-items-center tooltip tooltip-primary"
										:data-tip="`Handed his opponents ${stats.accumulated.blocksFavour} blocks, while being blocked ${stats.accumulated.blocksAgainst} times.`"
									>
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
									class="stats grid-flow-row md:grid-flow-col overflow-visible shadow md:grid-cols-3"
								>
									<div
										class="stat place-items-center tooltip tooltip-primary"
										data-tip="Two Point Percentage"
									>
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

									<div
										class="stat place-items-center tooltip tooltip-primary"
										data-tip="Three Point Percentage"
									>
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

									<div
										class="stat place-items-center tooltip tooltip-primary"
										data-tip="Free Throw Percentage"
									>
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
						<div role="tabpanel" class="tab-content py-8">
							<div class="flex flex-col gap-4">
								<div
									class="stats grid-flow-row md:grid-flow-col overflow-visible shadow md:grid-cols-4"
								>
									<div
										class="stat place-items-center tooltip tooltip-primary"
										data-tip="Points Per Game"
									>
										<div class="stat-title">PPG</div>
										<div class="stat-value">
											{{ stats.averagePerGame.points }}
										</div>
										<div class="stat-desc">&nbsp;</div>
									</div>

									<div
										class="stat place-items-center tooltip tooltip-primary"
										data-tip="Rebounds Per Game"
									>
										<div class="stat-title">RPG</div>
										<div class="stat-value text-accent">
											{{
												stats.averagePerGame
													.totalRebounds
											}}
										</div>
										<div class="stat-desc text-accent">
											&nbsp;
										</div>
									</div>

									<div
										class="stat place-items-center tooltip tooltip-primary"
										data-tip="Assists Per Game"
									>
										<div class="stat-title">APG</div>
										<div class="stat-value">
											{{
												stats.averagePerGame.assistances
											}}
										</div>
										<div class="stat-desc">&nbsp;</div>
									</div>

									<div
										v-if="playerInfo.position === 1"
										class="stat place-items-center tooltip tooltip-primary"
										data-tip="Steals Per Game"
									>
										<div class="stat-title">Steals</div>
										<div class="stat-value text-accent">
											{{ stats.averagePerGame.steals }}
										</div>
										<div class="stat-desc text-accent">
											&nbsp;
										</div>
									</div>

									<div
										v-else
										class="stat place-items-center tooltip tooltip-primary"
										data-tip="Blocks Per Game"
									>
										<div class="stat-title">BPG</div>
										<div class="stat-value text-accent">
											{{
												stats.averagePerGame
													.blocksFavour
											}}
										</div>
										<div class="stat-desc text-accent">
											&nbsp;
										</div>
									</div>
								</div>

								<div
									class="stats grid-flow-row md:grid-flow-col overflow-visible shadow md:grid-cols-2"
								>
									<div
										class="stat place-items-center tooltip tooltip-primary"
										:data-tip="`Plus/Minus reflects how the team did while that player is on the court. If a player has a +5 PM, it means his team outscored the opponent by 5 points while he was on the court.`"
									>
										<div class="stat-title">+/-</div>
										<div class="stat-value">
											{{ stats.averagePerGame.plusMinus }}
										</div>
										<div class="stat-desc">&nbsp;</div>
									</div>

									<div
										class="stat place-items-center tooltip tooltip-primary"
										:data-tip="`Performance Index Rating is a basketball mathematical statistical formula similar to the NBA's Efficiency (EFF) stat. Calculation: (Points + Rebounds + Assists + Steals + Blocks + Fouls Drawn) - (Missed Field Goals + Missed Free Throws + Turnovers + Shots Rejected + Fouls Committed).`"
									>
										<div class="stat-title">PIR</div>
										<div class="stat-value text-accent">
											{{ stats.averagePerGame.valuation }}
										</div>
										<div class="stat-desc text-accent">
											&nbsp;
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<RecentGamesChart :recentGames="recentGames" />
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
