import { useState, useEffect, useCallback } from "react";
import * as WebClient from "bimplus-webclient";
import * as actions from "../store/actions/index";
import useApiService from "./useApiService";
import { useSelector, useDispatch } from "react-redux";

const environment = "stage";
const useBimplusExplorer = (teamId, projectId,domElementId) => {
	const [api, statusApi] = useApiService(environment);
	// eslint-disable-next-line no-unused-vars
	const [comunicationClient, setComunicationClient] = useState(null);
	const [explorer, setExplorer] = useState(null);
	const [isExplorerLoaded, setIsExplorerLoaded] = useState(false);

	const selectedObject = useSelector((state) => state.bimViewer.selectedObject);
	const actionBimViewer = useSelector((state) => state.bimViewer.action);
	const dispatch = useDispatch();
	const hasBeenSelectedHandler = useCallback(() => dispatch(actions.clearActionBimViewer()), [dispatch]);
	const setSelectedObject = useCallback((objectId) => dispatch(actions.setSelectedObjectBimViewer(objectId)), [
		dispatch,
	]);

	useEffect(() => {
		if (statusApi === "success" && !explorer) {
			console.log("SETTING EXPLORER UP");
			let tempCommunicationClient = new WebClient.ExternalClient("MyClient");
			let tempExplorer = new WebClient.BimExplorer(
				domElementId,
				api.getAccessToken(),
				tempCommunicationClient,
				environment
			);
			tempExplorer.load(teamId, projectId);

			tempExplorer.onDataLoaded = () => {
				console.log('EXPLORER IS UP')
				setIsExplorerLoaded(true);
			};

			tempExplorer.onObjectSelected = (id /*, multiSelect, selected*/) => {
				setSelectedObject(id);
			};

			tempCommunicationClient.initialize();

			setComunicationClient(tempCommunicationClient);
			setExplorer(tempExplorer);
		}
	}, [api, statusApi, projectId, teamId, domElementId,explorer, setSelectedObject]);

	//Center ObjectHandler
	useEffect(() => {
		if (explorer && actionBimViewer === "CenterObject" && selectedObject) {
			explorer.centerObject(selectedObject, true);
			hasBeenSelectedHandler();
		}
	}, [explorer, actionBimViewer, selectedObject, hasBeenSelectedHandler]);

	return [explorer, isExplorerLoaded];
};

export default useBimplusExplorer;
