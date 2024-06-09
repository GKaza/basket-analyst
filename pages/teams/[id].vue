<script setup>
const route = useRoute();
const selections = useSelections();
selections.selectedTeam = `${route.params.id}`;
</script>

<template>
	<TeamOverview />
</template>

<style scoped></style>
