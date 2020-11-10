import * as actionTypes from "../actions/actionTypes";

const initialState = {
	activeProject: null,
	error: null,
	loading: false,
	projectMode: "ProjectSetup",
	trackedEntities: {},
};

const setActiveProjectStart = (state, action) => {
	return {
		...state,
		activeProject: null,
		loading: true,
		error: null,
	};
};

const setActiveProjectSuccess = (state, action) => {
	return {
		...state,
		activeProject: action.activeProject,
		loading: false,
		error: null,
	};
};

const setActiveProjectFail = (state, action) => {
	return {
		...state,
		error: action.error,
		loading: false,
	};
};

const clearActiveProject = (state, action) => {
	return {
		...state,
		error: null,
		activeProject: null,
	};
};

const setActiveProjectMode = (state, action) => {
	return {
		...state,
		projectMode: action.mode,
	};
};

const startTrackingEntity = (state, action) => {
	const newTrackedEntities = { ...state.trackedEntities };
	newTrackedEntities[action.id] = action.entityType;
	return {
		...state,
		trackedEntities: newTrackedEntities,
	};
};

const stopTrackingEntity = (state, action) => {
	//remove the tracked Entity from the list of currently Tracked Entities
	const newTrackedEntities = { ...state.trackedEntities };
	if (newTrackedEntities[action.id]) {
		delete newTrackedEntities[action.id];
	}
	return {
		...state,
		trackedEntities: newTrackedEntities,
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_ACTIVE_PROJECT_START:
			return setActiveProjectStart(state, action);
		case actionTypes.SET_ACTIVE_PROJECT_SUCCESS:
			return setActiveProjectSuccess(state, action);
		case actionTypes.SET_ACTIVE_PROJECT_FAIL:
			return setActiveProjectFail(state, action);
		case actionTypes.CLEAR_ACTIVE_PROJECT:
			return clearActiveProject(state, action);
		case actionTypes.SET_ACTIVE_PROJECT_MODE:
			return setActiveProjectMode(state, action);
		case actionTypes.START_TRACKING_ENTITY:
			return startTrackingEntity(state, action);
		case actionTypes.STOP_TRACKING_ENTITY:
			return stopTrackingEntity(state, action);
		default:
			return state;
	}
};

export default reducer;
