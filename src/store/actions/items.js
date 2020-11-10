import * as actionTypes from "./actionTypes";
import axios from "../../axios-instance";

const fetchItemsStart = () => {
	return {
		type: actionTypes.FETCH_ITEMS_START,
	};
};

const fetchItemsSuccess = (items) => {
	return {
		type: actionTypes.FETCH_ITEMS_SUCCESS,
		items: items,
	};
};

const fetchItemsFail = (error) => {
	return {
		type: actionTypes.FETCH_ITEMS_FAIL,
		error: error,
	};
};

export const fetchItems = () => {
	return (dispatch, getState) => {
		dispatch(fetchItemsStart());
		const header = { Authorization: "Bearer " + getState().auth.token };
		const projectId = getState().activeProject.activeProject._id;
		if (!projectId) {
			dispatch(fetchItemsFail({ message: "The project ID was not Found" }));
		} else {
			axios
				.get("projects/" + projectId + "/tracked-items", { headers: header })
				.then((res) => {
					console.log(res)
					dispatch(fetchItemsSuccess(res.data.tracked_items));
				})
				.catch((err) => {
					dispatch(fetchItemsFail(err.response.data));
				});
		}
	};
};
