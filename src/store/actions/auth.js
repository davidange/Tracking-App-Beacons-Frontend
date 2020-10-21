import axios from "../../axios-instance";
import * as actionTypes from "./actionTypes";

const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

const authSuccess = (token) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token,
	};
};

const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	};
};
const authSignUpSuccess = () => {
	return {
		type: actionTypes.AUTH_SIGNUP_SUCCESS,
	};
};

const checkAuthTimeout = (expirationTime) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const signUp = (email, password, name) => {
	return (dispatch) => {
		dispatch(authStart());
		const data = {
			email: email,
			password: password,
		};
		axios
			.post("user/login", data)
			.then((res) => {
				dispatch(authSignUpSuccess());
			})
			.catch((err) => {
				dispatch(authFail(err.response.data)); //or data.error? TODO
			});
	};
};

export const signIn = (email, password) => {
	return (dispatch) => {
		dispatch(authStart());
		const data = {
			email: email,
			password: password,
		};
		axios
			.post("user/login", data)
			.then((res) => {
				const expirationDate = new Date(new Date().getTime() + res.data.expires_in * 1000);
				//save in browser login Data
				localStorage.setItem("token", res.data.token);
				localStorage.setItem("expirationDate", expirationDate);
				dispatch(authSuccess(res.data.token));
				dispatch(checkAuthTimeout(res.data.expires_in));
			})
			.catch((err) => {
				dispatch(authFail(err.response.data)); //or data.error? TODO
			});
	};
};

export const logout = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("expirationDate");
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const authCheckState = () => {
	return (dispatch) => {
		const token = localStorage.getItem("token");
		if (!token) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem("expirationDate"));
			if (expirationDate <= new Date()) {
				dispatch(logout());
			} else {
				dispatch(authSuccess(token));
				dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
			}
		}
	};
};

export const setAuthRedirectPath = (path) => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path,
	};
};
