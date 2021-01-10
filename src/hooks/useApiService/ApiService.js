import * as WebSdk from "bimplus-websdk";
/**
 * Class representing the information necesary for managing the Bimplus API.
 */
export default class ApiService {
	api = null;
	actTeamId;
	actTeamSlug;
	actProject;
	
	constructor() {
		this.api = new WebSdk.Api(WebSdk.createDefaultConfig(process.env.REACT_APP_BIMPLUS_ENVIRONMENT));
	}

	authorize(email = process.env.REACT_APP_BIMPLUS_EMAIL, password = process.env.REACT_APP_BIMPLUS_PASSWORD) {
		let appId = process.env.REACT_APP_BIMPLUS_APP_KEY;
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
