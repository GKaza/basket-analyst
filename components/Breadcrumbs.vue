<script setup>
const route = useRoute();
const selections = useSelections();
let nestLevel = ref(0);
watch(
	() => route.path,
	() => {
		nestLevel.value = 0;
		if (route.name === 'leagues-id') {
			nestLevel.value = 1;
		}
		if (route.name === 'teams-id') {
			nestLevel.value = 2;
		}
		if (route.name === 'players-id') {
			nestLevel.value = 3;
		}
	}
);
</script>
<template>
	<nav
		v-if="nestLevel"
		class="text-sm breadcrumbs px-12 bg-zinc-100 fill-primary"
	>
		<ul>
			<li class="shrink-0">
				<NuxtLink to="/">
					<img src="/assets/home-icon.svg" alt="Home" class="w-3.5" />
				</NuxtLink>
			</li>
			<li v-if="selections.leagueInfo && nestLevel > 1">
				<NuxtLink
					:to="{
						name: 'leagues-id',
						params: { id: selections.leagueInfo.code },
					}"
				>
					{{ selections.leagueInfo.name }}
				</NuxtLink>
			</li>
			<li v-if="selections.teamInfo && nestLevel > 2">
				<NuxtLink
					:to="{
						name: 'teams-id',
						params: { id: selections.teamInfo.code },
					}"
				>
					{{ selections.teamInfo.name }}
				</NuxtLink>
			</li>
			<li v-if="nestLevel === 1">
				{{ selections.leagueInfo.name }}
			</li>
			<li v-if="nestLevel === 2">
				{{ selections.teamInfo.name }}
			</li>
			<li v-if="nestLevel > 2">
				{{ selections.playerInfo.person.name }}
			</li>
		</ul>
	</nav>
</template>
