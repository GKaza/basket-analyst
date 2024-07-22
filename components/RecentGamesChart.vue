<script setup>
import { Line } from 'vue-chartjs';
const { selectedTeam } = useSelections();
const props = defineProps(['recentGames']);

const chartData = computed(() => {
	return {
		labels: props.recentGames.map((item) => {
			if (item.game.local.club.code === selectedTeam) {
				return `vs ${item.game.road.club.editorialName}`;
			} else {
				return `vs ${item.game.local.club.editorialName}`;
			}
		}),
		datasets: [
			{
				label: 'Points',
				backgroundColor: ['#0F172A'],
				data: props.recentGames.map((item) => {
					return item.stats.points;
				}),
			},
			{
				label: 'Rebounds',
				backgroundColor: ['#00DC82'],
				data: props.recentGames.map((item) => {
					return item.stats.totalRebounds;
				}),
			},
			{
				label: 'Assists',
				backgroundColor: ['#ff9f1c'],
				data: props.recentGames.map((item) => {
					return item.stats.assistances;
				}),
			},
		],
	};
});
</script>

<template>
	<div class="mb-12" v-if="props.recentGames">
		<h2 class="">Recent Games</h2>
		<Line :data="chartData" />
	</div>
</template>
