<script setup>
useHead({ title: 'Leagues' });
const route = useRoute();
const selections = useSelections();

if (!selections.allLeaguesRes.length) {
	const { data, pending, error } = await useAsyncData(
		'competitions',
		async () => {
			const data = await selections.fetchApi({
				query: 'competitions',
			});
			return data.data;
		}
	);

	if (data.value) {
		const validCodes = ['E', 'U', 'J'];
		const filteredLeagues = data.value.filter((league) =>
			validCodes.includes(league.code)
		);
		selections.allLeaguesRes = filteredLeagues;
	}
}
</script>

<template>
	<section class="viewport">
		<div class="container p-12">
			<ul class="flex gap-4">
				<li
					v-for="league in selections.allLeaguesRes"
					:key="league.code"
				>
					<NuxtLink
						:to="{
							name: 'leagues-id',
							params: { id: league.code },
						}"
						class="btn btn-secondary"
					>
						{{ league.name }}
					</NuxtLink>
				</li>
			</ul>
		</div>
	</section>
</template>

<style scoped></style>
