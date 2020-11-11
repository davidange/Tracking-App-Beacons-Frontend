import * as Renderer from "bimplus-renderer";
import $ from "jquery";

export default class ViewportService {
	//--- renderer stuff -----------------------------------------------------------------------
	viewport;
	loader;
	projectData;
	apiService;
	normFactor;
	//temp
	drawnEntities = {};

	viewportSettings = {
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

	units = {
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

	constructor(apiService) {
		this.apiService = apiService;
	}

	/**--------------------------------------------------------------------------
    * get viewport object
    --------------------------------------------------------------------------*/
	getViewportObject = () => {
		return this.viewport;
	};

	/**--------------------------------------------------------------------------
    * init bimplus renderer
    --------------------------------------------------------------------------*/
	async initRenderer(projectId, domElementId) {
		this.viewport = new Renderer.Viewport3D({
			settings: this.viewportSettings,
			units: this.units.Metric,
			domElementId,
			GPUPick: true,
		});

		this.loader = new Renderer.ContentLoader(this.apiService.api, this.viewport);
		this.projectData = await this.loader.loadProject(projectId);

		let promises = [];

		//--- show all project models -----------------------------------------------------------------------
		this.projectData.forEachModel((model) => {
			var layers = model.getLayerArray();
			model.setVisible(true);
			model.visible = true;

			model.forEachTopologyLeafNode((node) => {
				promises.push(this.loader.loadTopologyNode(this.projectData, node, layers));
			});
		});

		await Promise.all(promises);
		//set normFactor
		this.normFactor = this.viewport.normFactor;
		//--- handle events -----------------------------------------------------------------------
		$(this.viewport.domElement).on("select3DObject", (e) => {
			this.onSelectObject();
		});
	}

	/**--------------------------------------------------------------------------
    * handle object selection
    --------------------------------------------------------------------------*/
	onSelectObject = () => {
		// Try to get the selected object on top of the selection stack
		const selectedObject =
			this.viewport.objectSets.selectedObjects.length > 0
				? this.viewport.objectSets.selectedObjects[this.viewport.objectSets.selectedObjects.length - 1]
				: undefined;
		console.log(`Object selected.`);
		console.log(selectedObject);
	};

	//** zoom to selected Objects */
	centerObjects = (objectsId) => {
		this.viewport.centerObjects(objectsId);
	};

	centerObject = (objectId) => {
		const objectIdArray = [objectId];
		this.viewport.centerObjects(objectIdArray);
	};

	setSelectedObject = (objectId) => {
		this.viewport.highlightObject(objectId);
	};
	/**--------------------------------------------------------------------------
    * update viewport size
    --------------------------------------------------------------------------*/
	updateSize = () => {
		this.viewport.setViewportSize();
	};

	/**--------------------------------------------------------------------------
    * reset view
    --------------------------------------------------------------------------*/
	resetView = () => {
		this.viewport.resetSelectionMode();
		this.viewport.restoreViewbox();
		this.viewport.resetClashScene();
		this.viewport.setRotationCenter(null);
		// this.setView("x");
	};

	/**--------------------------------------------------------------------------
    * set view (x,y,z,perspectiveView(xyz))
	--------------------------------------------------------------------------*/
	_setView = (view) => {
		this.viewport.setCameraResetAxis(view);
	};

	//Set camera to Front View
	frontView = () => {
		this._setView("x");
	};
	//Set camera to Top View
	topView = () => {
		this._setView("y");
	};
	//Set camera to Side View
	sideView = () => {
		this._setView("z");
	};

	perspectiveView = () => {
		this._setView("xyz");
	};

	//********Selection Modes: */

	resetSelectionMode = () => {
		this.viewport.resetSelectionMode();
	};
	/**--------------------------------------------------------------------------
    * set section axis (x,y,z)
    --------------------------------------------------------------------------*/
	_setSectionAxis = (axis) => {
		this.viewport.setSectionAxis(axis);
		if (this.viewport.checkSelectionMode("section") === false) {
			this.viewport.setSelectionMode("section");
		}
	};
	//**Set Section Plane to X axis */
	sectionX = () => {
		this._setSectionAxis("x");
	};
	//**Set Section Plane to Y axis */
	sectionY = () => {
		this._setSectionAxis("y");
	};
	//**Set Section Plane to Z axis */
	sectionZ = () => {
		this._setSectionAxis("z");
	};
	//**Set Section Plane to free axis */
	sectionFree = () => {
		this.viewport.setSectionAxis("Free");
	};

	// Switch on isolation mode - all other elements will be grey and transparent
	isolate = () => {
		this.viewport.setSelectionMode("isolated");
	};

	// Switch on hidden isolation mode - all other elements will be hidden
	isolateHide = () => {
		this.viewport.setSelectionMode("hideIsolated");
	};

	// Switch on clipping isolation mode - all elements outside the isolated elements
	// bounding box will be clipped
	isolateClippingBox = () => {
		this.viewport.setSelectionMode("clipIsolated");
	};

	/**---------------------------------------------------------------------------
	 * Draws an Arrow representing the location of the entity
	 @params x x coordinates
	 @params y y coordinates
	 @params z z coordinates
	 @params objectId id of the object to be Drawn
	------------------------------------------------------------------------ */
	drawEntity = (x, y, z, objectId) => {
		//scale values
		x = x /this.normFactor;
		y = y /this.normFactor;
		z = z /this.normFactor;
		
		if (!this.drawnEntities.hasOwnProperty(objectId)) {
			//reference to Threejs Renderer
			const THREE = Renderer.THREE;
			//creates the arrow
			const arrow = new THREE.Group();
			arrow.name = objectId;
			const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
			//arrow Pointer
			const geometry1 = new THREE.CylinderGeometry(1, 0, 2, 20, 3);
			const arrowPointer = new THREE.Mesh(geometry1, material);
			arrow.add(arrowPointer);
			//cylinderForArrow
			const geometry2 = new THREE.CylinderGeometry(0.3, 0.3, 2, 20, 1);
			const arrowBody = new THREE.Mesh(geometry2, material);
			//move body of arrow up
			arrowBody.position.y = 2;
			arrow.add(arrowBody);
			arrow.scale.set(1 / 100, 1 / 100, 1 / 100);

			arrow.position.set(x, y, z);
			this.drawnEntities[objectId] = arrow;
			this.viewport.customScene.add(arrow);

			// //centering Functions:
			// console.log(this.viewport.centerObjects);
			// this.viewport.centerObjects([objectId])
			//  console.log(this.viewport.centerBoundingSphere);
			// //this.viewport.renderer.render();
		} else {
			const arrow = this.drawnEntities[objectId];
			arrow.position.set(x, y, z);
		}
	};

	removeEntity = (objectId) => {
		if (this.drawnEntities.hasOwnProperty(objectId)) {
			const arrow = this.drawnEntities[objectId];
			this.viewport.customScene.remove(arrow);
			delete this.drawnEntities[objectId];
		}
	};
	/**--------------------------------------------------------------------------
    * set model visibility 
    --------------------------------------------------------------------------*/
	setModelVisibility = (modelId, value) => {
		this.projectData.forEachModel((model) => {
			if (model.id === modelId) {
				model.forEachLayer((layer) => {
					layer.setVisible(value);
				});
			}
		});
	};

	/**--------------------------------------------------------------------------
    * models to show
    --------------------------------------------------------------------------*/
	showModels = (models) => {
		this.projectData.forEachModel((model) => {
			let modelVisible = models.find((item) => item.id === model.id);
			this.setModelVisibility(model.id, modelVisible != null);
		});
		this.viewport.draw();
	};

	/**--------------------------------------------------------------------------
    * get list of project models
    --------------------------------------------------------------------------*/
	getProjectModels = () => {
		let decoratedModels = [];
		this.projectData.forEachModel((model) => {
			model.forEachLayer((layer) => (model.visible = layer.isVisible()));
			decoratedModels.push(model);
		});

		return decoratedModels;
	};
}
