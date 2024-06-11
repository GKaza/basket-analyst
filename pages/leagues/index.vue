<script setup>
useHead({ title: 'Leagues' });
const route = useRoute();
const selections = useSelections();

if (!selections.allLeaguesRes.length) {
	const { data, pending } = await selections.fetchApi({
		query: 'competitions',
	});

	if (data.value) {
		const validCodes = ['E', 'U', 'J'];
		const filteredLeagues = data.value.data.filter((league) =>
			validCodes.includes(league.code)
		);
		selections.allLeaguesRes = filteredLeagues;
	}
}
</script>

<template>
	<div>
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
