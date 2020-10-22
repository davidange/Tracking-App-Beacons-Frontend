import * as actionTypes from "../actions/actionTypes";

const initialState = {
	snackbarOpen: false,
	snackbarType: "success",
	snackbarMessage: "",
};

const setSnackbar = (state, action) => {
	return {
		...state,
		snackbarType: action.snackbarType,
		snackbarMessage: action.snackbarMessage,
	};
};

const openSnackbar = (state, action) => {
	return {
		...state,
		snackbarOpen: true,
	};
};

const closeSnackbar = (state, action) => {
	return {
		...state,
		snackbarOpen: false,
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_SNACKBAR:
			return setSnackbar(state, action);
		case actionTypes.OPEN_SNACKBAR:
			return openSnackbar(state, action);
		case actionTypes.CLOSE_SNACKBAR:
			return closeSnackbar(state, action);
		default:
			return state;
	}
};

export default reducer;
