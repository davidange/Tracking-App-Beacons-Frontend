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
		default:
			return state;
	}
};

export default reducer;
