import { useState, useEffect, useCallback } from "react";
import useApiService from "../useApiService";
import ViewportService from "./ViewportService";

import { useSelector, useDispatch } from "react-redux";
import usePrevious from "../usePrevious";
import * as actions from "../../store/actions/index";

/**
 * Custom Hook that sets up the Bimplus Renderer
 */
const useBimplusRenderer = (projectId, domElementId, teamId) => {
	const [apiService, statusApi] = useApiService();
	const [viewportService, setViewportService] = useState(null);

	const [isLoadingApiSetup, setIsLoadingApiSetup] = useState(true);
	const [isLoadingRenderer, setIsLoadingRenderer] = useState(true);

	const selectedObject = useSelector((state) => state.bimViewer.selectedObject);
	const bimViewerActionPayload = useSelector((state) => state.bimViewer.actionPayload);
	const actionBimViewer = useSelector((state) => state.bimViewer.action);
	const trackedEntities = useSelector((state) => state.activeProject.trackedEntities);
	const previousTrackedEntities = usePrevious(trackedEntities);
	
	const dispatch = useDispatch();
	const clearActionBimViewer = useCallback(() => dispatch(actions.clearActionBimViewer()), [dispatch]);

	// eslint-disable-next-line no-unused-vars
	const setSelectedObject = useCallback((objectId) => dispatch(actions.setSelectedObjectBimViewer(objectId)), [
		dispatch,
	]);

	//setup ApiService
	useEffect(() => {
		if (statusApi === "success" && apiService.isAuthorized()) {
			const setApiTeam = async () => {
				await apiService.setActTeamById(teamId);
				setIsLoadingApiSetup(false);
			};
			setApiTeam();
		}
	}, [apiService, statusApi, teamId]);

	//setup ViewportService
	useEffect(() => {
		if (!isLoadingApiSetup && !viewportService) {
			setViewportService(new ViewportService(apiService));
		}
	}, [isLoadingApiSetup, viewportService, apiService]);

	//setup Renderer
	useEffect(() => {
		if (viewportService) {
			const setRenderer = async () => {
				await viewportService.initRenderer(projectId, domElementId);
				setIsLoadingRenderer(false);
			};
			setRenderer();
		}
	}, [projectId, domElementId, viewportService]);

	//resize Renderer event listener
	useEffect(() => {
		const resizeHandler = () => {
			viewportService.updateSize();
			// viewportService.drawEntity(0, 0, 0, "1234");
			// viewportService.drawEntity(20, 10, 0, "1234");
			// viewportService.removeEntity("12345");
		};
		if (!isLoadingRenderer) {
			window.addEventListener("resize", resizeHandler);
		}

		return () => {
			window.removeEventListener("resize", resizeHandler);
		};
	}, [isLoadingRenderer, viewportService]);

	//center Object Handler
	useEffect(() => {
		if (!isLoadingRenderer && actionBimViewer === "CenterObject" && selectedObject) {
			//viewportService.resetView();
			viewportService.centerObject(selectedObject);
			viewportService.setSelectedObject(selectedObject);
			//viewportService.isolate();
			clearActionBimViewer();
		}
	}, [isLoadingRenderer, viewportService, actionBimViewer, selectedObject, clearActionBimViewer]);


	useEffect(() => {
		//center Tracked Entities Handler
		if (!isLoadingRenderer && actionBimViewer === "CenterTrackedEntity" && bimViewerActionPayload) {
			console.log("CENTERING TRACKED ENTITY!!!");
			let selectedTrackedEntityId = bimViewerActionPayload.id;
			console.log(selectedTrackedEntityId);
			viewportService.centerTrackedEntity(selectedTrackedEntityId);
			clearActionBimViewer();
		}
		//update renderer when an update to a tracked entity has been made (change emited throught socket)
		if (!isLoadingRenderer && actionBimViewer === "DrawTrackedEntity" && bimViewerActionPayload) {
			console.log("REDRAWING ENTITY!!!");
			const id = bimViewerActionPayload.id;
			const { x, y, z } = bimViewerActionPayload.coordinates;
			viewportService.drawEntity(x, y, z, id);
			clearActionBimViewer();
		}
	}, [isLoadingRenderer, viewportService, actionBimViewer, bimViewerActionPayload, clearActionBimViewer]);

	//updates renderer when the list of tracked entities is different
	useEffect(() => {
		if (!isLoadingRenderer) {
			//initial hash table with tracked entities where added
			let newTrackedEntities = { ...trackedEntities };
			//initia hash table with tracked entities that where deleted
			let erasedTrackedEntities = { ...previousTrackedEntities };
			//compare the difference between both objects after first push
			if (previousTrackedEntities !== undefined) {
				for (let key in trackedEntities) {
					if (previousTrackedEntities[key]) {
						delete newTrackedEntities[key];
						delete erasedTrackedEntities[key];
					}
				}
			}
			//draw new Tracked Entities
			for (let id in newTrackedEntities) {
				console.log(id);
				let entityToDraw = newTrackedEntities[id];
				console.log(entityToDraw);
				viewportService.drawEntity(
					entityToDraw.coordinates.x,
					entityToDraw.coordinates.y,
					entityToDraw.coordinates.z,
					id
				);
			}
			//erase untracked Entities
			for (let id in erasedTrackedEntities) {
				viewportService.removeEntity(id);
			}
		}
	}, [trackedEntities, previousTrackedEntities, viewportService, isLoadingRenderer]);

	return [viewportService, isLoadingRenderer];
};

export default useBimplusRenderer;
