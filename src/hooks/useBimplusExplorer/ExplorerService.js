import * as WebClient from "bimplus-webclient";

export default class ExplorerService {
	explorer;
	communicationClient;
	apiServices;
	_isLoaded = false;
	objectSelected;

	constructor(apiServices, domElementId, environment) {
		this.apiServices = apiServices;
		this.communicationClient = new WebClient.ExternalClient("MyClient");
		this.explorer = new WebClient.BimExplorer(
			domElementId,
			this.apiServices.api.getAccessToken(),
			this.communicationClient,
			environment
		);

		this.explorer.onDataLoaded = () => {
			console.log("EXPLORER IS UP");
			this._isLoaded = true;
		};

		this.explorer.onObjectSelected = (id /*, multiSelect, selected*/) => {
			console.log(id);
			this.objectSelected = id;
			if (this.onObjectSelectedFunction) {
				this.onObjectSelectedFunction(id);
			}
		};

		this.communicationClient.initialize();
	}

	loadProject(projectId, teamId) {
		this.explorer.load(teamId, projectId);
	}

	setOnObjectSelectedFunction(func) {
		this.onObjectSelectedFunction = func;
	}
}

// //Center ObjectHandler
// useEffect(() => {
//     if (explorer && actionBimViewer === "CenterObject" && selectedObject) {
//         explorer.centerObject(selectedObject, true);
//         hasBeenSelectedHandler();
//     }
// }, [explorer, actionBimViewer, selectedObject, hasBeenSelectedHandler]);
