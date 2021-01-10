import { useState, useEffect, useCallback } from "react";
import * as actions from "../../store/actions/index";
import useApiService from "../useApiService";
import ExplorerService from "./ExplorerService";
import { useSelector, useDispatch } from "react-redux";

const useBimplusExplorer = (teamId, projectId, domElementId) => {
	const [apiService, statusApi] = useApiService();
	// eslint-disable-next-line no-unused-vars
	const [explorerService, setExplorerService] = useState({ explorer: null, objectSelected: null });
	const [isExplorerLoaded, setIsExplorerLoaded] = useState(false);

	const selectedObject = useSelector((state) => state.bimViewer.selectedObject);
	const actionBimViewer = useSelector((state) => state.bimViewer.action);
	const dispatch = useDispatch();
	const hasBeenSelectedHandler = useCallback(() => dispatch(actions.clearActionBimViewer()), [dispatch]);
	const setSelectedObject = useCallback((objectId) => dispatch(actions.setSelectedObjectBimViewer(objectId)), [
		dispatch,
	]);

	//setup Explorer
	useEffect(() => {
		if (statusApi === "success" && apiService.isAuthorized()) {
			setExplorerService(new ExplorerService(apiService, domElementId, process.env.REACT_APP_BIMPLUS_ENVIRONMENT));
			setIsExplorerLoaded(true);
			console.log("Explorer has been Set up");
		}
	}, [statusApi, apiService, domElementId]);

	//load Project
	useEffect(() => {
		if (explorerService.explorer) {
			explorerService.loadProject(projectId, teamId);
			explorerService.setOnObjectSelectedFunction((id) => {
				setSelectedObject(id);
			});
		}
	}, [explorerService.explorer, projectId, teamId, explorerService, setSelectedObject]);


	useEffect(() => {
		if (explorerService.explorer && actionBimViewer === "CenterObject" && selectedObject) {
			explorerService.explorer.centerObject(selectedObject, true);
			hasBeenSelectedHandler();
		}
	}, [explorerService.explorer, actionBimViewer, selectedObject, hasBeenSelectedHandler]);

	return [explorerService.explorer, isExplorerLoaded];
};

export default useBimplusExplorer;
