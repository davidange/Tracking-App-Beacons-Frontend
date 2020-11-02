import { useState, useEffect, useCallback } from "react";
import useApiService from "../useApiService";
import ViewportService from "./ViewportService";

const useBimplusRenderer = (projectId, domElementId, teamId) => {
	const [apiService, statusApi] = useApiService();
	const [viewportService, setViewportService] = useState(null);

	const [isLoadingApiSetup, setIsLoadingApiSetup] = useState(true);
	const [isLoadingRenderer, setIsLoadingRenderer] = useState(true);

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
		};
		if (!isLoadingRenderer) {
			window.addEventListener("resize", resizeHandler);
		}

		return () => {
			window.removeEventListener("resize", resizeHandler);
		};
	}, [isLoadingRenderer, viewportService]);

	return [viewportService, isLoadingRenderer];
};

export default useBimplusRenderer;
