import * as actionTypes from "./actionTypes";
import axios from "../../axios-instance";

const fetchTrackedUsersStart = () => {
	return {
		type: actionTypes.FETCH_TRACKED_USERS_START,
	};
};

const fetchTrackedUsersSuccess = (trackedUsers) => {
	return {
		type: actionTypes.FETCH_TRACKED_USERS_SUCCESS,
		trackedUsers: trackedUsers,
	};
};

const fetchTrackedUsersFail = (error) => {
	return {
		type: actionTypes.FETCH_TRACKED_USERS_FAIL,
		error: error,
	};
};

export const fetchTrackedUsers = () => {
	return (dispatch, getState) => {
		dispatch(fetchTrackedUsersStart());
		const header = { Authorization: "Bearer " + getState().auth.token };
		const projectId = getState().activeProject.activeProject._id;
		if (!projectId) {
			dispatch(fetchTrackedUsersFail({ message: "The project ID was not Found" }));
		} else {
			console.log('ProjectId')
			console.log(projectId)
			console.log(header)
			axios
				.get("projects/" + projectId + "/tracked-users", { headers: header })
				.then((res) => {
					console.log(res)
					//console.log(res.data.tracked_users)
					dispatch(fetchTrackedUsersSuccess(res.data.tracked_users));
				})
				.catch((err) => {
					console.log(err)
					dispatch(fetchTrackedUsersFail(err.response.data));
				});
		}
	};
};
