import React, { useState, useEffect } from "react";
import * as WebClient from "bimplus-webclient";
import useApiService from "./useApiService";

const environment = "stage";
const useBimplusExplorer = (teamId, projectId) => {
	const [api, statusApi] = useApiService(environment);
	const [comunicationClient, setComunicationClient] = useState(null);
	const [explorer, setExplorer] = useState(null);
	const [isExplorerLoaded, setIsExplorerLoaded] = useState(false);


	useEffect(() => {
		if (statusApi === "success" && !explorer) {
			let tempCommunicationClient = new WebClient.ExternalClient("MyClient");
			let tempExplorer = new WebClient.BimExplorer(
				"bimplusExplorer",
				api.getAccessToken(),
				tempCommunicationClient,
				environment
			);
			tempExplorer.load(teamId, projectId);

			tempExplorer.onDataLoaded = () => {
				setIsExplorerLoaded(true);
			};

			tempCommunicationClient.initialize();

			setComunicationClient(tempCommunicationClient);
			setExplorer(tempExplorer);
		}
	}, [api, statusApi, projectId, teamId, explorer]);

	return [explorer, isExplorerLoaded];
};

export default useBimplusExplorer;
