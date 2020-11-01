import { useState, useEffect, useCallback } from "react";
import * as Renderer from "bimplus-renderer";
import useApiService from "../useApiService";

const viewportSettings = {
	defaultOpacity: 0.5,
	disciplineOpacity: 0.1,
	pinSizeScaleFactor: 2,
	maxWebGLBufferSize: 350e12,
	mixedModelMode: true,
	pinFlyToDistance: 20000,
	nearClippingPlane: 0.01,

	slideThmbSize: [180, 112],
	units: {
		mm: {
			weight: {
				multiplicator: 0.001,
				unit: "kg",
			},
			length: {
				multiplicator: 0.001,
				unit: "m",
			},
			width: {
				multiplicator: 0.001,
				unit: "m",
			},
			height: {
				multiplicator: 0.001,
				unit: "m",
			},
			area: {
				multiplicator: 0.000001,
				unit: "m²",
			},
			volume: {
				multiplicator: 1e-9,
				unit: "m³",
			},
		},
		inch: {},
	},
};
const units = {
	Metric: {
		weight: {
			multiplicator: 0.001,
			precision: 2,
			unit: "kg",
		},
		length: {
			multiplicator: 0.001,
			precision: 2,
			unit: "m",
		},
		width: {
			multiplicator: 0.001,
			precision: 2,
			unit: "m",
		},
		height: {
			multiplicator: 0.001,
			precision: 2,
			unit: "m",
		},
		area: {
			multiplicator: 0.000001,
			precision: 2,
			unit: "m²",
		},
		volume: {
			multiplicator: 1e-9,
			precision: 2,
			unit: "m³",
		},
	},
	Imperial: {
		length: {
			multiplicator: 0.00328083989,
			precision: 2,
			unit: "feet",
		},
		width: {
			multiplicator: 0.00328083989,
			precision: 2,
			unit: "feet",
		},
		height: {
			multiplicator: 0.00328083989,
			precision: 2,
			unit: "feet",
		},
	},
};

const environment = "stage";
const useBimplusRenderer = (projectId, domElementId,teamSlug) => {
	const [api, statusApi] = useApiService(teamSlug);
	const [renderer, setRenderer] = useState(null);
	const [loader, setLoader] = useState(null);
	const [projectData, setProjectData] = useState(null);

	const initRender = useCallback(
		async (projectId, domElementId) => {
			const tempRenderer = new Renderer.Viewport3D({
				settings: viewportSettings,
				units: units.Metric,
				domElementId,
				GPUPick: true,
			});
            const tempLoader = new Renderer.ContentLoader(api, tempRenderer);
            console.log('LOADER');
            console.log(tempLoader)
			const tempProjectData = await tempLoader.loadProject(projectId);

			let promises = [];
			//-----show all project models
			tempProjectData.forEachModel((model) => {
				let layers = model.getLayerArray();
				model.setVisible(true);
				model.visible = true;

				model.forEachTopologyLeafNode((node) => {
					promises.push(tempLoader.loadTopologyNode(tempProjectData, node, layers));
				});
			});
			await Promise.all(promises);
            console.log('RENDERER IS INITIALIZED!')
			setLoader(tempLoader);
			setRenderer(tempRenderer);
			setProjectData(tempProjectData);
		},
		[api]
	);

	useEffect(() => {
		if (statusApi === "success" && !renderer) {
            console.log('Init RENDER!!')
			initRender(projectId, domElementId);
		}
	}, [initRender, projectId, domElementId, renderer,statusApi]);

	return [renderer];
};

export default useBimplusRenderer;
