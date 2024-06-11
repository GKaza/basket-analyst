<script setup>
const { id } = useRoute().params;
const selections = useSelections();
selections.selectedPlayer = id;
</script>

<template>
	<PlayerOverview />
</template>

<style scoped></style>
