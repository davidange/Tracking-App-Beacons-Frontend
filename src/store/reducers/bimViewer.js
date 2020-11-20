import * as actions from "../actions/actionTypes";

const initialState = {
	selectedObject: null,
	action: null,
	actionPayload: null,
};

const setSelectedObjectBimViewer = (state, action) => {
	return {
		...state,
		selectedObject: action.selectedObject,
	};
};

const centerSelectedObjectBimViewer = (state, action) => {
	return {
		...state,
		action: "CenterObject",
	};
};

const centerSelectedTrackedEntity = (state, action) => {
	const payload = { id: action.id };
	return {
		...state,
		action: "CenterTrackedEntity",
		actionPayload: payload,
	};
};

const clearActionBimViewer = (state, action) => {
	return {
		...state,
		action: null,
		actionPayload: null,
	};
};

const drawTrackedEntity = (state, action) => {
	const payload = { id: action.id, coordinates: action.coordinates };
	return {
		...state,
		action: "DrawTrackedEntity",
		actionPayload: payload,
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.SET_SELECTED_OBJECT_BIMVIEWER:
			return setSelectedObjectBimViewer(state, action);
		case actions.CENTER_SELECTED_OBJECT_BIMVIEWER:
			return centerSelectedObjectBimViewer(state, action);
		case actions.CENTER_SELECTED_TRACKED_ENTITY:
			return centerSelectedTrackedEntity(state, action);
		case actions.CLEAR_ACTION_BIMVIEWER:
			return clearActionBimViewer(state, action);
		case actions.DRAW_TRACKED_ENTITY:
			return drawTrackedEntity(state, action);
		default:
			return state;
	}
};

export default reducer;
