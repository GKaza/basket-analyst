const currentYear = new Date().getFullYear();
const defaultSeason =
	new Date().getMonth() > 8 ? `${currentYear}` : `${currentYear - 1}`;

export const useSelections = defineStore('selections', {
	state: () => {
		return {
			selectedLeague: ref(''),
			selectedTeam: ref(''),
			// teamRes: ref(),
			leagueRes: ref([]),
			allLeaguesRes: ref([]),
			apiBase: `${useRuntimeConfig().public.apiBase}`,
		};
	},
	getters: {
		deafultSeasonCode: (state) => {
			let code = `${state.selectedLeague}${defaultSeason}`;
			if (code.length > 5) {
				code = `${state.selectedLeague}${defaultSeason.substring(1)}`;
			}
			return code;
		},
		teamInfo: (state) =>
			state.leagueRes.find((team) => {
				return team.code === state.selectedTeam;
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
			seasonCode = seasonCode ? `/seasons/${this.deafultSeasonCode}` : ``;
			gameCode = gameCode ? `/games/${gameCode}` : ``;
			personCode = personCode ? `/people/${personCode}` : ``;
			query = query ? `/${query}` : ``;

			const URL = `${this.apiBase}${apiVersion}${competitionCode}${seasonCode}${clubCode}${gameCode}${personCode}${query}`;
			console.log(URL);
			const { data, pending, error } = await useFetch(URL);

			if (storeVar && data.value) {
				if (this[storeVar].constructor === Array) {
					this[storeVar] = data.value.data;
				} else {
					this[storeVar] = data.value;
				}
			}
			return { data, pending };
		},
	},
});
