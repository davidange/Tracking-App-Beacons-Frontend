import * as WebSdk from "bimplus-websdk";
/**
 * Class representing the information necesary for managing the Bimplus API.
 * Validates the User and can access information regarding the projects.
 * Contains a member variable called api that can make calls to Bimplus Servers (https://doc.allplan.com/display/bimpluspublic/Bimplus+API+Reference)
 */
export default class ApiService {
	api = null;
	actTeamId;
	actTeamSlug;
	actProject;

	constructor() {
		this.api = new WebSdk.Api(WebSdk.createDefaultConfig(process.env.REACT_APP_BIMPLUS_ENVIRONMENT));
	}

	/**
	 * Validates the credentials and sets the api token.
	 * @param {String} email
	 * @param {String} password
	 */
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

	/**
	 * Check if is authorized.
	 */
	isAuthorized() {
		return this.api.getAccessToken() != null;
	}

	/**
	 * Sets the access token of the object api.
	 * @param {String} token
	 */
	_setAuthorize(token) {
		this.api.setAccessToken(token);
	}

	/**
	 * Removes the token from the object api.
	 */
	logout() {
		this._setAuthorize(null);
	}

	/**
	 * returns the Teams that the user can access
	 */
	getTeams() {
		return this.api.teams.get();
	}

	/**
	 * gets list of projects that the team contains.
	 * @param {String} teamSlug
	 */
	getProjects(teamSlug = null) {
		return this.api.projects.get();
	}

	/**
	 * set Team by teamslug
	 */
	async setActTeam(teamSlug) {
		this.actTeamSlug = teamSlug;
		this.api.setTeamSlug(teamSlug);

		let teams = await this.getTeams();
		let actTeam = teams.find((team) => team.slug === teamSlug);
		this.actTeamId = actTeam.id;
	}

	/**
	 * set team by Id
	 */
	async setActTeamById(teamId) {
		let team = await this.api.teams.get(teamId);
		if (team) {
			this.actTeamSlug = team.slug;
			this.api.setTeamSlug(team.slug);
			this.actTeamId = teamId;
		}
	}

	/**
	 * Get active team ID
	 */
	getActTeamId() {
		return this.actTeamId;
	}

	/**
	 * Sets Active project
	 * @param {String} prjId projectId
	 */
	async setActProjectById(prjId) {
		let project = await this.api.projects.get(prjId);
		if (project) {
			this.actProject = project;
		}
	}

	/**
	 * returns the Id of the active Project
	 */
	getActProjetId() {
		return this.actProject.id;
	}

	/**
	 * Returns the name of the active project
	 */
	getActProjectName() {
		return this.actProject.name;
	}
}
