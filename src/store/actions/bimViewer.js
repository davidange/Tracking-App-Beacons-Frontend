import * as actionTypes from "./actionTypes";

export const setSelectedObjectBimViewer = (objectId) => {
	return {
		type: actionTypes.SET_SELECTED_OBJECT_BIMVIEWER,
		selectedObject: objectId,
	};
};

export const centerSelectedObjectBimViewer = (objectId) => {
	return (dispatch) => {
		dispatch(setSelectedObjectBimViewer(objectId));
		dispatch({
			type: actionTypes.CENTER_SELECTED_OBJECT_BIMVIEWER,
		});
	};
};

export const centerSelectedTrackedEntity=(id)=>{
	return{
		type:actionTypes.CENTER_SELECTED_TRACKED_ENTITY,
		id:id,
	}
}

export const clearActionBimViewer = () => {
	return {
		type: actionTypes.CLEAR_ACTION_BIMVIEWER,
	};
};

export const drawTrackedEntity = (id,x, y, z) => {
	return {
		type: actionTypes.DRAW_TRACKED_ENTITY,
		coordinates: {
			x: x,
			y: y,
			z: z,
		},
		id: id,
	};
};

export const undrawTrackedEntity = (id) => {
	return {
		type: actionTypes.UNDRAW_TRACKED_ENTITY,
		id: id,
	};
};
