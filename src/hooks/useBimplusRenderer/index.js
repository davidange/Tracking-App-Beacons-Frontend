import { useState, useEffect, useCallback, useRef } from "react";
import useApiService from "../useApiService";
import ViewportService from "./ViewportService";

import { useSelector, useDispatch } from "react-redux";
import usePrevious from "../usePrevious";
import * as actions from "../../store/actions/index";

const useBimplusRenderer = (projectId, domElementId, teamId) => {
	const [apiService, statusApi] = useApiService();
	const [viewportService, setViewportService] = useState(null);

	const [isLoadingApiSetup, setIsLoadingApiSetup] = useState(true);
	const [isLoadingRenderer, setIsLoadingRenderer] = useState(true);

	const selectedObject = useSelector((state) => state.bimViewer.selectedObject);
	const actionBimViewer = useSelector((state) => state.bimViewer.action);
	const trackedEntities = useSelector((state) => state.activeProject.trackedEntities); //entitiesToBeDrawn;
	const previousTrackedEntities = usePrevious(trackedEntities);
	const dispatch = useDispatch();
	const hasBeenSelectedHandler = useCallback(() => dispatch(actions.clearActionBimViewer()), [dispatch]);
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
			viewportService.drawEntity(10, 0, 0, "12345");
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
			hasBeenSelectedHandler();
		}
	}, [isLoadingRenderer, viewportService, actionBimViewer, selectedObject, hasBeenSelectedHandler]);

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
