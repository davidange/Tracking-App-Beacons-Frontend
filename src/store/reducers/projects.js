import * as actionTypes from "../actions/actionTypes";

const initialState = {
	projects: null,
	error: null,
	loading: false,
};

const fetchProjectsStart = (state, action) => {
	return {
		...state,
		projects: null,
		loading: true,
		error: null,
	};
};

const fetchProjectsSuccess = (state, action) => {
	return {
		...state,
		projects: action.projects,
		loading: false,
		error: null,
	};
};

const fetchProjectsFail = (state, action) => {
	return {
		...state,
		projects: null,
		loading: false,
		error: action.error,
	};
};

const updateProjectsStart = (state, action) => {
	return {
		...state,
		loading: true,
		error: null,
	};
};

const updateProjectsSuccess = (state, action) => {
	return {
		...state,
		loading: false,
		error: null,
	};
};

const updateProjectsFail = (state, action) => {
	return {
		...state,
		loading: false,
		error: action.error,
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_PROJECTS_START:
			return fetchProjectsStart(state, action);
		case actionTypes.FETCH_PROJECTS_SUCCESS:
			return fetchProjectsSuccess(state, action);
		case actionTypes.FETCH_PROJECTS_FAIL:
			return fetchProjectsFail(state, action);
		case actionTypes.UPDATE_PROJECTS_START:
			return updateProjectsStart(state, action);
		case actionTypes.UPDATE_PROJECTS_SUCCESS:
			return updateProjectsSuccess(state, action);
		case actionTypes.UPDATE_PROJECTS_FAIL:
			return updateProjectsFail(state, action);
		default:
			return state;
	}
};

export default reducer;
