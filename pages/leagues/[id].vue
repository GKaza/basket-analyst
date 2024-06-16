<script setup>
const route = useRoute();
const selections = useSelections();
selections.selectedLeague = `${route.params.id}`;
const { data: seasons } = await selections.fetchApi({
	competitionCode: selections.selectedLeague,
	query: 'seasons',
});
if (seasons.value) {
	selections.seasonCode = seasons.value.data[0].code;
}

const { data, pending } = await selections.fetchApi({
	competitionCode: `${route.params.id}`,
	seasonCode: true,
	query: 'clubs',
	storeVar: 'teamsRes',
});

let league = selections.allLeaguesRes.find((l) => {
	return l.code === selections.selectedLeague;
});
if (league) {
	useHead({ title: league.name });
}
</script>

<template>
	<section class="viewport py-4 md:py-8 lg:py-12">
		<div class="container">
			<div class="overflow-x-auto">
				<table class="table">
					<!-- head -->
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th class="hidden md:table-cell">Home</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<!-- row 1 -->
						<tr
							v-for="team in selections.teamsRes"
							:key="team.code"
						>
							<td>
								<div class="avatar">
									<div class="w-12 h-12">
										<img
											:src="team.images.crest"
											:alt="team.name"
										/>
									</div>
								</div>
							</td>
							<td>
								<div>
									<div class="font-bold">
										{{ team.name }}
									</div>
									<div class="text-sm opacity-50">
										{{ team.country.code }}
									</div>
								</div>
							</td>
							<td class="hidden md:table-cell">
								{{ team.city }}
							</td>
							<th>
								<NuxtLink
									:to="{
										name: 'teams-id',
										params: { id: team.code },
									}"
									class="btn btn-ghost"
								>
									Team roster
								</NuxtLink>
							</th>
						</tr>
					</tbody>
					<!-- foot -->
					<tfoot>
						<tr>
							<th></th>
							<th>Name</th>
							<th class="hidden md:table-cell">Home</th>
							<th></th>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	</section>
</template>

<style scoped></style>
