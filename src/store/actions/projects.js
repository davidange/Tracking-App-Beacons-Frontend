import * as actionTypes from "./actionTypes";
import axios from "../../axios-instance";

const fetchProjectsStart = () => {
	return { type: actionTypes.FETCH_PROJECTS_START };
};
const fetchProjectsSuccess = (projects) => {
	return {
		type: actionTypes.FETCH_PROJECTS_SUCCESS,
		projects: projects,
	};
};
const fetchProjectsFail = (error) => {
	return {
		type: actionTypes.FETCH_PROJECTS_FAIL,
		error: error,
	};
};

export const fetchProjects = () => {
	return (dispatch, getState) => {
		dispatch(fetchProjectsStart());
		const header = { Authorization: "Bearer " + getState().auth.token };
		axios
		.get("projects", { headers: header })
		.then((res) => {
			dispatch(fetchProjectsSuccess(res.data.projects));
		})
		.catch((error) => {
			dispatch(fetchProjectsFail(error.response.data));
		});
	};
};

const updateProjectsStart = () => {
	return { type: actionTypes.UPDATE_PROJECTS_START };
};
const updateProjectsSuccess = () => {
	return {
		type: actionTypes.UPDATE_PROJECTS_SUCCESS,
	};
};
const updateProjectsFail = (error) => {
	return {
		type: actionTypes.UPDATE_PROJECTS_FAIL,
		error: error,
	};
};
export const updateProjects = () => {
	return (dispatch, getState) => {
		dispatch(updateProjectsStart());
		const header = { Authorization: "Bearer " + getState().auth.token };
		axios
			.post("projects", { headers: header })
			.then((res) => {
				dispatch(updateProjectsSuccess());
			})
			.catch((error) => {
				dispatch(updateProjectsFail(error.response.data));
			});
	};
};
