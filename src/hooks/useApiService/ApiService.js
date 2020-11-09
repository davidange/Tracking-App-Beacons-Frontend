import * as WebSdk from "bimplus-websdk";
export default class ApiService {
	api = null;
	actTeamId;
	actTeamSlug;
	actProject;
	constructor() {
		const environment = "stage";
		this.api = new WebSdk.Api(WebSdk.createDefaultConfig(environment));
	}

	authorize(email = "david.angeles@tum.de", password = "701e6a33f0A") {
		//let appId = '5F43560D-9B0C-4F3C-85CB-B5721D098F7B';
		let appId = "6CBF3DB2F6FE4E54963C7C6D9E306FE8";
		return this.api.authorize
			.post(email, password, appId)
			.then((data) => {
				this._setAuthorize(data.access_token);
				return true;
			})
			.catch((error) => {
				// Authorization failed
				console.log("Login to Bimplus failed!");
				return false;
			});
	}

	isAuthorized() {
		return this.api.getAccessToken() != null;
	}

	_setAuthorize(token) {
		this.api.setAccessToken(token);
	}

	logout() {
		this._setAuthorize(null);
	}

	getTeams() {
		return this.api.teams.get();
	}

	getProjects(teamSlug = null) {
		return this.api.projects.get();
	}

	// set Tean by teamslug
	async setActTeam(teamSlug) {
		this.actTeamSlug = teamSlug;
		this.api.setTeamSlug(teamSlug);

		let teams = await this.getTeams();
		let actTeam = teams.find((team) => team.slug === teamSlug);
		this.actTeamId = actTeam.id;
	}

	//set team by Id
	async setActTeamById(teamId) {
		let team = await this.api.teams.get(teamId);
		if (team) {
			this.actTeamSlug = team.slug;
			this.api.setTeamSlug(team.slug);
			this.actTeamId = teamId;
		}
	}

	getActTeamId() {
		return this.actTeamId;
	}

	async setActProjectById(prjId) {
		let project = await this.api.projects.get(prjId);
		if (project) {
			this.actProject = project;
		}
	}

	getActProjetId() {
		return this.actProject.id;
	}

	getActProjectName() {
		return this.actProject.name;
	}
}
