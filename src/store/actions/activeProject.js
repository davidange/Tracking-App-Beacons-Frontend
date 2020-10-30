import * as actionTypes from "./actionTypes";
import axios from "../../axios-instance";

const setActiveProjectStart = () => {
	return { type: actionTypes.SET_ACTIVE_PROJECT_START };
};

const setActiveProjectSuccess = (project) => {
	return {
		type: actionTypes.SET_ACTIVE_PROJECT_SUCCESS,
		activeProject: project,
	};
};

const setActiveProjectFail = (error) => {
	return {
		type: actionTypes.SET_ACTIVE_PROJECT_FAIL,
		error: error,
	};
};

export const clearActiveProject = () => {
	return {
		type: actionTypes.CLEAR_ACTIVE_PROJECT,
	};
};

export const setActiveProject = (projectId) => {
	return (dispatch, getState) => {
		dispatch(setActiveProjectStart());
		const header = { Authorization: "Bearer " + getState().auth.token };
		axios
			.get("projects/" + projectId, { headers: header })
			.then((res) => {
				console.log(res.data.project);
				dispatch(setActiveProjectSuccess(res.data.project));
			})
			.catch((err) => {
				dispatch(setActiveProjectFail(err.response.data));
			});
	};
};

export const setActiveProjetMode = (projectMode) => {
	return {
		type: actionTypes.SET_ACTIVE_PROJECT_MODE,
		mode: projectMode,
	};
};
