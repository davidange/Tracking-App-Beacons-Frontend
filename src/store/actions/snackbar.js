import * as actionTypes from "./actionTypes";

export const setSnackbar = (snackbarType = "success", snackbarMessage = "") => {
	return {
		type: actionTypes.SET_SNACKBAR,
		snackbarType: snackbarType,
		snackbarMessage: snackbarMessage,
	};
};

export const openSnackbar = () => {
	return { type: actionTypes.OPEN_SNACKBAR };
};
export const closeSnackbar = () => {
	return {
		type: actionTypes.CLOSE_SNACKBAR,
	};
};
