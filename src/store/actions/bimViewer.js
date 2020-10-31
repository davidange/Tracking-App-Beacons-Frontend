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

export const clearActionBimViewer = () => {
	return {
		type: actionTypes.CLEAR_ACTION_BIMVIEWER,
	};
};
