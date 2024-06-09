<script setup>
const route = useRoute();

const selections = useSelections();
const { data, pending } = await selections.fetchApi({
	query: 'competitions',
	storeVar: 'allLeaguesRes',
});

useHead({ title: route.params.name });
</script>

<template>
	<div v-if="pending">Loading..</div>
	<div v-else>
		<ul>
			<li v-for="league in selections.allLeaguesRes" :key="league.code">
				<NuxtLink
					:to="{
						name: 'leagues-id',
						params: { id: league.code },
					}"
				>
					{{ league.name }}
				</NuxtLink>
			</li>
		</ul>
	</div>
</template>

<style scoped></style>
