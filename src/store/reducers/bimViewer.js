import * as actions from "../actions/actionTypes";

const initialState = {
	selectedObject: null,
	action: null,
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

const clearActionBimViewer = (state, action) => {
	return {
		...state,
		action: null,
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.SET_SELECTED_OBJECT_BIMVIEWER:
			return setSelectedObjectBimViewer(state, action);
		case actions.CENTER_SELECTED_OBJECT_BIMVIEWER:
			return centerSelectedObjectBimViewer(state, action);
		case actions.clearActionBimViewer:
			return clearActionBimViewer(state, action);
		default:
			return state;
	}
};

export default reducer;
