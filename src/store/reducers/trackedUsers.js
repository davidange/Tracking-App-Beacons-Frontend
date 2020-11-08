import * as actionTypes from "../actions/actionTypes";

const initialState = {
	trackedUsers: null,
	error: null,
	loading: false,
	loadingAction: false,
	errorAction: null,
};

const fetchTrackedUsersStart = (state, action) => {
	return {
		...state,
		trackedUsers: null,
		loading: true,
		error: null,
	};
};

const fetchTrackedUsersSuccess = (state, action) => {
	return {
		...state,
		trackedUsers: action.trackedUsers,
		loading: false,
		error: null,
	};
};

const fetchTrackedUsersFail = (state, action) => {
	return {
		...state,
		loading: false,
		error: action.error,
	};
};



const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_TRACKED_USERS_START:
			return fetchTrackedUsersStart(state, action);
		case actionTypes.FETCH_TRACKED_USERS_SUCCESS:
			return fetchTrackedUsersSuccess(state, action);
		case actionTypes.FETCH_TRACKED_USERS_FAIL:
			return fetchTrackedUsersFail(state, action);
		default:
			return state;
	}
};

export default reducer;
