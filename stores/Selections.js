export const useSelections = defineStore('selections', {
	state: () => {
		return {
			selectedLeague: ref(''),
			selectedTeam: ref(''),
			selectedPlayer: ref(''),
			seasonCode: ref(''),
			playersRes: ref([]),
			teamsRes: ref([]),
			allLeaguesRes: ref([]),
		};
	},
	getters: {
		leagueInfo: (state) =>
			state.allLeaguesRes.find((league) => {
				return league.code === state.selectedLeague;
			}),
		teamInfo: (state) =>
			state.teamsRes.find((team) => {
				return team.code === state.selectedTeam;
			}),
		playerInfo: (state) =>
			state.playersRes.find((player) => {
				return player.person.code === state.selectedPlayer;
			}),
	},
	actions: {
		async fetchApi({
			apiVersion = `v2`,
			competitionCode,
			seasonCode,
			clubCode,
			gameCode,
			personCode,
			query,
			storeVar,
		}) {
			clubCode = clubCode ? `/clubs/${clubCode}` : ``;
			competitionCode = competitionCode
				? `/competitions/${competitionCode}`
				: ``;
			seasonCode = seasonCode ? `/seasons/${this.seasonCode}` : ``;
			gameCode = gameCode ? `/games/${gameCode}` : ``;
			personCode = personCode ? `/people/${personCode}` : ``;
			query = query ? `/${query}` : ``;

			const apiBase = 'https://api-live.euroleague.net/';
			const URL = `${apiBase}${apiVersion}${competitionCode}${seasonCode}${clubCode}${gameCode}${personCode}${query}`;

			const response = await $fetch(URL);

			if (storeVar && response) {
				if (this[storeVar].constructor === Array && response.data) {
					this[storeVar] = response.data;
				} else {
					this[storeVar] = response;
				}
			}
			return response;
		},
		async initState() {
			let sessionStore = sessionStorage.getItem(this.$id);
			if (sessionStore) {
				this.$state = JSON.parse(sessionStore);
			}
			this.$subscribe((mutation, state) => {
				sessionStorage.setItem(this.$id, JSON.stringify(this.$state));
			});
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useSelections, import.meta.hot));
}
