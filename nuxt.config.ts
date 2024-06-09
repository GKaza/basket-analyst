// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	vue: {
		propsDestructure: true,
	},
	modules: ['@pinia/nuxt'],
	runtimeConfig: {
		// The private keys which are only available server-side

		// Keys within public are also exposed client-side
		public: {
			apiBase: 'https://api-live.euroleague.net/',
			geniusAPI:
				'https://live.test.wh.geniussports.com/v2/basketball/read/matchid?ak=you_api', //testAPI
			rapidAPI: 'https://api-nba-v1.p.rapidapi.com/', //testAPI
			rapidApiKey: 'c20a78d708msh1a2fe165e516a2cp109833jsn2fdc8eaec207', //testAPI
			BALLDONTLIE_API: 'https://api.balldontlie.io/v1/teams', //testAPI
			BALLDONTLIE_API_KEY: 'ba0912b2-8889-4144-85f3-3439a420e4ad', //testAPI
			thesportsdbAPI: 'https://www.thesportsdb.com/api/v1/json/3/', //testAPI
		},
	},
});
